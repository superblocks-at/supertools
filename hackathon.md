## Inspiration

A _Dev Tools_ block and an npm package that can be added to any custom block and that improves the productivity of custom block developers by:

1. Saving valuable time spent on watching api models using debugging and logging techniques - the block watches **all** the property values of all the models in the blocks api.

2. Providing a [GlobalConfig](https://airtable.com/developers/blocks/api/models/GlobalConfig) editor - so that a block developer can view **and** edit the global config in development mode **and** in release mode. For me, it was extremely useful and time saving to be able to:

- Clear / remove only specific keys from globalConfig and not all of them.

- Have access to globalConfig in release mode too

## What it does

1. An [API explorer block](https://airtable.com/developers/blocks/api/models/Base) - with support for viewing the property values of the following models, exactly as you get them from the api:

- Base
- Active table
- Active view
- Selected record
- Selected field
- Cursor
- Session
- Viewport

2. An [npm package](https://www.npmjs.com/package/@superblocks-at/supertools) that can be added to any custom block and that in addition to the above provides a [GlobalConfig](https://airtable.com/developers/blocks/api/models/GlobalConfig) editor - so you can view **and** edit the block's global config in development mode **and** in release mode.

## How I built it

1. The npm package was created using [create-react-library](https://www.npmjs.com/package/create-react-library), which uses [microbundle](https://www.npmjs.com/package/microbundle), which uses [rollup](https://www.npmjs.com/package/rollup) for bundling.

2. The json editor / viewer is based on the [jsoneditor](https://www.npmjs.com/package/jsoneditor) npm package. I modified the source code of the [jsoneditor-react](https://www.npmjs.com/package/jsoneditor-react) npm package to fit my needs.

## Challenges I ran into

The biggest challenge was to setup a development environment that automatically loads a block that uses the library whenever the library source code changes and that takes into account that react and react-dom can only exist once and have to be peerDependencies in the library. I accomplished that by:

1. Linking to the block's installation of react and react-dom from the library's devDependencies using [npm install's folder target](https://docs.npmjs.com/cli/install). See the [package.json](https://github.com/superblocks-at/supertools/blob/master/packages/lib/package.json) of the library.

2. Creating a grunt watch task that touches the block's index.js whenever microbundle rebundles the library.

## Accomplishments that I'm proud of

1. The creation of a blocks library development environment that automatically loads the block when the library changes. This can:

- Provide guidance to the custom blocks developer community on how to setup similar development environments for their own libraries

- Help grow the selection of published open source 3rd party libraries for block developers.

2. The fact I created a block and npm package that can benefit the entire custom blocks developer community.

## What I learned

1. How to bundle libraries for use in custom blocks.

2. How to create a blocks library development environment that automatically loads the block when the library changes.

## What's next for the API explorer block and the npm package

- Add Links to the relevant blocks api documentation section wherever appropriate.

- Add the ability to execute api functions which also shows correct usage through pre-populated code snippets.

- Whatever else that can improve the productivity of custom blocks developers.
