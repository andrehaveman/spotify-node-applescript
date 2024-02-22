# 1.1.2 (2024-02-22)

- Removed undocumented 'open' method, because it was vulnerable to arbitrary command injection

This method was vulnerable to arbitrary command injection

# 1.1.1 (2018-01-16)

- Fixed volume overflow issue.

# 1.1.0 (2017-05-03)

- Added artwork_url to track data.

# 1.0.0 (2016-05-11)

## Breaking changes

- Removed getArtwork(). The getArtWork() method wasn't working properly anymore with the latest releases of the Spotify client, so it is removed from this library. Spotify encourages to retrieve artwork from their Web API endpoints: https://developer.spotify.com/web-api/get-track/.

## Features

- Added playInContext() method which allows playing a track in context of an album which also makes next() and previous() work properly.
- Added methods for repeat and shuffle: isRepeating(), isShuffling(), setRepeating(), setShuffling(), toggleRepeating() and toggleShuffling()