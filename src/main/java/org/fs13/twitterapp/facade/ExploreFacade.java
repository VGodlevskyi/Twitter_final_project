package org.fs13.twitterapp.facade;

import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rq.PostRequest;
import org.fs13.twitterapp.dto.rs.PostResponse;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.service.api.PaginationService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class ExploreFacade extends GeneralFacade<Post, PostRequest, PostResponse> {
    private final PaginationService<Post> service;

    public PageableResponse<PostResponse> defaultExploreList(int page, int limit, String order) {
        var resp = service.getObjectsPage(page, limit, order);
        var list = StreamSupport
                                    .stream(resp.getList().spliterator(), false)
                                    .map(this::convertToDto)
                                    .collect(Collectors.toList());

        return new PageableResponse<>(resp.getTotal(), list);
    }

}
