#!/bin/bash

MAJOR_VERSIONS="5.7 5.8 5.9 6.0 6.1 6.2 6.3 6.4 6.5 6.6 6.7 6.8 6.9 7.0"
TRUNK="trunk"
TRUNK_UPDATE_VERSION="nightly"

VERSIONS="$MAJOR_VERSIONS $TRUNK"
FIRST_VERSION=$(echo "$MAJOR_VERSIONS" | cut -d " " -f 1)

echo "Running tests for the following core versions: $VERSIONS"
echo "Starting once at core version: $FIRST_VERSION"

SPEC="-- --quiet"

while getopts s: flag
do
    case "${flag}" in
        s) SPEC="-- --quiet --spec $OPTARG";;
    esac
done

cleanup() {
	npm run env:stop > /dev/null || true
}

trap cleanup EXIT

run_cypress_for_version() {
	EXPECTED_VERSION="$1"
	ACTUAL_VERSION=$(npm run env run tests-cli -- wp core version | grep -E '^[0-9]+(\.[0-9]+)*([.-][A-Za-z0-9]+)*$' | tail -n 1 | tr -d '\r')
	echo "**********************************************"
	echo "Expected version number: $EXPECTED_VERSION"
	echo "Detected version number: $ACTUAL_VERSION"
	echo "**********************************************"
	if [[ -z "$ACTUAL_VERSION" ]]; then
		echo "Unable to determine installed WordPress version."
		return 1
	fi
	if [[ "$EXPECTED_VERSION" != "$TRUNK" && ! "$ACTUAL_VERSION" =~ ^${EXPECTED_VERSION//./\.}(\.[0-9]+)*$ ]]; then
		echo "WordPress version mismatch: expected $EXPECTED_VERSION or a patch release based on it, detected $ACTUAL_VERSION"
		return 1
	fi
	npm run env run tests-cli -- wp theme activate twentytwentyone > /dev/null || true
	npm run env run tests-cli -- wp core update-db > /dev/null || true
	npm run env clean > /dev/null
	CYPRESS_WORDPRESS_CORE="$EXPECTED_VERSION" npm run cypress:run $SPEC
}

./tests/bin/set-core-version.js "$FIRST_VERSION-branch"
if ! npm run env:start > /dev/null; then
	echo "Initial wp-env start failed; retrying once."
	npm run env:start > /dev/null
fi
run_cypress_for_version "$FIRST_VERSION"

for MAJOR_VERSION in $MAJOR_VERSIONS; do
	if [[ "$MAJOR_VERSION" == "$FIRST_VERSION" ]]; then
		continue
	fi

	echo "Updating WordPress core to $MAJOR_VERSION"
	npm run env run tests-cli -- wp core update -- --version=$MAJOR_VERSION --force > /dev/null
	npm run env run tests-cli -- wp core update --minor > /dev/null
	run_cypress_for_version "$MAJOR_VERSION"
done

echo "Updating WordPress core to trunk ($TRUNK_UPDATE_VERSION)"
npm run env run tests-cli -- wp core update -- --version=$TRUNK_UPDATE_VERSION --force > /dev/null
run_cypress_for_version "$TRUNK"
