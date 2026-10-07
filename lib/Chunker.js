// Re-exported from @empyria/classification, which owns the canonical implementation (this
// package already depends on it) — kept here as its own module so `chunkDocument` stays
// importable from this package too, without maintaining a second copy that can drift.
export { chunkDocument } from '@empyria/classification'
