DO $$ DECLARE
r RECORD;
BEGIN
FOR r IN (SELECT s.relname FROM pg_class s where s.relkind = 'S') LOOP
            EXECUTE 'DROP SEQUENCE IF EXISTS ' || quote_ident(r.relname) || ' CASCADE';
END LOOP;
END $$;