# Changelog

All notable changes to this project will be documented in this file, per the [Keep a Changelog standard](http://keepachangelog.com/), and will adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - TBD

## [0.2.0] - 2023-08-30

### Added

- New command, `checkSitemap`, which verifies the sitemap exists (props [@jayedul](https://github.com/jayedul), [@jeffpaul](https://github.com/jeffpaul), [@ravinderk](https://github.com/ravinderk) via [#97](https://github.com/10up/cypress-wp-utils/pull/97)).
- New command, `getBlockEditor`, which returns the proper editor element (props [@dkotter](https://github.com/dkotter), [@iamdharmesh](https://github.com/iamdharmesh) via [#105](https://github.com/10up/cypress-wp-utils/pull/105)).

### Changed

- Update target branch from `develop` to `trunk` for a few workflows (props [@cadic](https://github.com/cadic), [@iamdharmesh](https://github.com/iamdharmesh) via [#90](https://github.com/10up/cypress-wp-utils/pull/90)).
- Update the versions of WordPress we test on to include 6.3 (props [@dkotter](https://github.com/dkotter), [@iamdharmesh](https://github.com/iamdharmesh) via [#105](https://github.com/10up/cypress-wp-utils/pull/105)).
- Bump Cypress version from `10.11.0` to `13.0.0` (props [@iamdharmesh](https://github.com/iamdharmesh), [@dkotter](https://github.com/dkotter) via [#110](https://github.com/10up/cypress-wp-utils/pull/110)).

### Fixed

- Ensure passing an empty title or content string to `createPost` doesn't cause an error (props [@darylldoyle](https://github.com/darylldoyle), [@faisal-alvi](https://github.com/faisal-alvi) via [#95](https://github.com/10up/cypress-wp-utils/pull/95)).
- Issue with `checkPostExists` failing when there are no posts within a post type (props [@darylldoyle](https://github.com/darylldoyle), [@peterwilsoncc](https://github.com/peterwilsoncc) via [#100](https://github.com/10up/cypress-wp-utils/pull/100)).
- Ensure all E2E tests pass when running on WordPress 6.3 (props [@dkotter](https://github.com/dkotter), [@iamdharmesh](https://github.com/iamdharmesh), [@TylerB24890](https://github.com/TylerB24890) via [#105](https://github.com/10up/cypress-wp-utils/pull/105)).

### Security

- Bump `yaml` from 1.10.2 to 2.2.2 and `lint-staged` from 10.5.4 to 13.2.1 (props [@dependabot[bot]](https://github.com/apps/dependabot) via [#93](https://github.com/10up/cypress-wp-utils/pull/93)).
- Bump `tough-cookie` from 2.5.0 to 4.1.3 and `@cypress/request` from 2.88.10 to 2.88.12 (props [@dependabot[bot]](https://github.com/apps/dependabot) via [#106](https://github.com/10up/cypress-wp-utils/pull/106)).
- Bump `word-wrap` from 1.2.3 to 1.2.5 (props [@dependabot[bot]](https://github.com/apps/dependabot) via [#107](https://github.com/10up/cypress-wp-utils/pull/107)).

## [0.1.0] - 2023-03-08
- Initial release.

[Unreleased]: https://github.com/10up/cypress-wp-utils/compare/trunk...develop
[0.2.0]: https://github.com/10up/cypress-wp-util/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/10up/cypress-wp-util/tree/0.1.0
