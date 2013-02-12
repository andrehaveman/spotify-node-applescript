var exec = require('child_process').exec,
    applescript = require('applescript');

// Apple scripts
// ----------------------------------------------------------------------------

var scripts = {
    state: {
        file: '/scripts/get_state.applescript'
    },
    track: {
        file: '/scripts/get_track.applescript'
    },
    isRunning: {
        file: '/scripts/is_running.applescript'
    },
    volumeUp :
        'tell application "Spotify" to set sound volume to (sound volume + 10)',
    volumeDown :
        'tell application "Spotify" to set sound volume to (sound volume - 10)',
    setVolume :
        'tell application "Spotify" to set sound volume to {{volume}}',
    play :
        'tell application "Spotify" to play',
    playTrack :
        'tell application "Spotify" to play track "{{track}}"',
    playPause :
        'tell application "Spotify" to playpause',
    pause :
        'tell application "Spotify" to pause',
    next :
        'tell application "Spotify" to next track',
    previous :
        'tell application "Spotify" to previous track',
    jumpTo :
        'tell application "Spotify" to set player position to {{position}}'
};

// Apple script execution
// ----------------------------------------------------------------------------

var execScript = function(script, callback, transformer){
    if (!callback) return null;
    script = scripts[script];

    if (typeof script === 'string'){
        if (transformer) script = transformer(script);
        return applescript.execString(script, callback);
    } else if (script.file){
        return applescript.execFile(__dirname + script.file, callback);
    }
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

// API
// ----------------------------------------------------------------------------

// Open track

exports.open = function(uri, callback){
    return exec('open "'+uri+'"', callback);
};

exports.playTrack = function(track, callback){
    return execScript('playTrack', callback, function(script){
        return script.replace('{{track}}', track);
    });
};

// Playback control

exports.play = function(callback){
    return execScript('play', callback);
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

exports.jumpTo = function(position, callback){
    return execScript('jumpTo', callback, function(script){
        return script.replace('{{position}}', position);
    });
};

// Volume control

exports.volumeUp = function(callback){
    return execScript('volumeUp', callback);
};

exports.volumeDown = function(callback){
    return execScript('volumeDown', callback);
};

exports.setVolume = function(volume, callback){
    return execScript('setVolume', callback, function(script){
        return script.replace('{{volume}}', volume);
    });
};

// State retrieval

exports.getTrack = function(callback){
    return execScript('track', createJSONResponseHandler(callback));
};

exports.getState = function(callback){
    return execScript('state', createJSONResponseHandler(callback));
};

exports.isRunning = function(callback) {
    execScript('isRunning', function(error, response) {
        if (!error) {
            return callback(null, response === 'true' ? true : false);
        } else {
            return callback(error);
        }
    });
};
