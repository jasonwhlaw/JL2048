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
  # console.log "row: #{row} / col: #{column}"

  if board[row][column] is 0
    board[row][column] = value  #assign a value to the random coordinate where value = 2
  else
    generateTile(board)

  console.log "generate tile"

move = (board, direction) ->  #this function includes multiple functions as below
  newBoard = buildBoard()

  for i in [0..3]
    if direction in ['right', 'left'] #OR: if direction in ['right', 'left']
      row = getRow(i,board)
      row = mergeCells(row, direction)
      row = collapseCells(row, direction)
      setRow(row, i, newBoard)

    else if direction in ['up', 'down']
      column = getColumn(i,board)
      column = mergeCells(column, direction)
      column = collapseCells(column, direction)
      setColumn(column, i, newBoard)

  newBoard

getRow = (r, board) ->   #start cloning the board for pass by reference
  [board[r][0], board[r][1], board[r][2], board[r][3]]

getColumn = (c, board) ->   #start cloning the board for pass by reference
  [board[0][c], board[1][c], board[2][c], board[3][c]]

setRow = (row, index, board) ->
  board[index] = row

setColumn = (column, index, board) ->
  for i in [0..3]
    board[i][index] = column[i]

mergeCells = (cells, direction) ->

  merge = (cells) -> #this row is inside this merge function, different scope to row in mergeCells function
    for a in [3...0]
      for b in [a-1..0]
        if cells[a] is 0 then break
        else if cells[a] == cells[b]
          cells[a] *= 2 # same as cells[a] = cells[a] * 2
          cells[b] = 0
          break
        else if cells[b] isnt 0 then break
    cells

  if direction in ['right', 'down']
    cells = merge(cells)
  else if direction in ['left', 'up']
    cells = merge(cells.reverse()).reverse()

  cells

collapseCells = (cells, direction) ->
  # remove '0'
  cells = cells.filter (x) -> x isnt 0
  # adding '0'
  while cells.length < 4
    if direction in ['right', 'down']
      cells.unshift 0
    else if direction in ['left', 'up']
      cells.push 0
  cells
# console.log collapseCells [2, 0, 0, 2], 'right'
moveIsValid = (originalBoard, newBoard) ->
  for row in [0..3]
    for col in [0..3]
      if originalBoard[row][col] isnt newBoard[row][col]
        return true #use return to stop the function becasue it is a valid move and there is no need to check further

  false #if after running the 16 cells and the above is not met, then the loop will finish and return false

boardIsFull = (board) ->
  for row in board
    if 0 in row
      return false
  true

noValidMoves = (board) ->
  for direction in ['up', 'down', 'left', 'right']
    newBoard = move(board, direction)
    if moveIsValid(board, newBoard)
      return false
  true

isGameOver = (board) ->
  boardIsFull(board) and noValidMoves(board)

showBoard = (board) ->
  for row in [0..3]
    for col in [0..3]
      if board[row][col] is 0
        $(".r#{row}.c#{col} > div").html('')
        for power in [1..11]
          $(".r#{row}.c#{col} > div").removeClass('val-' + Math.pow(2, power))
      else
        $(".r#{row}.c#{col} > div").html(board[row][col])
        $(".r#{row}.c#{col} > div").addClass('val-' + board[row][col])
  # console.log "show board"
  # console.log row + col


printArray = (array) ->
  console.log "-- Start --"
  for row in array
    console.log row
  console.log "-- End --"

$ ->
  $('.board').hide()
  $('.board').fadeIn(5000)
  @board = buildBoard()
  generateTile(@board)
  generateTile(@board)
  showBoard(@board)

  $('.reset').click =>
    $('.board').hide()
    $('.board').fadeIn(1000)
    @board = buildBoard()
    generateTile(@board)
    generateTile(@board)
    showBoard(@board)
  $('.original').click =>
    document.location = 'http://gabrielecirulli.github.io/2048/'

  $('body').keydown (e) =>

    key = e.which
    keys = [37..40]

    if key in keys
      e.preventDefault()
      #continue the game
      console.log "key: ", key
      direction = switch key
        when 37 then 'left'
        when 38 then 'up'
        when 39 then 'right'
        when 40 then 'down'

      #try moving
      newBoard = move(@board, direction)
      printArray newBoard
      #check move validity by compring original and new board
      if moveIsValid(@board, newBoard) #comparing original board to new board
        console.log "valid"
        @board = newBoard
        #generate tile
        generateTile(@board)

        # show Board
        showBoard(@board)
        #check game lost
        if isGameOver(@board)
          gameOverMsg = confirm("TRY AGAIN?")
          if gameOverMsg is true
            $('.board').hide()
            $('.board').fadeIn(1000)
            @board = buildBoard()
            generateTile(@board)
            generateTile(@board)
            showBoard(@board)

          else
            document.location = 'http://www.reactiongifs.com/r/usk.gif'
        else
          showBoard(@board)
      else
        console.log "invalid"
      #do nothing
