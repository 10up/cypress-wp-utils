#!/bin/bash

VERSIONS="5.2 5.3 5.4 5.5 5.6 5.7 5.8 latest master"

SPEC=""

while getopts s: flag
do
    case "${flag}" in
        s) SPEC="-- --spec $OPTARG";;
    esac
done

for VERSION in $VERSIONS; do
	echo "**********************************************"
	echo $VERSION
	echo "**********************************************"
	./tests/bin/set-core-version.js $VERSION
	npm run env:start
	npm run env run tests-cli "core update-db"
	npm run env clean
	npm run cypress:run $SPEC
	npm run env:stop
done