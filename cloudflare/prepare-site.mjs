import { rm } from 'node:fs/promises'

await rm(new URL('../build/_redirects', import.meta.url), { force: true })

