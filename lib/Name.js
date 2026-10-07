import { transliterate, slugify } from 'transliteration'

import { enumise, TRANS, capitalise, shortify } from '@empyria/classification'

export const TITLE_LIST = [
	// Common titles
	'Master',
	'Mr',
	'Messrs',
	'Miss',
	'Mrs',
	'Ms',
	'Mx',
	// Formal titles
	'Sir',
	'Gentleman',
	'Sire',
	'Mistress',
	'Madame',
	'Dame',
	'Lord',
	'Esq',
	'Esquire',
	'Excellency',
	'Excellence',
	'Her Honour',
	'His Honour',
	'The Right Honourable',
	'The Most Honourable',
	'The Much Honoured',
	'King',
	'Queen',
	'Prince',
	'Princess',
	// Academic and professional titles
	'Dr',
	'Professor',
	'KC', // King's Counsel
	'Cl', // Counsel
	'Counsel',
	'SCl', // Senior Counsel
	'Senior Counsel',
	'Chancellor',
	'Vice-Chancellor',
	'Principal',
	'President',
	'Warden',
	'Dean',
	'Regent',
	'Rector',
	'Provost',
	// Religious titles
	'His Holiness',
	'His All Holiness',
	'His Beatitude',
	'His Excellency',
	'His Most Eminent Highness',
	'His Eminence',
	'Most Reverend Eminence',
	'The Most Reverend',
	'His Grace',
	'His Lordship',
	'The Reverend',
	'Father',
	'Pastor',
	'Brother',
	'Sister',
	'Elder',
	'Rabbi',
	'Cantor',
	'Chief Rabbi',
	'Grand Rabbi',
	'Rebbetzin',
	transliterate('Imām'),
	transliterate('Shaykh'),
	transliterate('Muftī'),
	transliterate('Hāfiz'),
	transliterate('Hāfizah'),
	transliterate('Qārī'),
	transliterate('Mawlānā'),
	transliterate('Hājī'),
	'Sayyid',
	'Sayyidah',
	'Sharif',
	'Ayatollah',
	'Seghatoleslam',
	'Mohyeddin',
	'Eminent',
	transliterate('Rōshi'),
	'Sensei',
	'Venerable',
]
export const TITLES = enumise(TITLE_LIST)

// Honorifics as compact keys (transliterated, alphanumerics only, upper-case) — the form
// `nameFp` compares each token against. `TITLES` (an enumise() object) can't be used directly:
// it has no `.has`, its keys carry `_` separators, and its values keep original casing.
const TITLE_KEYS = new Set(
	TITLE_LIST.map((t) =>
		transliterate(t)
			.toUpperCase()
			.replace(/[^A-Z0-9]/g, ''),
	),
)

export function findTitle(_title) {
	if (!_title) return undefined

	const title = transliterate(_title.replace(/[^a-z0-9\s-]/gi, '')).toUpperCase()
	return TITLE_LIST.find((t) => transliterate(t).toUpperCase() === title)
}

/**
 * Base fold: transliterate to ASCII, collapse any run of whitespace to a single space, trim.
 * @param {unknown} value
 * @returns {string}
 */
export function fold(value) {
	return transliterate(String(value ?? ''))
		.replace(/\s+/g, ' ')
		.trim()
}

/**
 * Compact identifier key — transliterated, alphanumerics only, upper-case. Format-agnostic:
 * `idKey('5299 00 T8BM49') === idKey('529900t8bm49')`, `idKey('DE 123.456.789') === 'DE123456789'`.
 * Empty string for empty/nullish input (callers skip those).
 * @param {unknown} value
 * @returns {string}
 */
export function idKey(value) {
	return fold(value)
		.toUpperCase()
		.replace(/[^A-Z0-9]/g, '')
}

/**
 * Free-text name form for external full-text engines (BAILII, CourtListener, opencaselaw) —
 * transliterated, lower-case, single-spaced, tokens intact so their tokenisers still work.
 * @param {unknown} value
 * @returns {string}
 */
export function nameText(value) {
	return fold(value).toLowerCase()
}

/**
 * Order-, case-, punctuation-, script-invariant name fingerprint: transliterate, upper-case,
 * split on whitespace, strip non-alphanumerics per token, drop honorifics and 1-char tokens,
 * dedupe, sort. `nameFp('Dr. Steve Charles') === nameFp('charles, steve') === 'CHARLES STEVE'`.
 *
 * Best-effort for organisations — legal-form / "&" vs "and" differences aren't reconciled here
 * (`nameFp('J.P. Morgan & Co') !== nameFp('JPMorgan and Co')`); the `:Ident` exact match and the
 * raw-name text search are the reliable paths for companies.
 * @param {unknown} value
 * @returns {string}
 */
export function nameFp(value) {
	const tokens = fold(value)
		.toUpperCase()
		.split(' ')
		.map((token) => token.replace(/[^A-Z0-9]/g, ''))
		.filter((token) => token.length > 1 && !TITLE_KEYS.has(token))
	return [...new Set(tokens)].sort().join(' ')
}

export { transliterate, slugify, TRANS, capitalise, shortify }
