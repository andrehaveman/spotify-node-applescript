// Type definitions for spotify-node-applescript
// Project: spotify-node-applescript


declare module 'spotify-node-applescript' {

    // Open Track
    export function open(uri: string, callback: Function): void;
    export function playTrack(track: string, callback: Function): void;
    export function playTrackInContext(track: string, context: any, callback: Function): void;

    // Playback Control
    export function play(callback: Function): void;
    export function pause(callback: Function): void;
    export function playPause(callback: Function): void;
    export function next(callback: Function): void;
    export function previous(callback: Function): void;
    export function jumpTo(position: string, callback: Function): void;
    export function setRepeating(repeating: string, callback: Function): void;
    export function setShuffling(shuffling: string, callback: Function): void;
    export function toggleRepeating(callback: Function): void;
    export function toggleShuffling(callback: Function): void;

    // Volume Control
    export function volumeUp(callback: Function): void;
    export function volumeDown(callback: Function): void;
    export function setVolume(volume: string, callback: Function): void;
    export function muteVolume(callback: Function): void;
    export function unmuteVolume(callback: Function): void;
    export function getTrack(callback: Function): void;
    export function getState(callback: Function): void;
    export function isRunning(callback: Function): void;
    export function isRepeating(callback: Function): void;
    export function isShuffling(callback: Function): void;
}
