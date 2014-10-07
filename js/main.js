// Generated by CoffeeScript 1.8.0
(function() {
  var boardIsFull, buildBoard, collapseCells, generateTile, getColumn, getRow, isGameOver, mergeCells, move, moveIsValid, noValidMoves, printArray, randomCellIndices, randomInteger, randomValue, setColumn, setRow, showBoard,
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
    if (board[row][column] === 0) {
      board[row][column] = value;
    } else {
      generateTile(board);
    }
    return console.log("generate tile");
  };

  move = function(board, direction) {
    var column, i, newBoard, row, _i;
    newBoard = buildBoard();
    for (i = _i = 0; _i <= 3; i = ++_i) {
      if (direction === 'right' || direction === 'left') {
        row = getRow(i, board);
        row = mergeCells(row, direction);
        row = collapseCells(row, direction);
        setRow(row, i, newBoard);
      } else if (direction === 'up' || direction === 'down') {
        column = getColumn(i, board);
        column = mergeCells(column, direction);
        column = collapseCells(column, direction);
        setColumn(column, i, newBoard);
      }
    }
    return newBoard;
  };

  getRow = function(r, board) {
    return [board[r][0], board[r][1], board[r][2], board[r][3]];
  };

  getColumn = function(c, board) {
    return [board[0][c], board[1][c], board[2][c], board[3][c]];
  };

  setRow = function(row, index, board) {
    return board[index] = row;
  };

  setColumn = function(column, index, board) {
    var i, _i, _results;
    _results = [];
    for (i = _i = 0; _i <= 3; i = ++_i) {
      _results.push(board[i][index] = column[i]);
    }
    return _results;
  };

  mergeCells = function(cells, direction) {
    var merge;
    merge = function(cells) {
      var a, b, _i, _j, _ref;
      for (a = _i = 3; _i > 0; a = --_i) {
        for (b = _j = _ref = a - 1; _ref <= 0 ? _j <= 0 : _j >= 0; b = _ref <= 0 ? ++_j : --_j) {
          if (cells[a] === 0) {
            break;
          } else if (cells[a] === cells[b]) {
            cells[a] *= 2;
            cells[b] = 0;
            break;
          } else if (cells[b] !== 0) {
            break;
          }
        }
      }
      return cells;
    };
    if (direction === 'right' || direction === 'down') {
      cells = merge(cells);
    } else if (direction === 'left' || direction === 'up') {
      cells = merge(cells.reverse()).reverse();
    }
    return cells;
  };

  collapseCells = function(cells, direction) {
    cells = cells.filter(function(x) {
      return x !== 0;
    });
    while (cells.length < 4) {
      if (direction === 'right' || direction === 'down') {
        cells.unshift(0);
      } else if (direction === 'left' || direction === 'up') {
        cells.push(0);
      }
    }
    return cells;
  };

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
    var direction, newBoard, _i, _len, _ref;
    _ref = ['up', 'down', 'left', 'right'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      direction = _ref[_i];
      newBoard = move(board, direction);
      if (moveIsValid(board, newBoard)) {
        return false;
      }
    }
    return true;
  };

  isGameOver = function(board) {
    return boardIsFull(board) && noValidMoves(board);
  };

  showBoard = function(board) {
    var col, power, row, _i, _results;
    _results = [];
    for (row = _i = 0; _i <= 3; row = ++_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (col = _j = 0; _j <= 3; col = ++_j) {
          if (board[row][col] === 0) {
            $(".r" + row + ".c" + col + " > div").html('');
            _results1.push((function() {
              var _k, _results2;
              _results2 = [];
              for (power = _k = 1; _k <= 11; power = ++_k) {
                _results2.push($(".r" + row + ".c" + col + " > div").removeClass('val-' + Math.pow(2, power)));
              }
              return _results2;
            })());
          } else {
            $(".r" + row + ".c" + col + " > div").html(board[row][col]);
            _results1.push($(".r" + row + ".c" + col + " > div").addClass('val-' + board[row][col]));
          }
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
    $('.board').hide();
    $('.board').fadeIn(5000);
    this.board = buildBoard();
    generateTile(this.board);
    generateTile(this.board);
    showBoard(this.board);
    $('.reset').click((function(_this) {
      return function() {
        $('.board').hide();
        $('.board').fadeIn(1000);
        _this.board = buildBoard();
        generateTile(_this.board);
        generateTile(_this.board);
        return showBoard(_this.board);
      };
    })(this));
    $('.original').click((function(_this) {
      return function() {
        return document.location = 'http://gabrielecirulli.github.io/2048/';
      };
    })(this));
    return $('body').keydown((function(_this) {
      return function(e) {
        var direction, gameOverMsg, key, keys, newBoard;
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
              gameOverMsg = confirm("TRY AGAIN?");
              if (gameOverMsg === true) {
                $('.board').hide();
                $('.board').fadeIn(1000);
                _this.board = buildBoard();
                generateTile(_this.board);
                generateTile(_this.board);
                return showBoard(_this.board);
              } else {
                return document.location = 'http://www.reactiongifs.com/r/usk.gif';
              }
            } else {
              return showBoard(_this.board);
            }
          } else {
            return console.log("invalid");
          }
        }
      };
    })(this));
  });

}).call(this);

//# sourceMappingURL=main.js.map
