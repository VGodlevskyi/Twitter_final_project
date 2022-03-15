create table conn_post_parent
(
    parent_id bigint
        constraint fk9680173huebrnbmt6g707h09o
            references post,
    repost_id bigint not null
        constraint fk9c0n9d1o8asm1ubxviu0w4i0u
            references post
);