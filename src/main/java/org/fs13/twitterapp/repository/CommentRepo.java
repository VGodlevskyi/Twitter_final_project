package org.fs13.twitterapp.repository;

import org.fs13.twitterapp.entity.Comment;
import org.fs13.twitterapp.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {
    @Query("select c from Comment c where c.id = :commentId")
    Optional<Comment> findCommentById(Long commentId);

    Page<Comment> getAllByPost(Post post, Pageable params);
}
