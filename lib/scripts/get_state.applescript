on replace_chars(this_text, search_string, replacement_string)
  set AppleScript's text item delimiters to the search_string
  set the item_list to every text item of this_text
  set AppleScript's text item delimiters to the replacement_string
  set this_text to the item_list as string
  set AppleScript's text item delimiters to ""
  return this_text
end replace_chars

tell application "Spotify"
  -- force string coercion and locale format
  set position to "" & player position

  set cstate to "{"
  set cstate to cstate & "\"track_id\": \"" & current track's id & "\""
  set cstate to cstate & ",\"volume\": " & sound volume
  -- replace , with . when locale has , as decimal delimiter
  set cstate to cstate & ",\"position\": " & my replace_chars(position, ",", ".")
  set cstate to cstate & ",\"state\": \"" & player state & "\""
  set cstate to cstate & "}"

  return cstate
end tell
