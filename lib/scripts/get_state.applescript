tell application "Spotify"
  set cstate to "{"
  set cstate to cstate & "\"volume\": " & sound volume
  set cstate to cstate & ",\"position\": \"" & player position & "\""
  set cstate to cstate & ",\"state\": \"" & player state & "\""
  set cstate to cstate & "}"
  return cstate
end tell