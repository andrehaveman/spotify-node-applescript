on min(x, y)
  if x ≤ y then
    return x
  else
    return y
  end if
end min

tell application "Spotify" to set sound volume to (my min(sound volume + 10, 100))