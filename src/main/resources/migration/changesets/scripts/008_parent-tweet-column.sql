alter table post add column parent_id bigint;
alter table post add constraint fk_parentpost_post foreign key (parent_id) references post;
commit;
