<p align="center"><strong>find-monorepo-root</strong></p>
<p align="center">Find the root directory of a monorepo using Yarn workspaces, Bolt, Lerna or pnpm</p>

<p align="center">
<a href="/LICENSE"><img src="https://img.shields.io/github/license/bubkoo/
?style=flat-square" alt="MIT License"></a>
<a href="https://www.typescriptlang.org"><img alt="Language" src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square"></a>
<a href="https://github.com/bubkoo/find-monorepo-root/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square"></a>
</p>

<p align="center">
<a href="https://github.com/bubkoo/find-monorepo-root/actions/workflows/release.yml"><img alt="build" src="https://img.shields.io/github/workflow/status/bubkoo/find-monorepo-root/%F0%9F%9A%80%E3%80%80Release/master?logo=github&style=flat-square"></a>
<a href="https://app.codecov.io/gh/bubkoo/find-monorepo-root"><img alt="coverage" src="https://img.shields.io/codecov/c/gh/bubkoo/find-monorepo-root?logo=codecov&style=flat-square&token=15CO54WYUV"></a>
<a href="https://www.npmjs.com/package/find-monorepo-root"><img alt="NPM Package" src="https://img.shields.io/npm/v/find-monorepo-root.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/find-monorepo-root"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/find-monorepo-root?logo=npm&style=flat-square"></a>
</p>



## Install
```shell
$ npm install find-monorepo-root
```

## Usage

```ts
import { findMonorepoRoot } from 'find-monorepo-root';
const cwd = process.cwd();

console.log(await findMonorepoRoot(cwd));
// {
//   client: 'pnpm', // the monorepo client(pnpm, lerna, yarn, bolt)
//   dir: 'xxx',     // the monorepo root directory
// }


// sync method
import { findMonorepoRootSync } from 'find-monorepo-root/sync';
console.log(findMonorepoRootSync(cwd));
```


## Contributing

Please let us know how can we help. Do check out [issues](https://github.com/bubkoo/find-monorepo-root/issues) for bug reports or suggestions first.

To become a contributor, please follow our [contributing guide](/CONTRIBUTING.md).

<!-- <a href="https://github.com/bubkoo/find-monorepo-root/graphs/contributors">
  <img src="/CONTRIBUTORS.svg" alt="Contributors" width="740" />
</a> -->


## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
