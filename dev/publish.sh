#!/bin/sh

set -eu

npm install
npm run build

cd dist/ngx-endpoint
cp ../../LICENSE .
cp ../../README.md .
cp ../../CHANGELOG.md .

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
npm publish --tag=${NPM_DIST_TAG}
npm pack -s

mv ngx-endpoint-*.tgz ../../

