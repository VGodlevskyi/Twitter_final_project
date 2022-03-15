package org.fs13.twitterapp.service.impl.messages;


import org.fs13.twitterapp.entity.BaseEntity;
import org.fs13.twitterapp.entity.Chat;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.user.NotAuthorizedException;
import org.fs13.twitterapp.repository.ChatRepo;
import org.fs13.twitterapp.service.impl.user.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.fs13.twitterapp.entity.user.UserRole.ADMIN;
import static org.fs13.twitterapp.exceptions.user.NotAuthorizedException.PERMISSION_DENIED;

@Service
public class ChatService {
    @Autowired private ChatRepo chatRepo;
    @Autowired private UserServiceImp userService;

    public Chat getChatById(Long id) {
        return chatRepo.findChatById(id);
    }

    public Chat safeGetChatById(Long id) throws NotAuthorizedException {
        var chat = chatRepo.findChatById(id);
        if (!hasMemberPermission(chat)) {
            throw new NotAuthorizedException(PERMISSION_DENIED);
        }
        return chat;
    }

    public Chat saveChat(Chat c) {
        return chatRepo.save(c);
    }

    public Chat safeAddChatMembers(Long chatId, List<User> addedUsers) throws NotAuthorizedException {
        var chat = chatRepo.findChatById(chatId);
        if (!hasMemberPermission(chat)) {
            throw new NotAuthorizedException(PERMISSION_DENIED);
        }
        chat.getChatMembers().addAll(addedUsers);
        return saveChat(chat);
    }

    public Chat safeRemoveChatMembers(Long chatId, List<User> removedUsers) throws NotAuthorizedException {
        var chat = chatRepo.findChatById(chatId);
        if (!hasMemberPermission(chat)) {
            throw new NotAuthorizedException(PERMISSION_DENIED);
        }
        chat.getChatMembers().removeAll(removedUsers);
        return saveChat(chat);
    }

    public void deleteChatById(Long id) throws NotAuthorizedException {
        var chat = chatRepo.findChatById(id);
        if (!hasCreatorPermission(chat)) {
            throw new NotAuthorizedException(PERMISSION_DENIED);
        }
        chatRepo.delete(chat);
    }

    public Page<Chat> getChatsByUser(User chatMember, Pageable params) {

      return chatRepo.findChatsByChatMembersContaining(chatMember, params);
    }

    public Page<Chat> safeGetChatsByUser(User chatMember, Pageable params) throws NotAuthorizedException {
        if (!hasViewPermission(chatMember)) {
            throw new NotAuthorizedException(PERMISSION_DENIED);
        }
        return getChatsByUser(chatMember, params);
    }

    private boolean hasCreatorPermission(Chat chat) {
        var currentUser = userService.getCurrentUser();
        var currentRole = currentUser.getRole();

        if (currentRole.equals(ADMIN)) {
            return true;
        }

        return chat.getInitiatorId()
                .equals(currentUser.getId());
    }

    public boolean hasMemberPermission(Chat chat) {
        var currentUser = userService.getCurrentUser();
        var currentRole = currentUser.getRole();

        if (currentRole.equals(ADMIN)) {
            return true;
        }

        return
            chat.getChatMembers().stream()
                    .map(User::getId)
                    .collect(Collectors.toSet())
                    .contains(currentUser.getId());
    }

    private boolean hasViewPermission(User requestedToView) {
        var currentUser = userService.getCurrentUser();
        var currentRole = currentUser.getRole();
        if (currentRole.equals(ADMIN)) {
            return true;
        }
        return requestedToView.getId().equals(currentUser.getId());
    }
}
