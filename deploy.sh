#!usr/bin/env sh

set -e

npm run build
cd dist

git init
git add -A
git commit -m "New Deployment"
git push -f https://github.com/luis-reyes/arithmetic-calculator-fe.git main:gh-pages

cd -