package org.fs13.twitterapp.service.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.fs13.twitterapp.entity.BaseEntity;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.repository.RepositoryInterface;
import org.fs13.twitterapp.service.ServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.*;
import java.util.Optional;

@NoArgsConstructor
@AllArgsConstructor
public abstract class GeneralService<E extends BaseEntity> implements ServiceInterface<E> {
    @Autowired
    private RepositoryInterface<E> repo;

    @Override
    public E save(E entity) {
        return repo.save(entity);
    }

    @Override
    public void delete(E entity) {
        repo.delete(entity);
    }

    @Override
    public List<E> findAll() {
        return repo.findAll();
    }

    @Override
    public Page<E> findAll(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public void deleteById(Long id) {
        Optional<E> entityOpt = repo.findById(id);
        if (!entityOpt.isPresent()) {
            String msg = String.format("Entity with id %d was not found.", id);
            throw new NotFoundException(msg);
        }

        delete(entityOpt.get());
    }

    @Override
    public Optional<E> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public E getOne(Long id) {
        return repo.getById(id);
    }

    @Override
    public E findEntityById(Long id) {
        return repo.findEntityById(id);
    }

    @Override
    public List<E> findAllById(Iterable<Long> listOfIds) {
        return repo.findAllById(listOfIds);
    }

}