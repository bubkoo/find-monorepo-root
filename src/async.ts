import path from 'path'
import fse from 'fs-extra'
import { findUp } from 'find-up'
import { Lerna, Pkg, Ref, Result } from './types.js'
import { lernalize, yarnlize, pnpmlize, readJson, rollup } from './util.js'

async function findYarn(dir: string, ref: Ref) {
  const pkg = await readJson<Pkg>(dir, 'package.json')
  return yarnlize(dir, ref, pkg)
}

async function findLerna(dir: string) {
  const lerna = await readJson<Lerna>(dir, 'lerna.json')
  return lernalize(dir, lerna)
}

async function findPnpm(dir: string) {
  const exists = await fse.pathExists(path.join(dir, 'pnpm-workspace.yaml'))
  return pnpmlize(dir, exists)
}

export async function findMonorepoRoot(cwd: string): Promise<Result> {
  const ref: Ref = { cwd }
  let ret: Result | undefined

  await findUp(
    async (parent) => {
      ret =
        (await findLerna(parent)) ||
        (await findYarn(parent, ref)) ||
        (await findPnpm(parent))
      return ret && ret.dir
    },
    { cwd, type: 'directory' },
  )

  return rollup(ret, ref)
}
