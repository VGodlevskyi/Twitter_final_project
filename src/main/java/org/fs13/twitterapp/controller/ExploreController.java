package org.fs13.twitterapp.controller;

import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rs.PostResponse;
import org.fs13.twitterapp.facade.ExploreFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@RestController
@RequestMapping("/api/v0/explore")
@RequiredArgsConstructor
public class ExploreController {
    private final ExploreFacade exploreFacade;

    @Validated
    @GetMapping("/list")
    public Iterable<PostResponse> getPostsList(@RequestParam("page")  @NotNull @PositiveOrZero Integer page,
                                               @RequestParam("limit") @NotNull @Positive Integer limit,
                                               @RequestParam(value = "order", defaultValue = "createdDate") String order)
    {
        return exploreFacade.defaultExploreList(page, limit, order).getList();
    }

    @Validated
    @GetMapping("/total")
    public ResponseEntity<Long> getPostsTotal(@RequestParam("page") @NotNull @PositiveOrZero Integer page,
                                              @RequestParam("limit") @NotNull @Positive Integer limit,
                                              @RequestParam(value = "order", defaultValue = "createdDate") String order)
    {
        return new ResponseEntity<>(exploreFacade.defaultExploreList(page, limit, order).getTotal(), HttpStatus.OK);
    }
}
