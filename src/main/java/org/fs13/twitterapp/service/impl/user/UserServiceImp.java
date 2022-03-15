package org.fs13.twitterapp.service.impl.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.entity.Comment;
import org.fs13.twitterapp.entity.NotificationType;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.facade.NotificationFacade;
import org.fs13.twitterapp.repository.UserRepo;
import org.fs13.twitterapp.service.impl.GeneralService;
import org.fs13.twitterapp.service.impl.NotificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImp extends GeneralService<User> {
    private final UserRepo userRepo;
        private final NotificationFacade notificationFacade;

    public Optional<User> findById(Long id) {
        return userRepo.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User editUserProfile(User user) {
        User found = userRepo.findById(user.getId()).orElseThrow(() -> new NotFoundException("User does not exist!"));

        if (user.getName() != null) {
            found.setName(user.getName());
        }

        if (user.getBio() != null) {
            found.setBio(user.getBio());
        }

        if (user.getLocation() != null) {
            found.setLocation(user.getLocation());
        }

        if (user.getWebsite() != null) {
            found.setWebsite(user.getWebsite());
        }

        if (user.getBirthdate() != null) {
            found.setBirthdate(user.getBirthdate());
        }

        return userRepo.save(found);

    }

    public PageableResponse<User> searchUserProfile(String user, int page, int size) {
        Page<User> result = userRepo.findByNameContainsIgnoreCase(user, PageRequest.of(page, size));

        return new PageableResponse<>(result.getTotalElements(), result.getContent());
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public Set<Post> getUserLikes(Long id) {
        return userRepo.findById(id).orElseThrow(() -> new NotFoundException("User not found")).getLikedPosts();
    }

    public User getUserProfile(String email) {
        return userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return findUserByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User not found or not logged in"));
    }

    public User follow(User current, User follow) {

        current.addUserToSubscribing(follow);
//        follow.addUserToSubscribed(current);

        userRepo.save(current);
        notificationFacade.createNotification(
                follow,
                current,
                String.format("%s started follow you", current.getUsername()),
                NotificationType.SUBSCRIBE
        );
        return current;
    }

    public User unfollow(User current, User follow) {
        current.removeUserFromSubscribing(follow);

        follow.removeUserFromSubscribed(current);

        userRepo.save(current);
        userRepo.save(follow);

        return current;
    }

    public Set<User> getFollowing(String email) {
        User currentUser = userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        return currentUser.getUsersSubscribing();
    }

    public List<Post> getFollowingPosts(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"))
                .getUsersSubscribing().stream().flatMap(sub -> sub.getPosts().stream())
                .collect(Collectors.toList());
    }

    public PageableResponse<User> findAllByUsersSubscribedNotContains(String email, int page, int size) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
        Page<User> allByUsersSubscribedNotContains = userRepo.findAllByUsersSubscribedNotContains(user, PageRequest.of(page, size));


        return new PageableResponse<>(allByUsersSubscribedNotContains.getTotalElements(), allByUsersSubscribedNotContains.getContent());
    }

    public Set<User> getFollowers(String email) {
        User currentUser = userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        return currentUser.getUsersSubscribed();
    }

    public User getUserById(Long id) {
        return userRepo.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    }

}