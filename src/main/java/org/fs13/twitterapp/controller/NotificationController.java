package org.fs13.twitterapp.controller;

import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rs.NotificationResponse;
import org.fs13.twitterapp.entity.Notification;
import org.fs13.twitterapp.entity.NotificationType;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.facade.NotificationFacade;
import org.fs13.twitterapp.repository.UserRepo;
import org.fs13.twitterapp.service.impl.NotificationService;
import org.fs13.twitterapp.service.impl.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v0/notification")
public class NotificationController {
    private final NotificationFacade notificationFacade;
    private final NotificationService notificationService;
    private final UserRepo userRepo;
    private final PostService postService;

    @GetMapping("/")
    public ResponseEntity<PageableResponse<NotificationResponse>> getNotifications(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        String userEmail = authentication.getName();
        PageableResponse<NotificationResponse> notificationResponseList = notificationFacade.findForUser(userEmail, page, size);

        return ResponseEntity.ok(notificationResponseList);
    }


    @PostMapping("/temp")
    public Notification submitTestNotification(Principal principal) {
        String email = principal.getName();
        User user = userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
        Post post = postService.getPostById(1L);
        return notificationFacade.createNotification(
                user,
                user,
                "Just a test message",
                NotificationType.LIKE,
                Optional.of(post)
        );
    }
}
