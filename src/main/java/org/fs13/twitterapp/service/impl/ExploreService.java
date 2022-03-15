package org.fs13.twitterapp.service.impl;

import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.repository.PostRepo;
import org.fs13.twitterapp.service.api.PaginationService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExploreService implements PaginationService<Post> {
    private final PostRepo postRepo;

    @Override
    public PageableResponse<Post> getObjectsPage(int page, int limit, String... orderBy) {
        var params = PageRequest.of(page, limit, Sort.by(orderBy).descending());
        var postsPage = postRepo.getPostsPage(params);
        return new PageableResponse<>(postsPage.getTotalElements(), postsPage.getContent());
    }
}
