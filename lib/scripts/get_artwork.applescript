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
  set savePath to POSIX path of (path to temporary items from user domain as string) & my replace_chars(current track's id,":","_")
  set tiffPath to (savePath & ".tiff")
  set pngPath to (savePath & ".png")
end tell

-- don't do the image events dance when the file already exists
if my file_exists(pngPath) then return pngPath

if not (my file_exists(tiffPath)) then
  set fileRef to (open for access tiffPath with write permission)
  write currentArtwork to fileRef
  close access fileRef
end

tell application "Image Events"
  launch
  set theImage to open tiffPath
  save theImage as PNG in pngPath
  delete file tiffPath
  quit
end tell

return pngPath
