buildBoard = ->
  board = []
  for row in [0..3]  #i1 can be viewed as a row, and the board needs 4 rows
    board[row] = [] #put the 4 rows into the board
    for column in [0..3]
      board[row][column] = 0 #can view that as position (0, 0) the value is now set to 0, until (0,4) is also 0 it will go back up to (1,0) and loop again

  board #return to board

generateTile = ->
  console.log "generate tile"

printArray = (array)->
  console.log "-- Start --"
  for row in array
    console.log row
  console.log "-- End --"

$ ->
  newBoard = buildBoard()
  printArray (newBoard)
  generateTile()
  generateTile()