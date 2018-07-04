declare module 'spotify-node-applescript' {
  export function getState(callback?: any): any

  export function getTrack(callback?: any): any

  export function isRepeating(callback?: any): any

  export function isRunning(callback?: any): any

  export function isShuffling(callback?: any): any

  export function jumpTo(position: number, callback?: any): any

  export function muteVolume(callback?: any): any

  export function next(callback?: any): any

  export function open(uri: string, callback?: any): any

  export function pause(callback?: any): any

  export function play(callback?: any): any

  export function playPause(callback?: any): any

  export function playTrack(track: string, callback?: any): any

  export function playTrackInContext(
    track: string,
    context: string,
    callback?: any
  ): any

  export function previous(callback?: any): any

  export function setRepeating(repeating: boolean, callback?: any): any

  export function setShuffling(shuffling: boolean, callback?: any): any

  export function setVolume(volume: number, callback?: any): any

  export function toggleRepeating(callback?: any): any

  export function toggleShuffling(callback?: any): any

  export function unmuteVolume(callback?: any): any

  export function volumeDown(callback?: any): any

  export function volumeUp(callback?: any): any
}
