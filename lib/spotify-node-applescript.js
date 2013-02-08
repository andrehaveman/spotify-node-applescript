var exec = require('child_process').exec,
    applescript = require('applescript');

// apple scripts
var scripts = {
    state: [
        'tell application "Spotify"',
        'set cstate to "{"',
        'set cstate to cstate & "\\"volume\\": " & sound volume',
        'set cstate to cstate & ",\\"position\\": \\"" & player position & "\\""',
        'set cstate to cstate & ",\\"state\\": \\"" & player state & "\\""',
        'set cstate to cstate & "}"',
        'return cstate',
        'end tell'
    ],
    volumeUp : [
        'tell application "Spotify" to set sound volume to (sound volume + 10)'
    ],
    volumeDown : [
        'tell application "Spotify" to set sound volume to (sound volume - 10)'
    ],
    setVolume : [
        'tell application "Spotify" to set sound volume to {{volume}}'
    ],
    play : [
        'tell application "Spotify" to play'
    ],
    playTrack : [
        'tell application "Spotify" to play track "{{track}}"'
    ],
    playPause : [
        'tell application "Spotify" to playpause'
    ],
    pause : [
        'tell application "Spotify" to pause'
    ],
    next : [
        'tell application "Spotify" to next track'
    ],
    previous : [
        'tell application "Spotify" to previous track'
    ],
    jumpTo : [
        'tell application "Spotify" to set player position to {{position}}'
    ]
};

var execScript = function(script, callback, transformer){
    if (!callback) return null;
    script = scripts[script].join('\n');
    if (transformer) script = transformer(script);
    applescript.execString(script, callback);
};

var createJSONResponseHandler = function(callback){
    if (!callback) return null;
    return function(error, result){
        if (!error){
            try {
                result = JSON.parse(result);
            } catch(e){
                return callback(e);
            }
            return callback(null, result);
        } else {
            return callback(error);
        }
    };
};

exports.open = function(uri, callback){
    return exec('open "'+uri+'"', callback);
};

exports.play = function(callback){
    execScript('play', callback);
};

exports.playTrack = function(track, callback){
    execScript('playTrack', callback, function(script){
        return script.replace('{{track}}', track);
    });
};

exports.pause = function(callback){
    return execScript('pause', callback);
};

exports.playPause = function(callback){
    return execScript('playPause', callback);
};

exports.next = function(callback){
    return execScript('next', callback);
};

exports.previous = function(callback){
    return execScript('previous', callback);
};

exports.volumeUp = function(callback){
    return execScript('volumeUp', callback);
};

exports.volumeDown = function(callback){
    return execScript('volumeDown', callback);
};

exports.setVolume = function(volume, callback){
    execScript('setVolume', callback, function(script){
        return script.replace('{{volume}}', volume);
    });
};

exports.getTrack = function(callback){
    return applescript.execFile(
        __dirname + '/scripts/get_track.applescript',
        createJSONResponseHandler(callback)
    );
};

exports.getState = function(callback){
    return execScript('state', createJSONResponseHandler(callback));
};

exports.jumpTo = function(position, callback){
    execScript('jumpTo', callback, function(script){
        return script.replace('{{position}}', position);
    });
};

exports.getArtwork = function(callback){
    return applescript.execFile(__dirname + '/scripts/get_artwork.applescript', callback);
};
