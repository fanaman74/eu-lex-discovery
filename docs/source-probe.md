# Official source verification

Verified on 2 October 2026 before implementation.

- Official access documentation: https://op.europa.eu/en/web/cellar/cellar-data
- Publication retrieval documentation: https://op.europa.eu/en/web/cellar/cellar-data/publications
- Public SPARQL endpoint: https://publications.europa.eu/webapi/rdf/sparql
- JSON results: GET with URL-encoded `query` and `format=application/sparql-results+json`.
- A live query of English case-law titles containing `harassment` returned genuine CJEU and General Court records, including CELEX `62023CJ0343` (Colombani v EEAS, 16 April 2026) and `62024TJ0145` (CU v EEAS, 18 March 2026).
- Full English judgment retrieval for `62023CJ0343` returned HTTP 200 and 119,555 bytes of XHTML. Request: `https://publications.europa.eu/resource/celex/62023CJ0343?language=ENG`, with `Accept: application/xhtml+xml` and `Accept-Language: en`.
- The content-negotiation endpoint redirected to an official CELLAR resource using an HTTP URL. The connector should upgrade official redirects to HTTPS and restrict redirect destinations.

## Metadata safeguards

`work_date_document` is the document/judgment date; it is not evidence of publication date. Missing publication dates must remain unknown. CELEX judgment/order records and Official Journal notices can describe the same case; the initial connector should select judgment/order identifiers and deduplicate stable document identifiers. Translations should not be represented as the original language unless the language of proceedings is known.

## Initial scope

The first implementation uses CELLAR for EU court judgments and orders. A keyword/title query is a discovery heuristic, not exhaustive full-text monitoring or AI classification. Full text, when retrieved, is kept separate from generated analysis. HUDOC, Belgian national databases, OCR, and semantic retrieval require subsequent connectors or processing milestones.

The retained `source-probe.html` is a local verification artifact, excluded from version control. Application case records must come from live connector imports rather than this artifact or hardcoded examples.
