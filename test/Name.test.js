import { describe, test, expect } from 'bun:test'
import {
	TITLE_LIST,
	TITLES,
	findTitle,
	TRANS,
	capitalise,
	shortify,
	transliterate,
	slugify,
} from '../lib/Name.js'

describe('TITLE_LIST', () => {
	test('has no duplicate entries', () => {
		expect(new Set(TITLE_LIST).size).toBe(TITLE_LIST.length)
	})
})

describe('TITLES', () => {
	test('enumises every title in TITLE_LIST', () => {
		expect(TITLES.DR).toBe('Dr')
		expect(TITLES.MR).toBe('Mr')
	})
})

describe('findTitle', () => {
	test('finds a plain title regardless of case', () => {
		expect(findTitle('dr')).toBe('Dr')
		expect(findTitle('DR')).toBe('Dr')
	})

	test('ignores surrounding punctuation', () => {
		expect(findTitle('Dr.')).toBe('Dr')
	})

	test('matches a multi-word title', () => {
		expect(findTitle('the right honourable')).toBe('The Right Honourable')
	})

	test('matches a hyphenated title', () => {
		expect(findTitle('Vice-Chancellor')).toBe('Vice-Chancellor')
		expect(findTitle('vice chancellor')).toBeUndefined()
	})

	test('returns undefined for an unknown title', () => {
		expect(findTitle('Wizard')).toBeUndefined()
	})

	test('returns undefined for falsy input', () => {
		expect(findTitle('')).toBeUndefined()
		expect(findTitle(null)).toBeUndefined()
	})
})

describe('re-exported string helpers (from @empyria/classification)', () => {
	test('TRANS transliterates, strips whitespace, and upper-cases', () => {
		expect(TRANS('hello world')).toBe('HELLOWORLD')
	})

	test('capitalise upper-cases only the first character', () => {
		expect(capitalise('hello')).toBe('Hello')
	})

	test('shortify truncates and appends an ellipsis when over the limit', () => {
		expect(shortify('hello world', 5)).toBe('hello...')
	})

	test('transliterate is re-exported from the transliteration package', () => {
		expect(typeof transliterate).toBe('function')
	})

	test('slugify is re-exported from the transliteration package', () => {
		expect(slugify('Jean Pierre')).toBe('jean-pierre')
	})
})
