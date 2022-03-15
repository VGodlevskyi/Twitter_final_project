package org.fs13.twitterapp.repository;

import org.fs13.twitterapp.entity.BaseEntity;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepositoryInterface<E extends BaseEntity> extends JpaRepository<E, Long> {
    default E findEntityById(Long id) {
        Optional<E> entityOptional = findById(id);
        if (!entityOptional.isPresent()) {
            String msg = String.format("An error occurred while trying to find entity with id %d. ", id);
            throw new NotFoundException(msg);
        }
        return entityOptional.get();
    }
}