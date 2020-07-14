#!/bin/bash -xe

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
REPO_HOME="$(dirname $SCRIPT_DIR)"

rm -rf $REPO_HOME/packages/lib/node_modules
rm -rf $REPO_HOME/packages/$1/node_modules
cd $REPO_HOME/packages/$1 && npm remove @superblocks-at/devtools --save
cd $REPO_HOME/packages/lib && npm remove @airtable/blocks --save-dev
cd $REPO_HOME/packages/lib && npm remove react --save-dev
cd $REPO_HOME/packages/lib && npm remove react-dom --save-dev
cd $REPO_HOME/packages/$1 && npm i
cd $REPO_HOME/packages/lib && npm i
cd $REPO_HOME/packages/lib && npm i ../$1/node_modules/react --save-dev
cd $REPO_HOME/packages/lib && npm i ../$1/node_modules/react-dom --save-dev
cd $REPO_HOME/packages/lib && npm i ../$1/node_modules/@airtable/blocks --save-dev
cd $REPO_HOME/packages/$1 && npm i --save ../lib
cd $REPO_HOME/packages/lib && npm run build
cd $REPO_HOME/packages/$1 && npx block run
