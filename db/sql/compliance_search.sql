-- https://github.com/benawad/postgres-full-text-search/blob/master/example.sql

-- Original options:

-- Select * from clean_compliance_search
-- WHERE document_with_index @@ to_tsquery('Wall')
-- ORDER BY ts_rank(document_with_index, plainto_tsquery('Wall'));

-- alter table clean_compliance_search
-- add column document tsvector;
-- update clean_compliance_search
-- set document = to_tsvector(header_english || ' ' || corpus_english);

-- alter table clean_compliance_search
-- add column document_with_index tsvector;
-- update clean_compliance_search
-- set document_with_index = to_tsvector(header_english || ' ' || corpus_english);
-- create index  document_index
-- on clean_compliance_search
-- using gin (document_with_index);

-- The following is what you care about.
-- It will:
-- create a table
-- add the new columns
-- create a function to update new rows that are added
-- create a trigger to call clean_compliance_search_tsvector_trigger()

select *
from clean_compliance_search
where document_with_weights_english @@ plainto_tsquery('activity');

CREATE TABLE clean_compliance_search AS TABLE clean_compliance;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE clean_compliance_search TO doadmin;

CREATE SEQUENCE clean_compliance_search_id_seq OWNED BY clean_compliance_search.id;
ALTER TABLE clean_compliance_search ALTER COLUMN id SET DEFAULT nextval('clean_compliance_search_id_seq');
UPDATE clean_compliance_search SET id = nextval('clean_compliance_search_id_seq');

ALTER TABLE clean_compliance_search ADD PRIMARY KEY (id)
  
ALTER TABLE clean_compliance_search
  ADD COLUMN document_with_weights_english tsvector,
  ADD COLUMN document_with_weights_french tsvector,
  ADD COLUMN document_with_weights_german tsvector;

UPDATE clean_compliance_search
SET document_with_weights_english =
      setweight(to_tsvector('english', coalesce(header_english, '')), 'A')
      || setweight(to_tsvector('english', coalesce(summary_english, '')), 'B')
      || setweight(to_tsvector('english', coalesce(corpus_english, '')), 'C');

DROP INDEX document_weights_idx_english

CREATE INDEX document_weights_idx_english
  ON clean_compliance_search
  USING GIN (document_with_weights_english);

UPDATE clean_compliance_search
SET document_with_weights_french =
      setweight(to_tsvector('french', coalesce(header_french, '')), 'A')
      || setweight(to_tsvector('french', coalesce(summary_french, '')), 'B')
      || setweight(to_tsvector('french', coalesce(corpus_orig, '')), 'C');

DROP INDEX document_weights_idx_french

CREATE INDEX document_weights_idx_french
  ON clean_compliance_search
  USING GIN (document_with_weights_french);

UPDATE clean_compliance_search
SET document_with_weights_german =
      setweight(to_tsvector('german', coalesce(header_german, '')), 'A')
      || setweight(to_tsvector('german', coalesce(summary_german, '')), 'B')
      || setweight(to_tsvector('german', coalesce(corpus_orig, '')), 'C');

DROP INDEX document_weights_idx_german;

CREATE INDEX document_weights_idx_german
  ON clean_compliance_search
  USING GIN (document_with_weights_german);

CREATE OR REPLACE FUNCTION clean_compliance_search_tsvector_trigger() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
	NEW.document_with_weights_english =
      setweight(to_tsvector('english', coalesce(NEW.header_english, '')), 'A')
      || setweight(to_tsvector('english', coalesce(NEW.summary_english, '')), 'B')
      || setweight(to_tsvector('english', coalesce(NEW.corpus_orig, '')), 'C');
    NEW.document_with_weights_french =
      setweight(to_tsvector('french', coalesce(NEW.header_french, '')), 'A')
      || setweight(to_tsvector('french', coalesce(NEW.summary_french, '')), 'B')
      || setweight(to_tsvector('english', coalesce(NEW.corpus_orig, '')), 'C');
    NEW.document_with_weights_german =
      setweight(to_tsvector('german', coalesce(NEW.header_german, '')), 'A')
      || setweight(to_tsvector('german', coalesce(NEW.summary_german, '')), 'B')
      || setweight(to_tsvector('english', coalesce(NEW.corpus_orig, '')), 'C');
END;
$$;

CREATE TRIGGER create_compliance_search_tsvector
	BEFORE INSERT OR UPDATE
	ON clean_compliance
   	FOR EACH ROW
       EXECUTE PROCEDURE clean_compliance_search_tsvector_trigger();

-- create [or replace] function function_name(param_list)
--     returns return_type 
--     language plpgsql
--     as
-- $$
--   declare 
-- -- variable declaration
--   begin
--  -- logic
--   end;
-- $$
