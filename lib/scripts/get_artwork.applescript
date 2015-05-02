on replace_chars(this_text, search_string, replacement_string)
  set AppleScript's text item delimiters to the search_string
  set the item_list to every text item of this_text
  set AppleScript's text item delimiters to the replacement_string
  set this_text to the item_list as string
  set AppleScript's text item delimiters to ""
  return this_text
end replace_chars

on file_exists(filePath)
  tell application "Finder" to return exists filePath as POSIX file
end file_exists

tell application "Spotify"
  set currentArtwork to current track's artwork
  return currentArtwork
end tell
