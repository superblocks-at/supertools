# @superblocks-at/supertools

> Airtable global config editor and api models explorer

[![NPM](https://img.shields.io/npm/v/supertools.svg)](https://www.npmjs.com/package/@superblocks-at/supertools)

## Dev env setup

Library was created using [create-react-library](https://www.npmjs.com/package/create-react-library), which uses [microbundle](https://www.npmjs.com/package/microbundle), which uses [rollup](https://www.npmjs.com/package/rollup) for bundling.

1. Init dev env

```bash
npm install
bin/block-dev.sh
```

2. Run watching library bundler

```bash
cd packages/lib && npm start
```

3. Run block

```bash
cd packages/block && block run
```

4. Run watcher that touches block index.js whenever library changes so block reloads

```bash
grunt
```
