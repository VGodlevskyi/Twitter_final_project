package org.fs13.twitterapp.facade;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rq.PostRequest;
import org.fs13.twitterapp.dto.rs.PostResponse;
import org.fs13.twitterapp.entity.NotificationType;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.user.NotAuthorizedException;
import org.fs13.twitterapp.service.impl.PostService;
import org.fs13.twitterapp.service.impl.cloudinary.CloudinaryServiceImpl;
import org.fs13.twitterapp.service.impl.user.UserServiceImp;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class PostFacade extends GeneralFacade<Post, PostRequest, PostResponse> {
    private final PostService postService;
    private final UserServiceImp userService;
    private final CloudinaryServiceImpl cloudinaryService;
    private final NotificationFacade notificationFacade;
    private final UserFacade userFacade;

    public PostResponse likePost(Long postId, String userEmail) throws JsonProcessingException {
        Post post = postService.likePost(postId, userEmail);
        User user = userService.getUserProfile(userEmail);
        notificationFacade.createNotification(
                post.getUser(),
                user,
                String.format("%s liked you post", user.getUsername()),
                NotificationType.LIKE,
                Optional.of(post)
        );
        return convertToDto(post);
    }

    public PostResponse createPost(Principal principal, PostRequest postRequest) throws IOException {
        User user = userService.getUserProfile(principal.getName());
        Post post = convertToEntity(postRequest);
        post.setUser(user);
        if (postRequest.getImage() != null) post.setImgTwitUrl(cloudinaryService.getUrl(postRequest.getImage()));

        return convertToDto(postService.save(post));
    }

    public PostResponse unlikePost(Long postId, String userEmail) {
        return convertToDto(postService.unlikePost(postId, userEmail));
    }

    public List<PostResponse> findAllSubscribingUsersPosts(Principal principal, int page, int size) {
        PageableResponse<Post> pgPosts = postService.findAllSubscribingUsersPosts(principal.getName(), page, size);
        return StreamSupport.stream(pgPosts.getList().spliterator(), false).map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PostResponse getPostById(Long id) {
        return convertToDto(postService.getPostById(id));
    }

    public List<PostResponse> getAll() {
        return postService.getAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public PageableResponse<PostResponse> findAllUsersPostsById(Long id, int page, int size) {
        PageableResponse<Post> pgPosts = postService.findAllUsersPostById(id, page, size);
        List<PostResponse> postResponseList = StreamSupport.stream(pgPosts.getList().spliterator(), false).map(this::convertToDto)
                .collect(Collectors.toList());
        return new PageableResponse<>(pgPosts.getTotal(), postResponseList);
    }


    public PageableResponse<PostResponse> findAllUserLikedPosts(Principal principal, int page, int size) {
        PageableResponse<Post> userLikedPosts = postService.findAllUserLikedPosts(principal.getName(), page, size);
        List<PostResponse> postResponseList = StreamSupport.stream(userLikedPosts.getList().spliterator(), false).map(this::convertToDto).collect(Collectors.toList());
        return new PageableResponse<>(userLikedPosts.getTotal(), postResponseList);
    }

    /**
     * @author kizotov
     */

    public List<PostResponse> getPostsByAuthority(String username, int page, int size) {
        var pgPosts = postService.getUserPosts(username, page, size);
        return StreamSupport.stream(pgPosts.getList().spliterator(), false).map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PostResponse> getFollowingPosts(String username, int page, int size) {
        var currentUserId = userService.getUserProfile(username).getId();
        var pgPosts = postService.getFollowingPosts(currentUserId, page, size);
        return StreamSupport.stream(pgPosts.getList().spliterator(), false).map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PostResponse repost(String username, Long parentId) throws NotAuthorizedException {
        var parent = postService.getPostById(parentId);
        var repostedUser = userService.getUserProfile(username);
        var head = findHead(parent);
        var originAuthor = head.getUser().getName() + " " + head.getUser().getSurname();
        var linkToHead = String.format("/tweet/%s", originAuthor, head.getId());
        if (!validRetweet(parent, repostedUser))
            throw new NotAuthorizedException(NotAuthorizedException.PERMISSION_DENIED);

        var retweet = postService.save(Post.builder()
                .linkToHead(linkToHead)
                .headPost(head)
                .parentPost(parent)
                .user(repostedUser)
                .body(head.getBody())
                .imgTwitUrl(parent.getImgTwitUrl())
                .build());

        return
                PostResponse.builder()
                        .id(retweet.getId())
                        .body(retweet.getBody())
                        .imgTwitUrl(retweet.getImgTwitUrl())
                        .user(userFacade.convertToDto(retweet.getUser()))
                        .createdDate(retweet.getCreatedDate())
                        .parentPost(this.convertToDto(retweet.getParentPost()))
                        .headPost(this.convertToDto(retweet.getHeadPost()))
                        .linkToHead(retweet.getLinkToHead())
                        .build();
    }

    private Post findHead(Post post) {
        if (post.getHeadPost() == null) return post;
        return post.getHeadPost();
    }

    boolean validRetweet(Post post, User u) {
        if (post.getUser().equals(u)) return false;

        else if (Objects.nonNull(post.getParentPost())) {
            return !post.getHeadPost().getUser().equals(u);
        }

        return !postService.containsRepost(u.getUsername(), post);
    }

    public PageableResponse<PostResponse> commentedPosts(String userEmail, int page, int size) {
        Page<Post> posts = postService.commentedPosts(userEmail, page, size);
        return new PageableResponse<>(
                posts.getTotalElements(),
                posts.getContent().stream().map(this::convertToDto).collect(Collectors.toList()));
    }
}
