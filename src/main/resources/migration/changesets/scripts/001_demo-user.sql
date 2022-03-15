insert into tbl_user (id, created_by, created_at, updated_by, updated_at, avatar_url, birthdate, user_email,
                      enabled, locked, name, role, surname, profile_background_url,password)
values (1,
        'kizotov', '2021-12-26',
        'kizotov', '2021-12-26',
        'https://i.pinimg.com/564x/28/d4/87/28d487c01a943d175fcb88a1e0e77a62.jpg','1990-01-01',
        'user@gmail.com',
        true,
        false,
        'Demus',
        'USER',
        'Demonious',
        'https://i.pinimg.com/564x/f2/bc/88/f2bc8848b997efa57207f6f02b3eeb1f.jpg',
        '$2a$10$wTjAkXvduF1GpI.D3kZyNe4aO6VZCRBA1iewvvvMLYTqpJ5JTcd46');
