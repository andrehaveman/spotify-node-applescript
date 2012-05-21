# spotify-node-applescript
Control Spotify on Mac OSX with NodeJS and AppleScript.

## Installation

	npm install spotify-node-applescript

## API

### playTrack(uri, callback)

Open track with Spotify URI `uri`.

	var spotify = require('spotify-node-applescript');
	
	spotify.playTrack('spotify:track:3AhXZa8sUQht0UEdBJgpGc', function(){
		// track is playing
	});

### getTrack(callback)

Get the current track. `callback` is called with the current track as second argument.

	var spotify = require('spotify-node-applescript');
	
	spotify.getTrack(function(err, track){
		
		/*
		track = {
			artist: 'Bob Dylan',
			album: 'Highway 61 Revisited',
			disc_number: 1,
			duration: 370,
			played count: 0,
			track_number: 1,
			starred: false,
			popularity: 71,
			id: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc',
			name: 'Like A Rolling Stone',
			album_artist: 'Bob Dylan',
			spotify_url: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc' }
		}
		*/
		
	});

### getStatus(callback)

Get player status.

	var spotify = require('spotify-node-applescript');
	
	spotify.getState(function(err, state){
		/*
		state = {
			volume: 99,
			position: '232.639999389648',
			state: 'playing'
		}
		*/
	});

### play(callback)

Resume playing current track.

### pause(callback)

Pause playing track.

### playPause(callbacl)

Toggle play.

### next(callback)

Play next track.

### previous(callback)

Play previous track.

### volumeUp(callback)

Turn volume up.

### volumeDown(callback)

Turn volume down.
