package org.fs13.twitterapp.repository;

import org.fs13.twitterapp.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

    @Query(value = "SELECT *\n" +
            "FROM POST p\n" +
            "WHERE p.id IN (SELECT ptl.POST_ID id\n" +
            "               FROM POSTS_TO_LIKES ptl\n" +
            "                        INNER JOIN tbl_user u on u.id=ptl.USER_ID \n" +
            "                where u.user_email = ?1)",
            countQuery = "SELECT count(*) FROM POST",
            nativeQuery = true)
    Page<Post> findAllUserLikedPosts(String email, Pageable pageable);

    @Query(value = "SELECT * FROM POST p\n" +
            "            WHERE p.user_id IN (\n" +
            "                SELECT s.user_who_id as id FROM SUBSCRIBERS s\n" +
            "                INNER JOIN TBL_USER u ON s.user_whom_id=u.id\n" +
            "                WHERE u.user_email=?1\n" +
            "            )",
            countQuery = "SELECT count(*) FROM POST",
            nativeQuery = true)
    Page<Post> findAllSubscribingUsersPosts(String email, Pageable pageable);

    Page<Post> findAllByUser_Id(Long id, Pageable pageable);

    /**
     * @author kizotov
     */

    @Query(value = "select p from Post p")
    Page<Post> getPostsPage(Pageable params);

    @Query(value = "select p from Post p where p.createdBy = :username order by p.updatedDate desc")
    Page<Post> getUserPosts(String username, Pageable params);

    @Query(value = "select p from Post p where p.id = :postId")
    Optional<Post> getPostByPostId(Long postId);

    @Query(value = "select p.* from post p where p.user_id in (select distinct s.user_who_id from subscribers s where s.user_whom_id = :userId UNION SELECT :userId) ORDER BY p.created_at DESC", nativeQuery = true)
    Page<Post> followingPosts(Long userId, Pageable params);

    @Query(value = "select p from Post p where p.createdBy = :username")
    Stream<Post> userPosts(String username);

    @Query(value = "SELECT *\n" +
            "FROM post p\n" +
            "WHERE p.id IN (\n" +
            "    SELECT post_id\n" +
            "    FROM comments c\n" +
            "             INNER JOIN tbl_user u on u.id = c.user_id\n" +
            "    WHERE c.post_id = p.id\n" +
            "      AND u.user_email = ?1\n" +
            ")",
            countQuery = "SELECT count(*) FROM POST",
            nativeQuery = true)
    Page<Post> commentedPosts(String userEmail, Pageable params);


}
