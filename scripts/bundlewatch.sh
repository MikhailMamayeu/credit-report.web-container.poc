#!/bin/bash

BUNDLEWATH_RESULT="$(npx bundlewatch --config bundlewatch.config.json | awk '/^Result breakdown at:/ { print $4 }')"

echo $'\n'$BUNDLEWATH_RESULT >> README.md;

git add README.md
