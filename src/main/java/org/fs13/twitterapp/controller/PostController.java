package org.fs13.twitterapp.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.dto.OnCreate;
import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rq.CommentRequest;
import org.fs13.twitterapp.dto.rq.PostRequest;
import org.fs13.twitterapp.dto.rs.PostResponse;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.exceptions.user.NotAuthorizedException;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.facade.NotificationFacade;
import org.fs13.twitterapp.facade.PostFacade;
import org.fs13.twitterapp.service.impl.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/v0/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final PostFacade facade;

    @GetMapping("/all")
    public List<PostResponse> getAllUsers() {
        return facade.getAll();
    }

    @GetMapping("/byId/{id}")
    ResponseEntity<PageableResponse<PostResponse>> getAllPostsById(@PathVariable Long id) {
        return ResponseEntity.ok(facade.findAllUsersPostsById(id, 0, 10));
    }

    @Validated(OnCreate.class)
    @PostMapping("/add")
    ResponseEntity<PostResponse> addNewPost(Principal principal, @ModelAttribute @Valid PostRequest postRequest) {
        try {
            return new ResponseEntity<>(facade.createPost(principal, postRequest), HttpStatus.ACCEPTED);
        } catch (RuntimeException | IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    ResponseEntity<Long> deletePost(@RequestParam Long id) {
        try {
            postService.deletePostById(id);

            return new ResponseEntity<>(id, HttpStatus.ACCEPTED);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/like")
    ResponseEntity<PostResponse> likePost(@RequestParam Long id, Principal principal) {
        try {
            return new ResponseEntity<>(facade.likePost(id, principal.getName()), HttpStatus.ACCEPTED);
        } catch (RuntimeException | JsonProcessingException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/unlike")
    ResponseEntity<PostResponse> unlikePost(@RequestParam Long id, Principal principal) {
        try {
            return new ResponseEntity<>(facade.unlikePost(id, principal.getName()), HttpStatus.ACCEPTED);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/likes")
    ResponseEntity<PageableResponse<PostResponse>> findAllUserLikedPosts(Principal principal,
                                                                         @RequestParam(defaultValue = "0") int page,
                                                                         @RequestParam(defaultValue = "3") int size) {
        return ResponseEntity.ok(this.facade.findAllUserLikedPosts(principal, page, size));
    }

    // {id}/comments

    @GetMapping("/subs")
    ResponseEntity<List<PostResponse>> findAllSubscribingUsersPosts(Principal principal,
                                                                    @RequestParam(defaultValue = "0") int page,
                                                                    @RequestParam(defaultValue = "3") int size) {
        return ResponseEntity.ok(facade.findAllSubscribingUsersPosts(principal, page, size));
    }

    @GetMapping("/get/{id}")
    ResponseEntity<PostResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(facade.getPostById(id));
    }

    /**
     * @author kizotov
     */

    @GetMapping("/by-auth")
    ResponseEntity<List<PostResponse>> getPostsByAuthority(Principal user, @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(this.facade.getPostsByAuthority(user.getName(), page, size));
    }

    @GetMapping("/following")
    ResponseEntity<List<PostResponse>> getFollowingPosts(Principal user, @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(this.facade.getFollowingPosts(user.getName(), page, size));
    }

    @PostMapping("/retweet/{parentId}")
    ResponseEntity<?> repostTweet(@PathVariable("parentId") Long parentId, Principal principal) {
        try {
            var savedRepost = facade.repost(principal.getName(), parentId);
            return ResponseEntity.ok(savedRepost);
        } catch (NotFoundException exception) {
            return ResponseEntity.notFound().build();
        } catch (NotAuthorizedException e) {
            return ResponseEntity.badRequest().body("Retweet is not applicable");
        }
    }

    @GetMapping("/commented")
    ResponseEntity<PageableResponse<PostResponse>> commentedPosts(Principal principal, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
        return ResponseEntity.ok(facade.commentedPosts(principal.getName(), page, size));
    }
}
