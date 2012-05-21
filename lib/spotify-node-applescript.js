var exec = require('child_process').exec,
    applescript = require('applescript');

// apple scripts
var scripts = {
    track : [
        'tell application "Spotify"',
        'set ctrack to "{"',
        'set ctrack to ctrack & "\\"artist\\": \\"" & current track\'s artist & "\\""',
        'set ctrack to ctrack & ",\\"album\\": \\"" & current track\'s album & "\\""',
        'set ctrack to ctrack & ",\\"disc_number\\": " & current track\'s disc number',
        'set ctrack to ctrack & ",\\"duration\\": " & current track\'s duration',
        'set ctrack to ctrack & ",\\"played_count\\": " & current track\'s played count',
        'set ctrack to ctrack & ",\\"track_number\\": " & current track\'s track number',
        'set ctrack to ctrack & ",\\"starred\\": " & current track\'s starred',
        'set ctrack to ctrack & ",\\"popularity\\": " & current track\'s popularity',
        'set ctrack to ctrack & ",\\"id\\": \\"" & current track\'s id & "\\""',
        'set ctrack to ctrack & ",\\"name\\": \\"" & current track\'s name & "\\""',
        'set ctrack to ctrack & ",\\"album_artist\\": \\"" & current track\'s album artist & "\\""',
        'set ctrack to ctrack & ",\\"spotify_url\\": \\"" & current track\'s spotify url & "\\""',
        'set ctrack to ctrack & "}"',
        'return ctrack',
        'end tell'
    ],
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
        'tell application "Spotify" to activate',
        'tell application "System Events"',
        'keystroke (ASCII character 30) using {command down}',
        'end tell'
    ],
    volumeDown : [
        'tell application "Spotify" to activate',
        'tell application "System Events"',
        'keystroke (ASCII character 31) using {command down}',
        'end tell'
    ],
    play : [
        'tell application "Spotify"',
        'play',
        'end tell'
    ],
    playTrack : [
        'tell application "Spotify"',
        'play track "{{track}}"',
        'end tell'
    ],
    playPause : [
        'tell application "Spotify"',
        'playpause',
        'end tell'
    ],
    pause : [
        'tell application "Spotify"',
        'pause',
        'end tell'
    ],
    next : [
        'tell application "Spotify"',
        'next track',
        'end tell'
    ],
    previous : [
        'tell application "Spotify"',
        'previous track',
        'end tell'
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

exports.getTrack = function(callback){
    return execScript('track', createJSONResponseHandler(callback));
};

exports.getState = function(callback){
    return execScript('state', createJSONResponseHandler(callback));
};
