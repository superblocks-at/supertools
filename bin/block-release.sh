#!/bin/bash -xe

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
REPO_HOME="$(dirname $SCRIPT_DIR)"

cd $REPO_HOME/packages/lib && npm version patch
cd $REPO_HOME/packages/lib && npm publish
cd $REPO_HOME/packages/block && npm remove @superblocks-at/devtools
cd $REPO_HOME/packages/block && npm i --save @superblocks-at/devtools
cd $REPO_HOME/packages/block && block release
# cd $REPO_HOME/packages/block && block release --remote airtable
