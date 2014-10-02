randomInteger = (x) ->
  Math.floor(Math.random() * x)

randomCellIndices = ->
  [randomInteger(4), randomInteger(4)] #refer to x = 4 as random number is 0 - 0.99, so need to x 4 to get number between 0-3 after round down

randomValue = ->
  values = [2, 2, 2, 4]
  values[randomInteger(4)]

buildBoard = ->
  # board = []
  # for row in [0..3]  #i1 can be viewed as a row, and the board needs 4 rows
    # board[row] = [] #put the 4 rows into the board
    # for column in [0..3]
      # board[row][column] = 0 #can view that as position (0, 0) the value is now set to 0, until (0,4) is also 0 it will go back up to (1,0) and loop again
  # board #return to board
  [0..3].map (-> [0..3].map (-> 0))

generateTile = (board) ->
  value = randomValue()
  [row, column] = randomCellIndices()  #assign the two random numbers to row and colum respectively as a coordinate
  console.log "row: #{row} / col: #{column}"

  if board[row][column] is 0
    board[row][column] = value  #assign a value to the random coordinate where value = 2
  else
    generateTile(board)

  console.log "generate tile"

move = (board, direction) ->

  for i in [0..3]
    if direction is 'right'
      row = getRow(i,board)
      mergeCells(row, direction)
      collapseCells()

getRow = (r, board) ->   #start cloning the board for pass by reference
  [board[r][0], board[r][1], board[r][2], board[r][3]]

mergeCells = (row, direction) ->
  if direction is 'right'
    for a in [3...0]
      for b in [a-1..0]
        if row[a] = 0 then break
        else if row[a] == row[b]
          row[a] *= 2 # same as row[a] = row[a] * 2
          row[b] = 0
          break
        else if row[b] isnt 0 then break
  row

console.log  mergeCells [4, 0, 0, 4], 'right'

collapseCells = ->
  console.log 'collapse cells'


showBoard = (board) ->
  for row in [0..3]
    for col in [0..3]
      $(".r#{row}.c#{col} > div").html(board[row][col])

  console.log "show board"
  console.log row + col


printArray = (array) ->
  console.log "-- Start --"
  for row in array
    console.log row
  console.log "-- End --"

$ ->
  #newBoard = buildBoard()
  @board = buildBoard()
  generateTile(@board)
  generateTile(@board)
  #printArray(newBoard)
  showBoard(@board)

  $('body').keydown (e) =>
    e.preventDefault()

    key = e.which
    keys = [37..40]

    if key in keys
      #continue the game
      console.log "key: ", key
      direction = switch key
        when 37 then 'left'
        when 38 then 'up'
        when 39 then 'right'
        when 40 then 'down'
      console.log "direction: ", direction

      #try moving
      move(@board, direction)
      #check move validity

    else
      #do nothing
