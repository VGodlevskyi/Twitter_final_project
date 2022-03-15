package org.fs13.twitterapp.service.impl;

import org.fs13.twitterapp.repository.RepostRepo;
import org.springframework.stereotype.Service;

@Service
public class RepostService {
  private RepostRepo repostRepo;

  public RepostService(RepostRepo repostRepo) {
    this.repostRepo = repostRepo;
  }
}
