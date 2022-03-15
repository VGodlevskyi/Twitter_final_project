package org.fs13.twitterapp.facade;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rq.MessageRequest;
import org.fs13.twitterapp.dto.rq.NotificationRequest;
import org.fs13.twitterapp.dto.rs.MessageResponse;
import org.fs13.twitterapp.dto.rs.NotificationResponse;
import org.fs13.twitterapp.entity.Notification;
import org.fs13.twitterapp.entity.NotificationType;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.repository.NotificationRepo;
import org.fs13.twitterapp.service.impl.NotificationService;
import org.fs13.twitterapp.service.impl.WebSocketsService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class NotificationFacade extends GeneralFacade<Notification, NotificationRequest, NotificationResponse> {
    private final NotificationService notificationService;
    private final NotificationRepo notificationRepo;
    private final ObjectMapper objectMapper;
    private final WebSocketsService webSocketsService;

    public PageableResponse<NotificationResponse> findForUser(String userEmail, int page, int size) {
        Page<Notification> forUser = notificationService.findForUser(userEmail, page, size);
        PageableResponse<Notification> notificationPageableResponse = new PageableResponse<>(forUser.getTotalElements(), forUser.getContent());
        List<NotificationResponse> collect = StreamSupport.stream(notificationPageableResponse.getList().spliterator(), false).map(this::convertToDto)
                .collect(Collectors.toList());
        return new PageableResponse<>(notificationPageableResponse.getTotal(), collect);
    }

    public Notification createNotification(User receiver, User submitter, MessageRequest body, NotificationType type) throws JsonProcessingException {
        return createNotification(receiver, submitter, objectMapper.writeValueAsString(body), type);
    }

    public Notification createNotification(User receiver, User submitter, MessageResponse body, NotificationType type) throws JsonProcessingException {
        return createNotification(receiver, submitter, objectMapper.writeValueAsString(body), type);
    }


    public Notification createNotification(User receiver, User submitter, String body, NotificationType type) {
        return createNotification(receiver, submitter, body, type, Optional.empty());
    }

    public Notification createNotification(User receiver, User submitter, String body, NotificationType type, Optional<Post> post) {
        Notification notification = new Notification();
        notification.setBody(body);
        notification.setUser(receiver);
        notification.setSubmitter(submitter);
        notification.setIsRead(false);
        notification.setType(type);
        post.ifPresent(notification::setPost);

        return createNotification(notification);
    }

    public Notification createNotification(Notification notification) {
        notificationRepo.save(notification);

        try {
            pushToWebSocket(notification);
        } catch (JsonProcessingException ignored) {
        }

        return notification;
    }


    private void pushToWebSocket(Notification notification) throws JsonProcessingException {
        String notificationJson = objectMapper.writeValueAsString(convertToDto(notification));
        System.out.println(notificationJson);
        webSocketsService.send(notification.getUser().getEmail(), "/notifications", notificationJson);
    }
}
