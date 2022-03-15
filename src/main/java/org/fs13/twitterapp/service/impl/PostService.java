package org.fs13.twitterapp.service.impl;

import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.entity.Comment;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.AlreadyExistException;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.repository.PostRepo;
import org.fs13.twitterapp.repository.UserRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Stream;

@Service
public class PostService extends GeneralService<Post> {
    private PostRepo postRepo;
    private UserRepo userRepo;

    public PostService(PostRepo postRepo, UserRepo userRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
    }

    public List<Post> getAll() {
        return postRepo.findAll();
    }

    public Post addNewPost(Post post) {
        postRepo.save(post);
        return post;
    }

    public void deletePostById(Long id) {
        postRepo.deleteById(id);
    }

    public Post addCommentById(Long id, Comment comment) {
        Post post = postRepo.findById(id).orElseThrow(() -> new NotFoundException("Post not found or deleted!"));
        post.addComment(comment);
        return postRepo.save(post);
    }

    public Post likePost(Long id, String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
        Post post = postRepo.findById(id).orElseThrow(() -> new NotFoundException("Post not found or deleted!"));
        Set<User> likes = post.getLikes();

        if (likes.contains(user)) throw new AlreadyExistException("Already exist!");

        post.addLike(user);
        user.getLikedPosts().add(post);
        return postRepo.save(post);
    }

    public Post unlikePost(Long id, String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
        Post post = postRepo.findById(id).orElseThrow(() -> new NotFoundException("Post not found or deleted!"));

        post.getLikes().remove(user);
        user.getLikedPosts().remove(post);
        return postRepo.save(post);
    }

    public PageableResponse<Post> findAllUserLikedPosts(String email, int page, int size) {
        Page<Post> result = postRepo.findAllUserLikedPosts(email, PageRequest.of(page, size));

        return new PageableResponse<>(result.getTotalElements(), result.getContent());
    }

    public PageableResponse<Post> findAllSubscribingUsersPosts(String email, int page, int size) {
        Page<Post> result = postRepo.findAllSubscribingUsersPosts(email, PageRequest.of(page, size));
        return new PageableResponse<>(result.getTotalElements(), result.getContent());
    }

    public Post getPostById(Long id) {
        return postRepo.findById(id).orElseThrow(() -> new NotFoundException("Post not found"));
    }

    public PageableResponse<Post> findAllUsersPostById(Long id, int page, int size) {
        Page<Post> allPostsByUsersById = postRepo.findAllByUser_Id(id, PageRequest.of(page, size));
        return new PageableResponse<>(allPostsByUsersById.getTotalElements(), allPostsByUsersById.getContent());
    }

    /**
     * @author kizotov
     */

    public PageableResponse<Post> getUserPosts(String username, int page, int limit) {
        var posts = postRepo.getUserPosts(username, PageRequest.of(page, limit));
        return new PageableResponse<>(posts.getTotalElements(), posts.getContent());
    }

    public PageableResponse<Post> getFollowingPosts(Long userId, int page, int limit) {
        var posts = postRepo.followingPosts(userId, PageRequest.of(page, limit));
        return new PageableResponse<>(posts.getTotalElements(), posts.getContent());
    }

    public Page<Post> commentedPosts(String userEmail, int page, int limit) {
        return postRepo.commentedPosts(userEmail, PageRequest.of(page, limit));
    }

    @Transactional
    public boolean containsRepost(String username, Post toBeRetweeted) {
        Optional<Post> publishedByHead;
        Optional<Post> publishedByParent;
        try {
            publishedByHead = postRepo.userPosts(username).filter(p -> p.getHeadPost().equals(toBeRetweeted)).findFirst();
        } catch (NullPointerException ex) {
            publishedByHead = Optional.empty();
        }
        try {
            publishedByParent= postRepo.userPosts(username).filter(p -> p.getParentPost().equals(toBeRetweeted)).findFirst();
        } catch (NullPointerException ex) {
            publishedByParent = Optional.empty();
        }
        if (publishedByHead.isPresent()) return true;
        else if (publishedByParent.isPresent()) return true;
        else return false;
    }
}
