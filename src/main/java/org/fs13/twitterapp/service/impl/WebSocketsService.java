package org.fs13.twitterapp.service.impl;

import org.fs13.twitterapp.entity.user.User;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class WebSocketsService {
    private final SimpMessagingTemplate messaging;

    public WebSocketsService(SimpMessagingTemplate messaging) {
        this.messaging = messaging;
    }

    public void send(Principal principal, String destination, Object payload) {
        send(principal.getName(), destination, payload);
    }

    private void send(User user, String destination, Object payload) {
        send(user.getEmail(), destination, payload);
    }

    public void send(String email, String destination, Object payload) {
        messaging.convertAndSendToUser(email, destination, payload);
    }
}
