package org.fs13.twitterapp.service.impl.messages;

import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.entity.Chat;
import org.fs13.twitterapp.entity.Message;
import org.fs13.twitterapp.exceptions.user.NotAuthorizedException;
import org.fs13.twitterapp.repository.MessageRepo;
import org.fs13.twitterapp.service.impl.messages.ChatService;
import org.fs13.twitterapp.service.impl.user.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static org.fs13.twitterapp.entity.user.UserRole.ADMIN;
import static org.fs13.twitterapp.exceptions.user.NotAuthorizedException.PERMISSION_DENIED;

@Service
@RequiredArgsConstructor
public class MessageService {
    @Autowired MessageRepo messageRepo;
    @Autowired UserServiceImp userServiceImp;
    @Autowired
    ChatService chatService;

    public Message findMessageById(Long id) {
        return messageRepo.findMessageById(id);
    }

    public Page<Message> getMessagesByChat(Chat chat, Pageable params) {
        return messageRepo.findAllByChat(chat, params);
    };

    public Page<Message> safeGetMessagesByChat(Chat chat, Pageable params) throws NotAuthorizedException {
        if (!chatService.hasMemberPermission(chat)) {
            throw new NotAuthorizedException(PERMISSION_DENIED);
        }

        return messageRepo.findAllByChat(chat, params);
    }

    public Message saveMessage(Message m) throws NotAuthorizedException {
        if (!hasPermission(m)) {
            throw new NotAuthorizedException(PERMISSION_DENIED);
        }
        return messageRepo.save(m);
    }

    public void removeMessage(Message message) throws NotAuthorizedException {
        if (!hasPermission(message)) {
            throw new NotAuthorizedException(PERMISSION_DENIED);
        }
        messageRepo.delete(message);
    }

    private boolean hasPermission(Message m) {
        var currentUser = userServiceImp.getCurrentUser();
        var currentRole = currentUser.getRole();

        if (currentRole.equals(ADMIN)) {
            return true;
        }

        var applicableUsername = m.getSender().getUsername();
        var currentUsername = currentUser.getUsername();

        return applicableUsername.equals(currentUsername);
    }
}
