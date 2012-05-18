spotify-node-applescript
========================

Control Spotify on Mac OSX with NodeJS and AppleScript.

API
===

playTrack(uri, callback)
------------------------
Open track with Spotify URI `uri`.

getTrack(callback)
------------------
Get the current track. `callback` is called with the current track as second argument.

getStatus(callback)
-------------------
Get player status.

play(callback)
--------------
Resume playing current track.

pause(callback)
---------------
Pause playing track.

playPause(callbacl)
-------------------
Toggle play.

next(callback)
--------------
Play next track.

previous(callback)
------------------
Play previous track.

volumeUp(callback)
------------------
Turn volume up.

volumeDown(callback)
--------------------
Turn volume down.
