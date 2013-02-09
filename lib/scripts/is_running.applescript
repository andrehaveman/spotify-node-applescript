tell application "System Events"
  set ProcessList to name of every process
  return "Spotify" is in ProcessList
end tell