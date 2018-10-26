#!/bin/sh

set -eu

npm ci
npm run build

cd dist/ngx-endpoint
cp ../../LICENSE .
cp ../../README.md .
cp ../../CHANGELOG.md .

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
npm publish
npm pack -s

mv ngx-endpoint-*.tgz ../../

