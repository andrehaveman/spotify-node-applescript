on replace_chars(this_text, search_string, replacement_string)
  set AppleScript's text item delimiters to the search_string
  set the item_list to every text item of this_text
  set AppleScript's text item delimiters to the replacement_string
  set this_text to the item_list as string
  set AppleScript's text item delimiters to ""
  return this_text
end replace_chars

tell application "Spotify"
  set currentArtwork to current track's artwork
  set savePath to POSIX path of (path to temporary items from user domain as string) & my replace_chars(current track's id,":","_")
  set tiffPath to (savePath & ".tiff")
  set pngPath to (savePath & ".png")
end tell

-- don't do the image events dance when the file already exists
tell application "Finder"
  if exists pngPath as POSIX file then
    return pngPath
  end if
end tell

tell application "System Events"
  set fileRef to (open for access tiffPath with write permission)
  write currentArtwork to fileRef
  close access fileRef

  tell application "Image Events"
    launch
    set theImage to open tiffPath
    save theImage as PNG in pngPath
    quit
  end tell

  delete file tiffPath
  quit
end tell

return pngPath
