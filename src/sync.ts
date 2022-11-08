import path from 'path'
import fse from 'fs-extra'
import { findUpSync } from 'find-up'
import { Lerna, Pkg, Ref, Result } from './types.js'
import { lernalize, yarnlize, pnpmlize, readJsonSync, rollup } from './util.js'

function findYarn(dir: string, ref: Ref) {
  const pkg = readJsonSync<Pkg>(dir, 'package.json')
  return yarnlize(dir, ref, pkg)
}

function findLerna(dir: string) {
  const lerna = readJsonSync<Lerna>(dir, 'lerna.json')
  return lernalize(dir, lerna)
}

function findPnpm(dir: string) {
  const exists = fse.pathExistsSync(path.join(dir, 'pnpm-workspace.yaml'))
  return pnpmlize(dir, exists)
}

export function findMonorepoRootSync(cwd: string): Result {
  const ref: Ref = { cwd }
  let ret: Result | undefined

  findUpSync(
    (parent) => {
      ret = findLerna(parent) || findYarn(parent, ref) || findPnpm(parent)
      return ret && ret.dir
    },
    { cwd, type: 'directory' },
  )

  return rollup(ret, ref)
}

export default findMonorepoRootSync
