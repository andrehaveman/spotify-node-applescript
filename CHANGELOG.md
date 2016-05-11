# 1.0.0 (2016-05-11)

## Breaking changes

- Removed getArtwork(). The getArtWork() method wasn't working properly anymore with the latest releases of the Spotify client, so it is removed from this library. Spotify encourages to retrieve artwork from their Web API endpoints: https://developer.spotify.com/web-api/get-track/.

## Features

- Added playInContext() method which allows playing a track in context of an album which also makes next() and previous() work properly.
- Added methods for repeat and shuffle: isRepeating(), isShuffling(), setRepeating(), setShuffling(), toggleRepeating() and toggleShuffling()