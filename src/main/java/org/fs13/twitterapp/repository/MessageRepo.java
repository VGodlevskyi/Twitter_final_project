package org.fs13.twitterapp.repository;

import org.fs13.twitterapp.entity.Chat;
import org.fs13.twitterapp.entity.Message;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {
    Page<Message> findAllByChat(Chat chat, Pageable params);
    default Message findMessageById(Long id) {
        return this.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("message with id %d not found", id)));
    }
}
