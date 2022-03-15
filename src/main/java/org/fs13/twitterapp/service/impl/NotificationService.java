package org.fs13.twitterapp.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.entity.Notification;
import org.fs13.twitterapp.entity.NotificationType;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.facade.NotificationFacade;
import org.fs13.twitterapp.repository.NotificationRepo;
import org.fs13.twitterapp.repository.UserRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService extends GeneralService<Notification> {
    private final UserRepo userRepo;
    private final NotificationRepo notificationRepo;
    private final ObjectMapper objectMapper;
    private final WebSocketsService webSocketsService;

    private Page<Notification> getNotificationsForUser(String  email, int page, int size) {
        return notificationRepo.getNotificationsByUserEmail(email, PageRequest.of(page, size));
    }

    public Page<Notification> findForUser(String email, int page, int size) {
        return getNotificationsForUser(email, page, size);
    }
}
