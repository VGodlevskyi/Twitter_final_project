insert into tbl_user (id, created_by, created_at, updated_by, updated_at, avatar_url, bio, birthdate, user_email,
                      enabled, language, location, locked, name, role, surname, title_img_url, website, password)
values (1, 'user1', '1990-01-01', 'user1', '1990-01-01', 'avatar_url1', 'bio1', '1990-01-01', 'user@gmail.com', true,
        'language1', 'location1', false, 'name1', 'USER', 'surname1', 'title_img_url1', 'website1',
        '$2a$10$wTjAkXvduF1GpI.D3kZyNe4aO6VZCRBA1iewvvvMLYTqpJ5JTcd46');
insert into tbl_user (id, created_by, created_at, updated_by, updated_at, avatar_url, bio, birthdate, user_email,
                      enabled, language, location, locked, name, role, surname, title_img_url, website, password)
values (2, 'user2', '1990-01-01', 'user1', '1990-01-01', 'avatar_url1', 'bio1', '1990-01-01', 'user_email2', true,
        'language1', 'location1', false, 'name2', 'USER', 'surname2', 'title_img_url1', 'website1',
        '$2a$10$wTjAkXvduF1GpI.D3kZyNe4aO6VZCRBA1iewvvvMLYTqpJ5JTcd46');
insert into tbl_user (id, created_by, created_at, updated_by, updated_at, avatar_url, bio, birthdate, user_email,
                      enabled, language, location, locked, name, role, surname, title_img_url, website, password)
values (3, 'user3', '1990-01-01', 'user1', '1990-01-01', 'avatar_url1', 'bio1', '1990-01-01', 'user_email3', true,
        'language1', 'location1', false, 'name3', 'USER', 'surname3', 'title_img_url1', 'website1',
        '$2a$10$wTjAkXvduF1GpI.D3kZyNe4aO6VZCRBA1iewvvvMLYTqpJ5JTcd46');


-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id)
-- values (null, 'user1', '1990-01-01', 'user1', '1990-01-01', 'body1', 1);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id)
-- values (null, 'user1', '1990-01-01', 'user1', '1990-01-01', 'body2', 2);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id)
-- values (null, 'user1', '1990-01-01', 'user1', '1990-01-01', 'body3', 3);

INSERT INTO SUBSCRIBERS (USER_WHO_ID, USER_WHOM_ID)
VALUES (1, 2);
INSERT INTO SUBSCRIBERS (USER_WHO_ID, USER_WHOM_ID)
VALUES (1, 3);
INSERT INTO SUBSCRIBERS (USER_WHO_ID, USER_WHOM_ID)
VALUES (2, 1);


insert into CHATS (id, created_by, created_at, updated_by, updated_at, initiator_id)
    values (1, 'user@gmail.com', '2021-11-21 13:00:00.083', 'user@gmail.com', '2021-11-21 13:00:00.083', 1);
insert into CHATS (id, created_by, created_at, updated_by, updated_at, initiator_id)
    values (2, 'user_email2', '2021-11-21 13:05:00.020', 'user_email2', '2021-11-21 13:05:00.020', 2);
insert into CHATS (id, created_by, created_at, updated_by, updated_at, initiator_id)
    values (3, 'user_email3', '2021-11-21 13:10:00.000', 'user_email3','2021-11-21 13:05:00.020', 3);
insert into CHATS (id, created_by, created_at, updated_by, updated_at, initiator_id)
    values (4, 'user_email3', '2021-11-21 13:10:00.000', 'user_email3', '2021-11-21 13:05:00.020', 3);
insert into CHATS (id, created_by, created_at, updated_by, updated_at, initiator_id)
    values (5, 'user_email2', '2021-11-21 13:10:00.000', 'user_email2', '2021-11-21 13:05:00.020', 2);

insert into CONN_CHAT_USER (chat_id, user_id) values (1, 1);
insert into CONN_CHAT_USER (chat_id, user_id) values (1, 2);
insert into CONN_CHAT_USER (chat_id, user_id) values (1, 3);
insert into CONN_CHAT_USER (chat_id, user_id) values (2, 2);
insert into CONN_CHAT_USER (chat_id, user_id) values (2, 3);
insert into CONN_CHAT_USER (chat_id, user_id) values (3, 1);
insert into CONN_CHAT_USER (chat_id, user_id) values (3, 3);
insert into CONN_CHAT_USER (chat_id, user_id) values (4, 3);
insert into CONN_CHAT_USER (chat_id, user_id) values (4, 2);
insert into CONN_CHAT_USER (chat_id, user_id) values (5, 2);
insert into CONN_CHAT_USER (chat_id, user_id) values (5, 1);

insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (1, 'user@gmail.com', '2021-11-21 13:45:00.020', 'user@gmail.com', '2021-11-21 13:45:00.020', 'hello test');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (2, 'user_email3', '2021-11-21 13:45:00.020', 'user_email3', '2021-11-21 13:45:00.020', 'hello test');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (3, 'user_email2', '2021-11-21 13:45:00.020', 'user_email2', '2021-11-21 13:45:00.020', 'hello test');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (4, 'user_email2', '2021-11-21 13:45:00.020', 'user@gmail.com', '2021-11-21 13:45:00.020', 'hello test');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (5, 'user_email3', '2021-11-21 13:45:00.020', 'user_email3', '2021-11-21 13:47:00.020', 'test message');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (6, 'user_email2', '2021-11-21 13:45:00.020', 'user_email2', '2021-11-21 13:46:00.020', 'hello test message');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body)  values (7, 'user@gmail.com', '2021-11-21 13:45:00.020', 'user@gmail.com', '2021-11-21 13:45:00.020', 'hello test message');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (8, 'user_email3', '2021-11-21 13:45:00.020', 'user_email3', '2021-11-21 13:45:00.020', 'hello test');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (9, 'user@gmail.com', '2021-11-21 13:45:00.020', 'user@gmail.com', '2021-11-21 13:45:00.020', 'bye test message');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (10, 'user_email3', '2021-11-21 13:45:00.020', 'user_email3', '2021-11-21 13:45:00.020', 'hello test');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (11, 'user_email2', '2021-11-21 13:45:00.020', 'user_email3', '2021-11-21 13:45:00.020', 'hello test');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (12, 'user@gmail.com', '2021-11-21 13:45:00.020', 'user@gmail.com', '2021-11-21 13:45:00.020', 'hello test');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (13, 'user_email2', '2021-11-21 13:45:00.020', 'user_email2', '2021-11-21 13:45:00.020', 'hello test');
insert into MESSAGES (id, created_by, created_at, updated_by, updated_at, msg_body) values (14, 'user@gmail.com', '2021-11-21 13:45:00.020', 'user@gmail.com', '2021-11-21 13:45:00.020', 'bye test');


insert into CONN_USER_MESSAGE (user_id, message_id) values (1, 1);
insert into CONN_USER_MESSAGE (user_id, message_id) values (3, 2);
insert into CONN_USER_MESSAGE (user_id, message_id) values (2, 3);
insert into CONN_USER_MESSAGE (user_id, message_id) values (2, 4);
insert into CONN_USER_MESSAGE (user_id, message_id) values (3, 5);
insert into CONN_USER_MESSAGE (user_id, message_id) values (2, 6);
insert into CONN_USER_MESSAGE (user_id, message_id) values (1, 7);
insert into CONN_USER_MESSAGE (user_id, message_id) values (3, 8);
insert into CONN_USER_MESSAGE (user_id, message_id) values (1, 9);
insert into CONN_USER_MESSAGE (user_id, message_id) values (3, 10);
insert into CONN_USER_MESSAGE (user_id, message_id) values (2, 11);
insert into CONN_USER_MESSAGE (user_id, message_id) values (1, 12);
insert into CONN_USER_MESSAGE (user_id, message_id) values (2, 13);
insert into CONN_USER_MESSAGE (user_id, message_id) values (1, 14);

insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (1, 1);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (1, 2);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (1, 3);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (2, 4);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (2, 5);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (2, 6);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (3, 7);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (3, 8);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (3, 9);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (4, 10);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (4, 11);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (5, 12);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (5, 13);
insert into CONN_CHAT_MESSAGE (chat_id, message_id) values (5, 14);


-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (4, 'user2', '2021-01-07', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (5, 'user2', '2021-01-07', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (6, 'user2', '2021-01-07', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (7, 'user2', '2021-01-07', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (8, 'user2', '2021-01-07', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (9, 'user2', '2021-01-07', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (10, 'user2', '2021-01-07', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (11, 'user2', '2021-01-08', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (12, 'user2', '2021-01-09', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (13, 'user2', '2021-01-10', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (14, 'user2', '2021-01-11', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (15, 'user2', '2021-01-12', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (16, 'user2', '2021-01-13', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (17, 'user2', '2021-01-15', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (18, 'user2', '2021-01-16', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (19, 'user2', '2021-01-17', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (20, 'user2', '2021-01-18', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (21, 'user2', '2021-01-19', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (22, 'user3', '2021-01-20', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (23, 'user3', '2021-01-21', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (24, 'user3', '2021-01-22', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (25, 'user3', '2021-01-23', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (26, 'user3', '2021-01-24', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (27, 'user3', '2021-01-25', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (28, 'user3', '2021-01-26', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (29, 'user3', '2021-01-27', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (30, 'user3', '2021-01-28', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (31, 'user3', '2021-01-29', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (32, 'user3', '2021-01-30', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (33, 'user3', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (34, 'user3', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (35, 'user3', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (36, 'user3', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (37, 'user3', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (38, 'user3', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (39, 'user3', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (40, 'user3', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (41, 'user1', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (42, 'user1', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (43, 'user1', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (44, 'user1', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
-- insert into post (id, created_by, created_at, updated_by, updated_at, body, user_id) values (45, 'user1', '2021-02-01', 'user2', '1990-01-01', 'body3', 3);
