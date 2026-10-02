export interface ParsedTitle { heading: string; formation: string | null; keywords: string[]; notes: string[] }

const trimStop = (value: string) => value.replace(/\.$/, '').trim();

/**
 * EUR-Lex titles pack several fields into one '#'-delimited string:
 * "Judgment of the Court (…) of 28 June 2018.#A v B.#Reference for a preliminary ruling — Social policy — ….#Case C-57/17."
 * This splits them for display only; the stored title is never altered, and anything that does not fit the pattern is shown whole.
 */
export function parseTitle(title: string): ParsedTitle {
  const parts = title.split('#').map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return { heading: title, formation: null, keywords: [], notes: [] };
  const [formation, parties, ...rest] = parts;
  const body = rest.filter((part) => !/^(Joined )?Cases? [A-Z]-\d/.test(part));
  const subject = body.filter((part) => part.includes(' — ')).sort((a, b) => b.length - a.length)[0];
  return {
    heading: trimStop(parties),
    formation: trimStop(formation),
    keywords: subject ? trimStop(subject).split(' — ').map((keyword) => keyword.trim()).filter(Boolean) : [],
    notes: body.filter((part) => part !== subject).map(trimStop)
  };
}
