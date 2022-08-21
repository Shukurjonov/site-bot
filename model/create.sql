CREATE TABLE IF NOT EXISTS public.admins
(
    id serial NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    username character varying(32) NOT NULL,
    password text NOT NULL,
    role character varying(15) DEFAULT 'admin'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer DEFAULT 1,
    state boolean DEFAULT true,
    CONSTRAINT admins_pkey PRIMARY KEY (id),
    CONSTRAINT admins_username_username1_key UNIQUE (username)
        INCLUDE(username)
);


CREATE TABLE IF NOT EXISTS public.posters
(
    id serial NOT NULL,
    image_link character varying(150) NOT NULL,
    content character varying(1000) NOT NULL,
    link character varying(150) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT posters_pkey PRIMARY KEY (id)
)


CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    first_name character varying(255) NOT NULL,
    username character varying(32),
    chat_id numeric(10,0) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status boolean DEFAULT true,
    state boolean DEFAULT true,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username)
)