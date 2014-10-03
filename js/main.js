// Generated by CoffeeScript 1.8.0
(function() {
  var boardIsFull, buildBoard, collapseCells, generateTile, getRow, isGameOver, mergeCells, move, moveIsValid, noValidMoves, printArray, randomCellIndices, randomInteger, randomValue, setRow, showBoard,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  randomInteger = function(x) {
    return Math.floor(Math.random() * x);
  };

  randomCellIndices = function() {
    return [randomInteger(4), randomInteger(4)];
  };

  randomValue = function() {
    var values;
    values = [2, 2, 2, 4];
    return values[randomInteger(4)];
  };

  buildBoard = function() {
    return [0, 1, 2, 3].map((function() {
      return [0, 1, 2, 3].map((function() {
        return 0;
      }));
    }));
  };

  generateTile = function(board) {
    var column, row, value, _ref;
    value = randomValue();
    _ref = randomCellIndices(), row = _ref[0], column = _ref[1];
    console.log("row: " + row + " / col: " + column);
    if (board[row][column] === 0) {
      board[row][column] = value;
    } else {
      generateTile(board);
    }
    return console.log("generate tile");
  };

  move = function(board, direction) {
    var i, newBoard, row, _i, _j;
    newBoard = buildBoard();
    for (i = _i = 0; _i <= 3; i = ++_i) {
      if (direction === 'right') {
        row = getRow(i, board);
        row = mergeCells(row, direction);
        row = collapseCells(row, direction);
        setRow(row, i, newBoard);
      }
    }
    for (i = _j = 0; _j <= 3; i = ++_j) {
      if (direction === 'left') {
        row = getRow(i, board);
        row = mergeCells(row, direction);
        row = collapseCells(row, direction);
        setRow(row, i, newBoard);
      }
    }
    return newBoard;
  };

  getRow = function(r, board) {
    return [board[r][0], board[r][1], board[r][2], board[r][3]];
  };

  setRow = function(row, index, board) {
    return board[index] = row;
  };

  mergeCells = function(row, direction) {
    var a, b, _i, _j, _k, _l, _ref, _ref1;
    if (direction === 'right') {
      for (a = _i = 3; _i > 0; a = --_i) {
        for (b = _j = _ref = a - 1; _ref <= 0 ? _j <= 0 : _j >= 0; b = _ref <= 0 ? ++_j : --_j) {
          if (row[a] === 0) {
            break;
          } else if (row[a] === row[b]) {
            row[a] *= 2;
            row[b] = 0;
            break;
          } else if (row[b] !== 0) {
            break;
          }
        }
      }
    }
    if (direction === 'left') {
      for (a = _k = 0; _k < 3; a = ++_k) {
        for (b = _l = 0, _ref1 = a - 1; 0 <= _ref1 ? _l <= _ref1 : _l >= _ref1; b = 0 <= _ref1 ? ++_l : --_l) {
          if (row[a] === 0) {
            break;
          } else if (row[a] === row[b]) {
            row[a] *= 2;
            row[b] = 0;
            break;
          } else if (row[b] !== 0) {
            break;
          }
        }
      }
    }
    return row;
  };

  console.log(mergeCells([4, 0, 0, 4], 'right'));

  collapseCells = function(row, direction) {
    row = row.filter(function(x) {
      return x !== 0;
    });
    if (direction === 'right') {
      while (row.length < 4) {
        row.unshift(0);
      }
    }
    if (direction === 'left') {
      while (row.length < 4) {
        row.unshift(0);
      }
    }
    return row;
  };

  console.log(collapseCells([2, 0, 0, 2], 'right'));

  moveIsValid = function(originalBoard, newBoard) {
    var col, row, _i, _j;
    for (row = _i = 0; _i <= 3; row = ++_i) {
      for (col = _j = 0; _j <= 3; col = ++_j) {
        if (originalBoard[row][col] !== newBoard[row][col]) {
          return true;
        }
      }
    }
    return false;
  };

  boardIsFull = function(board) {
    var row, _i, _len;
    for (_i = 0, _len = board.length; _i < _len; _i++) {
      row = board[_i];
      if (__indexOf.call(row, 0) >= 0) {
        return false;
      }
    }
    return true;
  };

  noValidMoves = function(board) {
    var direction, newBoard;
    direction = 'right';
    newBoard = move(board, direction);
    if (moveIsValid(board, newBoard)) {
      return false;
    }
    return false;
  };

  isGameOver = function(board) {
    return boardIsFull(board) && noValidMoves(board);
  };

  showBoard = function(board) {
    var col, row, _i, _results;
    _results = [];
    for (row = _i = 0; _i <= 3; row = ++_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (col = _j = 0; _j <= 3; col = ++_j) {
          _results1.push($(".r" + row + ".c" + col + " > div").html(board[row][col]));
        }
        return _results1;
      })());
    }
    return _results;
  };

  printArray = function(array) {
    var row, _i, _len;
    console.log("-- Start --");
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      row = array[_i];
      console.log(row);
    }
    return console.log("-- End --");
  };

  $(function() {
    this.board = buildBoard();
    generateTile(this.board);
    generateTile(this.board);
    showBoard(this.board);
    return $('body').keydown((function(_this) {
      return function(e) {
        var direction, key, keys, newBoard;
        key = e.which;
        keys = [37, 38, 39, 40];
        if (__indexOf.call(keys, key) >= 0) {
          e.preventDefault();
          console.log("key: ", key);
          direction = (function() {
            switch (key) {
              case 37:
                return 'left';
              case 38:
                return 'up';
              case 39:
                return 'right';
              case 40:
                return 'down';
            }
          })();
          newBoard = move(_this.board, direction);
          printArray(newBoard);
          if (moveIsValid(_this.board, newBoard)) {
            console.log("valid");
            _this.board = newBoard;
            generateTile(_this.board);
            showBoard(_this.board);
            if (isGameOver(_this.board)) {
              return console.log("YOU LOSE");
            }
          } else {
            return console.log("invalid");
          }
        } else {

        }
      };
    })(this));
  });

}).call(this);

//# sourceMappingURL=main.js.map
