create sequence entity_id_seq;

--assigning sequence
alter table chats alter column id set default nextval('entity_id_seq');
alter table comments alter column id set default nextval('entity_id_seq');
alter table confirmation_token alter column id set default nextval('entity_id_seq');
alter table messages alter column id set default nextval('entity_id_seq');
alter table post alter column id set default nextval('entity_id_seq');
alter table tbl_notification alter column id set default nextval('entity_id_seq');
alter table tbl_refresh_tokens alter column id set default nextval('entity_id_seq');
alter table tbl_repost alter column id set default nextval('entity_id_seq');
alter table tbl_user alter column id set default nextval('entity_id_seq');

--because first id is assigned to demo user in 001_demo_user.sql
alter sequence entity_id_seq restart with 2;

commit;
