# @empyria/name

Name and title manipulation utilities for **Empyria**, a nanoservice framework built
primarily on Bun.

Provides a curated list of honorifics/titles (`TITLE_LIST`/`TITLES`) spanning common,
formal, academic, and religious usage, plus `findTitle` to resolve free-text input
(any case, punctuation, or transliterable script) to its canonical form. The generic
string helpers `TRANS`, `capitalise`, and `shortify`, and `transliterate`/`slugify`
from the [`transliteration`](https://www.npmjs.com/package/transliteration) package,
are re-exported here for convenience since name/title handling relies on them heavily.

## Requirements

- Bun `>=1.4.0` or Node.js `>=26`
- Plain ESM, no build step, no TypeScript

## Install

```bash
bun add @empyria/name
```

## Usage

```js
import { findTitle, TITLES, capitalise, slugify } from '@empyria/name'

findTitle('dr.') // 'Dr'
findTitle('Vice-Chancellor') // 'Vice-Chancellor'
findTitle('Wizard') // undefined — not a recognised title

TITLES.DR // 'Dr'

capitalise('jean') // 'Jean'
slugify('Jean Pierre') // 'jean-pierre'
```

## Modules

| Module                       | Purpose                                                                                                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.js](./index.js)       | Package entry point; re-exports [lib/Name.js](./lib/Name.js).                                                                                                                                             |
| [lib/Name.js](./lib/Name.js) | `TITLE_LIST`/`TITLES` (the full title catalog), `findTitle`, plus `TRANS`/`capitalise`/`shortify`/`transliterate`/`slugify` re-exported from `@empyria/classification`/`transliteration` for convenience. |

Tests live under [test/](./test/), one file per module, separate from the `lib/` sources.

## Scripts

```bash
bun run format       # check formatting (oxfmt)
bun run format:fix   # apply formatting
bun run lint         # lint (oxlint)
bun run lint:fix     # lint and fix
bun run test         # run tests with coverage
```

## License

MIT © Imre Fazekas
