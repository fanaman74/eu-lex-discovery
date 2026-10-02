export interface Rule {
  title: string;
  reference: string;
  /** ISO date of adoption or publication; null when the source is an undated web page. */
  date: string | null;
  kind: string;
  summary: string;
  topics: string[];
  url: string;
  host: string;
}
export interface RuleGroup { id: string; body: string; role: string; rules: Rule[] }

/** Hand-curated list, not fed by the monitor. Every entry was checked against its official source on the date below. */
export const rulesCheckedOn = '2026-10-02';

export const ruleGroups: RuleGroup[] = [
  {
    id: 'all-staff',
    body: 'All EU institutions',
    role: 'The Staff Regulations bind every EU institution and agency as an employer. The Commission’s own rules and the Ombudsman’s inquiries both start from it.',
    rules: [
      {
        title: 'Staff Regulations of Officials and Conditions of Employment of Other Servants',
        reference: 'Regulation No 31 (EEC), 11 (EAEC)',
        date: '1962-06-14',
        kind: 'Regulation, consolidated version of 1 January 2026',
        summary: 'Article 12a prohibits psychological and sexual harassment and protects staff who report it. Article 24 obliges the institution to assist staff who are attacked or harassed. Articles 22a and 22b protect whistleblowers, and Article 1e requires working conditions that meet health and safety standards.',
        topics: ['Harassment', 'Duty of assistance', 'Whistleblowing', 'Health and safety'],
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:01962R0031-20260101',
        host: 'EUR-Lex'
      }
    ]
  },
  {
    id: 'commission',
    body: 'European Commission',
    role: 'The Commission sets its own internal rules for its staff and proposes EU-wide policy on health and safety at work.',
    rules: [
      {
        title: 'Decision on the prevention of and fight against psychological and sexual harassment',
        reference: 'C(2023) 8630 final',
        date: '2023-12-12',
        kind: 'Commission Decision, internal staff rules',
        summary: 'The Commission’s current anti-harassment policy for its own staff. It replaces the 2006 decision, creates a Chief Confidential Counsellor as the first contact point for people who feel harassed, and sets out the informal and formal procedures.',
        topics: ['Harassment', 'Staff procedures'],
        url: 'https://www.era.europa.eu/system/files/2024-05/MB%20Decision%20n%C2%B0%20350%20-%20Annex%20-%20C_2023_8630_F1_COMMISSION_DECISION_EN_V6_P1_3034149.pdf',
        host: 'Copy published by the EU Agency for Railways (PDF)'
      },
      {
        title: 'A comprehensive approach to mental health',
        reference: 'COM(2023) 298 final',
        date: '2023-06-07',
        kind: 'Commission Communication, EU-wide policy',
        summary: 'Sets out the Commission’s mental health policy across sectors, including psychosocial risks and mental health at work. It is a policy programme, not binding law.',
        topics: ['Mental health', 'Psychosocial risk'],
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52023DC0298',
        host: 'EUR-Lex'
      },
      {
        title: 'EU strategic framework on health and safety at work 2021–2027',
        reference: 'COM(2021) 323 final',
        date: '2021-06-28',
        kind: 'Commission Communication, EU-wide policy',
        summary: 'The Commission’s priorities for occupational safety and health for all workers in the EU, including the prevention of psychosocial risks. It is a policy programme, not binding law.',
        topics: ['Health and safety', 'Psychosocial risk'],
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52021DC0323',
        host: 'EUR-Lex'
      }
    ]
  },
  {
    id: 'ombudsman',
    body: 'European Ombudsman',
    role: 'The Ombudsman does not write staff rules. The office examines whether EU institutions apply theirs properly and publishes recommendations and decisions.',
    rules: [
      {
        title: 'Report on dignity at work in the EU institutions and agencies',
        reference: 'SI/2/2018/AMF',
        date: '2018-12-17',
        kind: 'Ombudsman report, good practice',
        summary: 'Reviews the anti-harassment policies of 26 EU institutions and agencies and lists good practices: awareness raising, mandatory training, psychosocial risk assessment, swift procedures, and cover for all personnel including trainees.',
        topics: ['Harassment', 'Psychosocial risk', 'Good practice'],
        url: 'https://www.ombudsman.europa.eu/en/doc/inspection-report/en/107799',
        host: 'European Ombudsman'
      },
      {
        title: 'Decision on how the EEAS dealt with allegations of psychological harassment in an EU civilian mission',
        reference: 'Case 549/2020/NH',
        date: '2021-05-20',
        kind: 'Ombudsman decision',
        summary: 'An example of the Ombudsman reviewing how an institution handled a staff member’s harassment allegations, here in the EUCAP Sahel Mali mission. The case was settled by the institution; the full decision is not published, to protect the complainant.',
        topics: ['Harassment', 'Complaint handling'],
        url: 'https://www.ombudsman.europa.eu/en/decision/en/142068',
        host: 'European Ombudsman'
      }
    ]
  }
];
