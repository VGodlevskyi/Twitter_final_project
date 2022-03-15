package org.fs13.twitterapp.dto.rs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
    private Long id;
    private String body;
    private String imgTwitUrl;
    private Boolean isUserSubscribedByCurrentUser;

    private UserResponse user;
    List<CommentResponse> comments;
    private Date createdDate;

    private Integer numberOfLikes;
    private Integer numberOfRetweets;
    private Integer numberOfComments;

    private Boolean isLikedByCurrentUser;
    private Boolean hasCommentByCurrentUser;
    private Boolean hasRetweetByCurrentUser;

    /**
     * @author kizotov
     */
    private String linkToHead;
    private PostResponse parentPost;
    private PostResponse headPost;
}
