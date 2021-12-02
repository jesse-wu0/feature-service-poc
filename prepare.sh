#!/bin/sh
# This is necessary so that husky install is only run if husky is present
if [ -d './node_modules/husky' ]; then
  npm run husky:install
fi
