#!/bin/bash

VERSIONS="5.7 5.8 5.9 6.0 6.1 master:6.2"

SPEC="-- --quiet"

while getopts s: flag
do
    case "${flag}" in
        s) SPEC="-- --quiet --spec $OPTARG";;
    esac
done

for VERSION in $VERSIONS; do
	CORE=$(echo $VERSION|cut -d ":" -f 1)
	NUMBER=$(echo $VERSION|cut -d ":" -f 2)
	[[ -z "$NUMBER" ]] && NUMBER="$CORE"
	echo "**********************************************"
	echo "Core: $CORE, Version number: $NUMBER"
	echo "**********************************************"
	./tests/bin/set-core-version.js $CORE
	npm run env:start > /dev/null
	npm run env run tests-cli "core update-db" > /dev/null
	npm run env clean > /dev/null
	CYPRESS_WORDPRESS_CORE="$NUMBER" npm run cypress:run $SPEC
	npm run env:stop > /dev/null
done
