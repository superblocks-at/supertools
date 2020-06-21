import { globalConfig } from '@airtable/blocks'
import { initializeBlock } from '@airtable/blocks/ui'
import React from 'react'
import { Supertools } from '@superblocks-at/supertools'

function BlockWithSupertools() {
  return (
    <>
      <Supertools />
    </>
  )
}

globalConfig
  .setAsync('config', 'myConfig')
  .then(() => initializeBlock(() => <BlockWithSupertools />))
