#!/bin/bash -xe

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
REPO_HOME="$(dirname $SCRIPT_DIR)"

rm -rf $REPO_HOME/packages/lib/node_modules
rm -rf $REPO_HOME/packages/block/node_modules
cd $REPO_HOME/packages/block && npm remove @superblocks-at/supertools
cd $REPO_HOME/packages/block && npm i
cd $REPO_HOME/packages/lib && npm i
cd $REPO_HOME/packages/block && npm i --save ../lib
