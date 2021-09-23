# spotify-node-applescript

Control Spotify on Mac OSX with NodeJS and AppleScript.

## Installation

```
$ npm install spotify-node-applescript
```

## Running unit tests

```
$ npm test
```

## API

### playTrack(uri, callback)

Play a track with Spotify URI `uri`.

```javascript
var spotify = require("spotify-node-applescript");

spotify.playTrack("spotify:track:3AhXZa8sUQht0UEdBJgpGc", function () {
  // track is playing
});
```

### playTrackInContext(uri, contextUri, callback)

Play a track in context of for example an album.

```javascript
var spotify = require("spotify-node-applescript");

spotify.playTrackInContext(
  "spotify:track:0R8P9KfGJCDULmlEoBagcO",
  "spotify:album:6ZG5lRT77aJ3btmArcykra",
  function () {
    // Track is playing in context of an album
  }
);
```

### getTrack(callback)

Get the current track. `callback` is called with the current track as second argument.

```javascript
var spotify = require("spotify-node-applescript");

spotify.getTrack(function (err, track) {
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
        artwork_url: 'http://images.spotify.com/image/e3d720410b4a0770c1fc84bc8eb0f0b76758a358',
        spotify_url: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc' }
    }
    */
});
```

### getState(callback)

Get player state.

```javascript
var spotify = require("spotify-node-applescript");

spotify.getState(function (err, state) {
  /*
    state = {
        volume: 99,
        position: 232,
        state: 'playing'
    }
    */
});
```

### jumpTo(second, callback)

Jump to a specific second of the current song.

```javascript
var spotify = require("spotify-node-applescript");

spotify.jumpTo(15, function () {
  console.log("Jumped 15th second of the song");
});
```

### seekForward(second, callback)

Seek forward for the given seconds in the current song.

```javascript
var spotify = require("spotify-node-applescript");

spotify.seekForward(5, function () {
  console.log("Seeked forward for 5 seconds in the current song");
});
```

### seekBackward(second, callback)

Seek backward for the given seconds in the current song.

```javascript
var spotify = require("spotify-node-applescript");

spotify.seekBackward(5, function () {
  console.log("Seeked backward for 5 seconds in the current song");
});
```

### play(callback)

Resume playing current track.

### pause(callback)

Pause playing track.

### playPause(callback)

Toggle play.

### next(callback)

Play next track.

### previous(callback)

Play previous track.

### volumeUp(callback)

Turn volume up.

### volumeDown(callback)

Turn volume down.

### setVolume(volume, callback)

Sets the volume.

```javascript
var spotify = require("spotify-node-applescript");

spotify.setVolume(42, function () {
  spotify.getState(function (err, state) {
    console.log(state.volume);
  });
});
```

### muteVolume(callback)

Reduces audio to 0, saving the previous volume.

### unmuteVolume(callback)

Returns audio to original volume.

### isRunning(callback)

Check if Spotify is running.

```javascript
var spotify = require("spotify-node-applescript");

spotify.isRunning(function (err, isRunning) {
  console.log(isRunning); // true
});
```

### isRepeating(callback)

Is repeating on or off?

```js
var spotify = require("spotify-node-applescript");

spotify.isRepeating(function (err, shuffling) {
  console.log(shuffling); // true || false
});
```

### isShuffling(callback)

Is shuffling on or off?

```js
var spotify = require("spotify-node-applescript");

spotify.isShuffling(function (err, shuffling) {
  console.log(shuffling); // true || false
});
```

### setRepeating(repeating/\*_boolean_\*/, callback)

Sets repeating on or off

### setShuffling(shuffling/\*_boolean_\*/, callback)

Sets shuffling on or off

### toggleRepeating(callback)

Toggles repeating

### toggleShuffling(callback)

Toggles shuffling

## Contributors

- [Robin Mehner](https://github.com/rmehner)
- [Thorsten Ball](https://github.com/mrnugget)
- [Paul Marbach](https://github.com/fastfrwrd)
- [dyong1](https://github.com/dyong1)

## License

[MIT](LICENSE)
