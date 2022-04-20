#!/bin/bash

VERSIONS="5.2 5.3 5.4 5.5 5.6 5.7 5.8 latest master"

SPEC="-- --quiet"

while getopts s: flag
do
    case "${flag}" in
        s) SPEC="-- --quiet --spec $OPTARG";;
    esac
done

for VERSION in $VERSIONS; do
	echo "**********************************************"
	echo $VERSION
	echo "**********************************************"
	./tests/bin/set-core-version.js $VERSION
	npm run env:start > /dev/null
	npm run env run tests-cli "core update-db" > /dev/null
	npm run env clean > /dev/null
	npm run cypress:run $SPEC
	npm run env:stop > /dev/null
done
