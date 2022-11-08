import os from 'os'
import path from 'path'
import { findMonorepoRoot } from '../../src/index.js'
import { findMonorepoRootSync } from '../../src/sync.js'

const cwd = path.join(process.cwd(), 'test/workspaces')
const packages = ['package-a', 'package-b', 'package-c']
const clients = ['pnpm', 'yarn', 'bolt', 'lerna', 'root']

describe('async', () => {
  clients.forEach((client) => {
    it(`should find ${client} root`, async () => {
      const root = path.join(cwd, client)
      // eslint-disable-next-line no-restricted-syntax
      for (const pkg of packages) {
        // eslint-disable-next-line no-await-in-loop
        const result = await findMonorepoRoot(path.join(root, 'packages', pkg))
        expect(result.client).toBe(client)
        expect(result.dir).toBe(root)
      }
    })
  })

  it('should throw error when package.json is broken', async () => {
    const find = async () => {
      await findMonorepoRoot(path.join(cwd, 'bad'))
    }
    await expect(find).rejects.toThrow
  })
})

describe('sync', () => {
  clients.forEach((client) => {
    it(`should find ${client} root`, () => {
      const root = path.join(cwd, client)
      packages.forEach((pkg) => {
        const result = findMonorepoRootSync(path.join(root, 'packages', pkg))
        expect(result.client).toBe(client)
        expect(result.dir).toBe(root)
      })
    })
  })

  it('should throw error when no monorepo found', () => {
    const find = () => {
      findMonorepoRootSync(os.homedir())
    }
    expect(find).toThrowError()
  })

  it('should throw error when package.json is broken', () => {
    const find = () => {
      findMonorepoRootSync(path.join(cwd, 'bad'))
    }
    expect(find).toThrowError()
  })
})
