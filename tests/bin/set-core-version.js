#!/usr/bin/env node

const fs = require( 'fs' );

const path = `${ process.cwd() }/.wp-env.override.json`;

let config = fs.existsSync( path ) ? require( path ) : {};

const args = process.argv.slice( 2 );

if ( args.length == 0 ) return;

if ( args[ 0 ] == 'latest' ) {
	if ( fs.existsSync( path ) ) {
		fs.unlinkSync( path );
	}
	return;
}

config.core = args[ 0 ];

if ( ! config.core.match( /^WordPress\/WordPress\#/ ) ) {
	config.core = "WordPress\/WordPress\#" + config.core;
}

try {
	fs.writeFileSync( path, JSON.stringify( config ) );
} catch ( err ) {
	console.error( err );
}
