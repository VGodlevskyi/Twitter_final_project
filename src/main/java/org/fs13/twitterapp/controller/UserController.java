package org.fs13.twitterapp.controller;

import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rq.ChangePasswordRequest;
import org.fs13.twitterapp.dto.rq.UserRequest;
import org.fs13.twitterapp.dto.rs.ChangePasswordResponse;
import org.fs13.twitterapp.dto.rs.UserResponse;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.facade.UserFacade;
import org.fs13.twitterapp.service.impl.user.UserServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/v0/users")
public class UserController {

    private final UserFacade facade;
    private final UserServiceImp userService;

    public UserController(UserFacade facade, UserServiceImp userService) {
        this.userService = userService;
        this.facade = facade;
    }


    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/find")
    ResponseEntity<PageableResponse<UserResponse>> findUserByName(@RequestParam String user,
                                                                  @RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "3") int size) {
        return ResponseEntity.ok(this.facade.findUserByNameContains(user, page, size));
    }

    @PutMapping("/edit")
    ResponseEntity<UserResponse> editCustomerById(Principal principal, @ModelAttribute @RequestBody @Valid UserRequest userRequest) {
        try {
            UserResponse userResponse = facade.editUserProfile(principal, userRequest);

            return new ResponseEntity<>(userResponse, HttpStatus.ACCEPTED);
        } catch (RuntimeException | IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/profile")
    ResponseEntity<UserResponse> getUserProfile(Principal principal) {
        try {
            return new ResponseEntity<>(facade.getUserProfile(principal.getName()), HttpStatus.ACCEPTED);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get/{id}")
    ResponseEntity<?> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(facade.getUserById(id));
    }

    @PostMapping("/follow/{id}")
    ResponseEntity<?> follow(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(facade.follow(principal, id));
    }

    @PostMapping("/unfollow/{id}")
    ResponseEntity<?> unfollow(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(facade.unfollow(principal, id));
    }

    @GetMapping("/profile/following")
    ResponseEntity<?> followoing(Principal principal) {
        return ResponseEntity.ok(facade.getFollowing(principal));
    }

    @GetMapping("/profile/followers")
    ResponseEntity<?> followers(Principal principal) {
        return ResponseEntity.ok(facade.getFollowers(principal));
    }


    @GetMapping("/withoutSubscribe")
    ResponseEntity<PageableResponse<UserResponse>> getUsersWithoutSubscribeByCurrentUser(Principal principal) {
        return ResponseEntity.ok(facade.findAllByUsersSubscribedNotContains(principal, 0, 10));
    }

    /**
     * @author kizotov
     */

    @PutMapping("/user-info")
    public ResponseEntity<ChangePasswordResponse> changePassword(@Valid @RequestBody ChangePasswordRequest changeRequest, Principal principal) {
        facade.passwordChange(changeRequest, principal);
        if (!facade.verifyPassword(changeRequest.getUserinfo(), principal)) {
            return ResponseEntity.badRequest().body(ChangePasswordResponse.failed());
        }
        return ResponseEntity.ok(ChangePasswordResponse.passed());
    }
}