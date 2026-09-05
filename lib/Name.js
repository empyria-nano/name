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

export function findTitle(_title) {
	if (!_title) return undefined

	const title = transliterate(_title.replace(/[^a-z0-9\s-]/gi, '')).toUpperCase()
	return TITLE_LIST.find((t) => transliterate(t).toUpperCase() === title)
}

export { transliterate, slugify, TRANS, capitalise, shortify }
