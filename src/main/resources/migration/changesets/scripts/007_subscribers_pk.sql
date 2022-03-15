alter table subscribers add constraint subscribers_pkey primary key (user_who_id, user_whom_id);
commit;