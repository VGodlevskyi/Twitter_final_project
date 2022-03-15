package org.fs13.twitterapp.controller;

import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.dto.rq.CommentRequest;
import org.fs13.twitterapp.dto.rs.CommentResponse;
import org.fs13.twitterapp.dto.rs.PostResponse;
import org.fs13.twitterapp.service.api.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Pattern;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v0/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/save/{postId}")
    public ResponseEntity<Long>saveComment(@PathVariable("postId") Long postId,
                                           @RequestBody CommentRequest comment,
                                           Principal principal) {

        return ResponseEntity.ok(
                commentService.saveComment(comment, principal, postId)
        );
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") Long commentId, Principal principal) {
        final String serviceResponse = commentService.removeComment(principal, commentId);

        if (serviceResponse.startsWith("not")) {
            new ResponseEntity<>(serviceResponse, HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok(serviceResponse);
    }

    @GetMapping("/list")
    public ResponseEntity<List<CommentResponse>> getCommentsByPost(@Pattern(regexp = "[0-9]") @RequestParam("post") String post,
                                                                @RequestParam("page")   int page,
                                                                @RequestParam("limit")  int limit ) {

        var posts = commentService.getComments(Long.parseLong(post), page, limit);
        return ResponseEntity.ok(posts);
    }
}
