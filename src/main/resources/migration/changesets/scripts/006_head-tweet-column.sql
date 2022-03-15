alter table post add column head_id bigint;
alter table post add constraint fk_headpost_post foreign key (head_id) references post;
commit;
