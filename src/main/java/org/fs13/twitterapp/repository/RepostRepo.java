package org.fs13.twitterapp.repository;

import org.fs13.twitterapp.entity.Repost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepostRepo extends JpaRepository<Repost, Long> {
}

