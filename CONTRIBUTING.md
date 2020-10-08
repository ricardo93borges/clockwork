# Contributing to Clockwork


1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch `git checkout -b branch_name`
3. Install the dependencies: `npm i`
4. Run `npm start` to build and watch for code changes
5. The development branch is `develop` (this is the branch pull requests should be made against). 
6. On a release, is created a branch `release/vx.x.x` out of branch `develop` and merged into master.

## Semantic Versioning

This project follows [semantic versioning](https://semver.org/). We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes.