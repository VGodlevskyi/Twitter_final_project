package org.fs13.twitterapp.facade;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rq.ChatRequest;
import org.fs13.twitterapp.dto.rq.MessageEditRequest;
import org.fs13.twitterapp.dto.rq.MessageRequest;
import org.fs13.twitterapp.dto.rs.ChatResponse;
import org.fs13.twitterapp.dto.rs.MessageResponse;
import org.fs13.twitterapp.dto.rs.UserResponse;
import org.fs13.twitterapp.entity.Chat;
import org.fs13.twitterapp.entity.Message;
import org.fs13.twitterapp.entity.NotificationType;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.user.NotAuthorizedException;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.repository.UserRepo;
import org.fs13.twitterapp.service.impl.WebSocketsService;
import org.fs13.twitterapp.service.impl.messages.ChatService;
import org.fs13.twitterapp.service.impl.messages.MessageService;
import org.fs13.twitterapp.service.impl.user.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ChatFacadeImp implements ChatFacade {
    @Autowired
    private ChatService chatService;
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserServiceImp userService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserFacade userFacade;
    @Autowired
    private NotificationFacade notificationFacade;
    @Autowired
    private WebSocketsService webSocketsService;
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public PageableResponse<ChatResponse> getChatsByUser(Principal principal, int page, int limit) throws NotAuthorizedException {
        var user = userRepo.findByEmail(principal.getName()).orElseThrow(() -> new NotFoundException(NotFoundException.EMAIL_NOT_FOUND));
        var params = PageRequest.of(page, limit, Sort.by("updatedDate"));
        var chats = chatService.safeGetChatsByUser(user, params).map(this::mapToResponse);
        return new PageableResponse<>(chats.getTotalElements(), chats.getContent());
    }

    @Override
    public PageableResponse<MessageResponse> getMessagesByChatId(Long chatId, int page, int limit) throws NotAuthorizedException {
        var chat = chatService.getChatById(chatId);
        var params = PageRequest.of(page, limit, Sort.by("createdDate"));
        var messages = messageService
                .safeGetMessagesByChat(chat, params)
                .map(this::mapMessageResponse);

        return new PageableResponse<>(messages.getTotalElements(), messages.getContent());
    }

    @Override
    public ChatResponse getChatById(Long chatId) throws NotAuthorizedException {
        return mapToResponse(chatService.safeGetChatById(chatId));
    }

    @Override
    public ChatResponse createChat(ChatRequest chatRequest) {
        var initiator = userRepo.findUserById(chatRequest.getInitiatorId());
        Set<User> members = chatRequest
                .getMemberIds()
                .stream()
                .map(id -> userRepo.findUserById(id))
                .collect(Collectors.toSet());
        var currentChat = new Chat(initiator.getId(), members, new HashSet<>());
        var saved = chatService.saveChat(currentChat);

        try {
            pushChatToWebSocket(saved, members.stream().filter(m -> !Objects.equals(m.getId(), chatRequest.getInitiatorId())).map(User::getEmail).collect(Collectors.toList()));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return mapToResponse(saved);
    }

    @Override
    public ChatResponse addMembers(Long chatId, List<Long> memberIds) throws NotAuthorizedException {
        var addedMembers = memberIds.stream()
                .map(m -> userRepo.findUserById(m))
                .collect(Collectors.toList());

        Chat chat = chatService.safeAddChatMembers(chatId, addedMembers);

        try {
            pushChatToWebSocket(chat, addedMembers.stream().map(User::getEmail).collect(Collectors.toList()));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return mapToResponse(chat);
    }

    @Override
    public ChatResponse removeMembers(Long chatId, List<Long> memberIds) throws NotAuthorizedException {
        var chat = chatService.getChatById(chatId);
        var initiatorId = chat.getInitiatorId();

        if (memberIds.contains(initiatorId)) {
            memberIds.remove(initiatorId);
        }

        var removedMembers = memberIds.stream()
                .map(m -> userRepo.findUserById(m))
                .collect(Collectors.toList());

        return mapToResponse(chatService.safeRemoveChatMembers(chatId, removedMembers));
    }

    @Override
    public ChatResponse saveMessage(MessageRequest dto, Principal principal) throws NotAuthorizedException {
        var msg = messageService.saveMessage(mapMessageRequest(dto));
        var currentChat = chatService.getChatById(dto.getChatId());
        User sender = userService.getUserProfile(principal.getName());
        ChatResponse chatResponse = mapToResponse(currentChat);
        currentChat
                .getChatMembers()
                .stream()
                .filter(user -> !user.getId().equals(sender.getId()))
                .forEach(user -> {
                    try {
                        notificationFacade.createNotification(
                                user,
                                sender,
                                dto,
                                NotificationType.MESSAGE
                        );
                    } catch (JsonProcessingException e) {
                        System.out.println(e.toString());
                    }
                });

        try {
            pushMessageToWebSocket(msg, currentChat.getChatMembers().stream().map(User::getEmail).collect(Collectors.toList()));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return chatResponse;
    }

    @Override
    public ChatResponse updateMessage(MessageEditRequest editRequest) throws NotAuthorizedException {
        var toBeEdited = messageService.findMessageById(editRequest.getMessageId());
        toBeEdited.setBody(editRequest.getMessageBody());
        messageService.saveMessage(toBeEdited);
        var currentChat = chatService.getChatById(toBeEdited.getChat().getId());
        return mapToResponse(currentChat);
    }

    @Override
    public ChatResponse removeMessage(Long messageId) throws NotAuthorizedException {
        var toBeRemoved = messageService.findMessageById(messageId);
        messageService.removeMessage(toBeRemoved);
        var chat = chatService.getChatById(toBeRemoved.getChat().getId());
        return mapToResponse(chat);
    }

    @Override
    public void removeChat(Long chatId) throws NotAuthorizedException {
        chatService.deleteChatById(chatId);
    }

    private ChatResponse mapToResponse(Chat chat) {
        Set<UserResponse> users = chat.getChatMembers()
                .stream()
                .map(u -> userFacade.convertToDto(u))
                .collect(Collectors.toSet());

        Set<MessageResponse> messages = chat.getMessages()
                .stream()
                .map(this::mapMessageResponse)
                .collect(Collectors.toSet());

        return new ChatResponse(chat.getId(), chat.getInitiatorId(), users, messages);
    }

    private Message mapMessageRequest(MessageRequest messageDTO) {
        var sender = userRepo.findUserById(messageDTO.getSenderId());
        return new Message(messageDTO.getBody(), sender, chatService.getChatById(messageDTO.getChatId()));
    }

    private MessageResponse mapMessageResponse(Message message) {
        return new MessageResponse(
                message.getId(),
                userFacade.convertToDto(message.getSender()),
                message.getChat().getId(),
                message.getBody(),
                message.getUpdatedDate(),
                message.getCreatedDate()
        );
    }

    private void pushMessageToWebSocket(Message message, List<String> receivers) throws JsonProcessingException {
        String messageJson = objectMapper.writeValueAsString(mapMessageResponse(message));
        System.out.println(messageJson);

        receivers.forEach(email -> {
            webSocketsService.send(email, "/messages", messageJson);
        });
    }

    private void pushChatToWebSocket(Chat chat, List<String> receivers) throws JsonProcessingException {
        String chatJson = objectMapper.writeValueAsString(mapToResponse(chat));

        receivers.forEach(email -> {
            webSocketsService.send(email, "/messages", chatJson);
        });
    }
}
