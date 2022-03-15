package org.fs13.twitterapp.repository;

import org.fs13.twitterapp.entity.Chat;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface ChatRepo extends JpaRepository<Chat, Long> {

    Page<Chat> findChatsByChatMembersContaining(User member, Pageable params);

    default Chat findChatById(Long id) {
        return this.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("chat with id %d not found", id)));
    }
}
