-- Copyright 2022 Nang Khai.  All rights reserved.
-- Use of this source code is governed by a GNU General Public License v3.0
-- license that can be found in the LICENSE file.

CREATE TABLE company (
  company_id SERIAL PRIMARY KEY,
  company_name VARCHAR(240),
  company_link VARCHAR(2048) UNIQUE NOT NULL,
  logoUrl VARCHAR(2048)
);

CREATE TABLE job_post (
  job_id SERIAL PRIMARY KEY,
  company_id integer REFERENCES company (company_id),
  job_title VARCHAR(128),
  posted_date TIMESTAMP,
  formatted_date VARCHAR(128),
  engine_name VARCHAR(240) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  job_link VARCHAR(2048) UNIQUE NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE search_cache (
  cache_id SERIAL PRIMARY KEY,
  keywords TEXT NOT NULL UNIQUE,
  engine_name VARCHAR(240) NOT NULL UNIQUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON job_post
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_cache_timestamp
BEFORE UPDATE ON search_cache
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
