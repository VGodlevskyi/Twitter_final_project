package org.fs13.twitterapp.service.api;

import org.fs13.twitterapp.dto.PageableResponse;

public interface PaginationService<T> {
    PageableResponse<T> getObjectsPage(int page, int limit, String... orderBy);
}
