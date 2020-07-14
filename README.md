# The @superblocks-at/devtools dev env repository

This repo is a "monorepo" composed of the following packages as git submodules:

- [lib](packages/lib) - the @superblocks-at/devtools npm package
- [block](packages/block) - the api explorer block
- [url](packages/url) - Airtable's open source URL preview block, with devtools included.

The devtools npm package was created using [create-react-library](https://www.npmjs.com/package/create-react-library), which uses [microbundle](https://www.npmjs.com/package/microbundle), which uses [rollup](https://www.npmjs.com/package/rollup) for bundling.

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
