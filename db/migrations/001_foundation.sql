CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS sources (
  id BIGSERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  base_url TEXT NOT NULL,
  kind TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  last_checked_at TIMESTAMPTZ,
  last_success_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS courts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  UNIQUE(name, jurisdiction)
);

CREATE TABLE IF NOT EXISTS cases (
  id BIGSERIAL PRIMARY KEY,
  celex TEXT NOT NULL UNIQUE,
  case_number TEXT,
  title TEXT NOT NULL,
  court_id BIGINT REFERENCES courts(id),
  judgment_date DATE,
  publication_date DATE,
  discovered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  language TEXT,
  relevance_label TEXT NOT NULL DEFAULT 'not AI assessed',
  relevance_score NUMERIC(4,3),
  summary TEXT,
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(summary,''))
  ) STORED
);
CREATE INDEX IF NOT EXISTS cases_search_idx ON cases USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS cases_publication_idx ON cases(publication_date DESC NULLS LAST);

CREATE TABLE IF NOT EXISTS documents (
  id BIGSERIAL PRIMARY KEY,
  case_id BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  source_id BIGINT NOT NULL REFERENCES sources(id),
  source_reference TEXT NOT NULL,
  document_type TEXT NOT NULL DEFAULT 'judgment',
  official_url TEXT NOT NULL,
  text_content TEXT,
  retrieved_at TIMESTAMPTZ,
  publication_date DATE,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE(source_id, source_reference)
);

CREATE TABLE IF NOT EXISTS topics (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  name_nl TEXT NOT NULL,
  terms_en TEXT[] NOT NULL DEFAULT '{}',
  terms_fr TEXT[] NOT NULL DEFAULT '{}',
  terms_nl TEXT[] NOT NULL DEFAULT '{}',
  enabled BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS case_topics (
  case_id BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  topic_id BIGINT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  match_type TEXT NOT NULL DEFAULT 'keyword match',
  PRIMARY KEY(case_id, topic_id)
);

CREATE TABLE IF NOT EXISTS reports (
  id BIGSERIAL PRIMARY KEY,
  case_id BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  report_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  source_document_ids BIGINT[] NOT NULL DEFAULT '{}',
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS monitoring_runs (
  id BIGSERIAL PRIMARY KEY,
  source_id BIGINT NOT NULL REFERENCES sources(id),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'running',
  discovered_count INTEGER NOT NULL DEFAULT 0,
  imported_count INTEGER NOT NULL DEFAULT 0,
  failure_count INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  details JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS provider_settings (
  id BIGSERIAL PRIMARY KEY,
  provider TEXT NOT NULL UNIQUE,
  base_url TEXT,
  model TEXT,
  encrypted_api_key TEXT,
  enabled BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schedule_preferences (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  timezone TEXT NOT NULL DEFAULT 'Europe/Brussels',
  hour INTEGER NOT NULL DEFAULT 6 CHECK (hour BETWEEN 0 AND 23),
  minute INTEGER NOT NULL DEFAULT 30 CHECK (minute BETWEEN 0 AND 59),
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO sources(key, name, base_url, kind) VALUES
  ('eurlex-sparql', 'EUR-Lex / Cellar SPARQL', 'https://publications.europa.eu/webapi/rdf/sparql', 'sparql')
ON CONFLICT(key) DO NOTHING;
INSERT INTO schedule_preferences(id) VALUES(1) ON CONFLICT(id) DO NOTHING;
INSERT INTO topics(slug, name_en, name_fr, name_nl, terms_en, terms_fr, terms_nl) VALUES
 ('workplace-harassment','Workplace harassment','Harcèlement au travail','Pesterijen op het werk', ARRAY['harassment','bullying','mobbing','intimidation'], ARRAY['harcèlement','intimidation'], ARRAY['pesterijen','intimidatie']),
 ('psychosocial-risk','Psychosocial risks','Risques psychosociaux','Psychosociale risico''s', ARRAY['psychosocial','mental health','burnout','occupational stress'], ARRAY['psychosocial','santé mentale','épuisement'], ARRAY['psychosociaal','mentale gezondheid','burn-out']),
 ('employment-discrimination','Employment discrimination','Discrimination dans l''emploi','Discriminatie op het werk', ARRAY['discrimination','equal treatment','retaliation'], ARRAY['discrimination','égalité de traitement','représailles'], ARRAY['discriminatie','gelijke behandeling','represailles'])
ON CONFLICT(slug) DO NOTHING;
