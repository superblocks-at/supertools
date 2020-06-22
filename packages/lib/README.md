# supertools

> Airtable supertools

[![NPM](https://img.shields.io/npm/v/supertools.svg)](https://www.npmjs.com/package/@superblocks-at/supertools) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @superblocks-at/supertools
```

## Usage

```tsx
import React from "react";
import { initializeBlock } from "@airtable/blocks/ui";

import Supertools from "@superblocks-at/supertools";

export default function BlockWithSupertools {
    // Wrap supertools around your block code or put it wherever you want. It will just work.
    return <Supertools>
      <MyBlock/>
    </Supertools>;
}

initializeBlock(() => <BlockWithSupertools />);
```
