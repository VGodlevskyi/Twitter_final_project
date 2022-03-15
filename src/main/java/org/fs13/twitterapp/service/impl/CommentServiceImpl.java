package org.fs13.twitterapp.service.impl;

import org.fs13.twitterapp.dto.rq.CommentRequest;
import org.fs13.twitterapp.dto.rs.CommentResponse;
import org.fs13.twitterapp.entity.Comment;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.repository.CommentRepo;
import org.fs13.twitterapp.repository.PostRepo;
import org.fs13.twitterapp.repository.UserRepo;
import org.fs13.twitterapp.service.api.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {
   @Autowired private CommentRepo commentRepo;
   @Autowired private UserRepo userRepo;
   @Autowired private PostRepo postRepo;

    @Override
    public List<CommentResponse> getComments(Long postId, int page, int limit) {
        return commentRepo
               .getAllByPost(
                       postRepo.getPostByPostId(postId)
                               .orElseThrow(() -> new NotFoundException(String.format("unknown post with id: %d", postId))),
                       PageRequest.of(page, limit, Sort.by("updatedDate").descending()))
               .getContent()
               .stream()
               .map(c -> CommentResponse.builder()
                                        .commentId(c.getId())
                                        .authorId(c.getUser().getId())
                                        .body(c.getBody())
                                        .postedByName(c.getUser().getName() + " " + c.getUser().getSurname())
                                        .postedByAvatar(c.getUser().getAvatarUrl())
                                        .publishedAt(c.getUpdatedDate())
                                        .build())
               .collect(Collectors.toList());
    }

    @Override
    public Long saveComment(CommentRequest comment, Principal principal, Long postId) {
        var saved =
                commentRepo.save(
                    Comment.builder()
                    .body(comment.getBody())
                    .post(postRepo.getPostByPostId(postId)
                            .orElseThrow(() -> new NotFoundException(
                                    String.format("unknown post with id: %d", postId))))
                    .user(userRepo.findByEmail(principal.getName()).
                            orElseThrow(() -> new NotFoundException(
                                    String.format("unknown user with username: %s", principal.getName()))))
                    .build());

        return saved.getId();
    }

    @Override
    public String removeComment(Principal principal, Long commentId) {
        AtomicReference<String> postOwnerName = new AtomicReference<>("");
        AtomicReference<String> responseText = new AtomicReference<>("");

        commentRepo
                .findCommentById(commentId)
                .map(c -> {
                    String owner = c.getPost().getUser().getUsername();
                    postOwnerName.compareAndSet("", owner);
                    return c;
                })
                .map(Comment::getUser)
                .map(User::getUsername)
                .ifPresent(u -> {
                    boolean isOwner  = principal.getName().equalsIgnoreCase(postOwnerName.get());
                    boolean isAuthor = u.equalsIgnoreCase(principal.getName());

                    if (!isAuthor) {
                        responseText.compareAndSet("",
                                String.format("not enough authorities to remove comment with id: %d", commentId));
                    }
                    else if (!isOwner) {
                        responseText.compareAndSet("",
                                String.format("not enough authorities to remove comment with id: %d", commentId));
                    }
                    else /* if author or post creator */ {
                        responseText.compareAndSet("",
                                String.format("comment was removed by user: %s", principal.getName()));
                    }
                });

        return responseText.get();
    }
}
