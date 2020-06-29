# @superblocks-at/supertools

> Airtable dev tools - an npm package that can be added to any block and includes the following tools:

1. A [GlobalConfig](https://airtable.com/developers/blocks/api/models/GlobalConfig) editor - this package allows you to view AND edit global config in development mode AND in release mode.

2. An api [models](https://airtable.com/developers/blocks/api/models/Base) explorer - with support for viewing the property values of the following models, exactly as you get them from the api:

- Base
- Active table
- Active view
- Selected record
- Selected field
- Cursor
- Session
- Viewport

## Installation

In your custom block folder:

```bash
npm install @superblocks-at/supertools --save
```

## Usage

```jsx
import React from "react";
import { initializeBlock } from "@airtable/blocks/ui";

import Supertools from "@superblocks-at/supertools";

function BlockWithSupertools {
	// Wrap supertools around your block code or put it wherever you want in your main component.
	// It will just work.
	return <Supertools>
		<MyBlock/>
	</Supertools>;

	// Another way of using supertools
	// return <>
		// <Supertools/>
		// <MyBlock/>
	// </>;
}

initializeBlock(() => <BlockWithSupertools />);
```

To open and close supertools, press 'ddd' quick 3 times.

## Supertools options / props

```jsx
import Supertools, {Position} from "@superblocks-at/supertools";


<Supertools
  shortcutKey="d",
  timeout={500},
  position ={Position.bottom},
  overlap={100}
/>
```

| Prop name   | Description                                                                       | Default value   |
| ----------- | --------------------------------------------------------------------------------- | --------------- |
| shortcutKey | The key to press 3 times to open/close supertools                                 | "d"             |
| timeout     | The max period between keystrokes in milliseconds before keystroke count is reset | 500             |
| position    | Where to display supertools: bottom, left, top or right                           | Position.bottom |
| overlap     | How much of the block width or height supertools overlaps                         | 100 (percent)   |

## LICENSE

MIT

## Contributions

Are more than welcome. The goal is to have the community expand the package with additional tools that can increase the productivity of Airtable custom blocks developers. Some ideas that come to mind:

- Add Links to relevant blocks api documentation section wherever appropriate
- Add the ability to execute api functions which also shows correct usage through pre-populated code snippets.

### Development environment setup instructions for contributors

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
