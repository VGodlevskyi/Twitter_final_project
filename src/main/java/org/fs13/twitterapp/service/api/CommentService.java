package org.fs13.twitterapp.service.api;

import org.fs13.twitterapp.dto.rq.CommentRequest;
import org.fs13.twitterapp.dto.rs.CommentResponse;

import java.security.Principal;
import java.util.List;

public interface CommentService {
    List<CommentResponse> getComments(Long postId, int page, int limit);
    Long saveComment(CommentRequest comment, Principal principal, Long postId);
    String removeComment(Principal principal, Long commentId);
}
