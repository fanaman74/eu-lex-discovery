CREATE TABLE IF NOT EXISTS institution_updates (
  id BIGSERIAL PRIMARY KEY,
  source_id BIGINT NOT NULL REFERENCES sources(id),
  institution TEXT NOT NULL CHECK (institution IN ('commission', 'ombudsman')),
  external_id TEXT NOT NULL,
  title TEXT NOT NULL,
  kind TEXT NOT NULL,
  reference TEXT,
  document_date DATE,
  official_url TEXT NOT NULL,
  matched_terms TEXT[] NOT NULL DEFAULT '{}',
  discovered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(source_id, external_id)
);
CREATE INDEX IF NOT EXISTS institution_updates_date_idx ON institution_updates(institution, document_date DESC NULLS LAST);

INSERT INTO sources(key, name, base_url, kind) VALUES
  ('ombudsman-documents', 'European Ombudsman document search', 'https://www.ombudsman.europa.eu/rest/documents', 'rest'),
  ('commission-cellar', 'Commission documents in EUR-Lex / Cellar', 'https://publications.europa.eu/webapi/rdf/sparql', 'sparql'),
  ('commission-press', 'Commission Press Corner', 'https://ec.europa.eu/commission/presscorner/api/search', 'rest')
ON CONFLICT(key) DO NOTHING;
