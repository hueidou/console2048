function HTMLActuator() {
  //this.tileContainer    = document.querySelector(".tile-container");
  //this.scoreContainer   = document.querySelector(".score-container");
  //this.bestContainer    = document.querySelector(".best-container");
  //this.messageContainer = document.querySelector(".game-message");
  this.styledic = {
    2: {'str': ' 2  ', 'c': 'black', 'bc': '#eee4da'},
    4: {'str': ' 4  ', 'c': 'black', 'bc': '#ede0c8'},
    8: {'str': ' 8  ', 'c': '#f9f6f2', 'bc': '#f2b179'},
    16: {'str': ' 16 ', 'c': '#f9f6f2', 'bc': '#f59563'},
    32: {'str': ' 32 ', 'c': '#f9f6f2', 'bc': '#f67c5f'},
    64: {'str': ' 64 ', 'c': '#f9f6f2', 'bc': '#f65e3b'},
    128: {'str': '128 ', 'c': '#f9f6f2', 'bc': '#edcf72'},
    256: {'str': '256 ', 'c': '#f9f6f2', 'bc': '#edcc61'},
    512: {'str': '512 ', 'c': '#f9f6f2', 'bc': '#edc850'},
    1024: {'str': '1024', 'c': '#f9f6f2', 'bc': '#edc53f'},
    2048: {'str': '2048', 'c': '#f9f6f2', 'bc': '#edc22e'},
    'game-won': {'str': 'You win!', 'c': 'red', 'bc': 'white'},
    'game-over': {'str': 'Game over!', 'c': 'red', 'bc': 'white'},
  };

  this.score = 0;
  this.values = [];
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    //!self.clearContainer(self.tileContainer);
    self.clearContainer(null);

    // 这里需要一个正对角线翻转

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        //if (cell) {
        //  self.addTile(cell);
        //}
        self.write(cell);
      });
      self.flush();
    });

    //self.updateScore(metadata.score);
    //self.updateBestScore(metadata.bestScore);
    self.writeConsole(['Score:', metadata.score], ['""', '""']);
    self.writeConsole(['BestScore:', metadata.bestScore], ['""', '""']);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  this.clearConsole();
};

HTMLActuator.prototype.clearContainer = function (container) {
  //while (container.firstChild) {
  //  container.removeChild(container.firstChild);
  //}
  this.clearConsole();
};

/*
HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};


HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};
*/

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  //this.messageContainer.classList.add(type);
  //this.messageContainer.getElementsByTagName("p")[0].textContent = message;
  this.writeConsole(["%c" + message], ['"color: ' + this.styledic[type].c + ';background-color: ' + this.styledic[type].bc + ';"']);
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  //this.messageContainer.classList.remove("game-won");
  //this.messageContainer.classList.remove("game-over");
};

HTMLActuator.prototype.clearConsole = function () {
  // console.clear();
  console.clear();
};

HTMLActuator.prototype.write = function (cell) {
  this.values.push(!!cell ? cell.value : null);
};

HTMLActuator.prototype.flush = function () {
  var str = [];
  var css = [];
  for(var i in this.values) {
    var num = this.values[i];
    if (num != null) {
      str.push('%c' + this.styledic[num].str);
      css.push('"color: ' + this.styledic[num].c + ';background-color: ' + this.styledic[num].bc + ';border:#eee 1px solid"');
    } else {
      str.push('%c    ');
      css.push('"background-color: #ddd;border:#eee 1px solid"');
    }
  }

  this.writeConsole(str, css);
  this.values = [];
};

HTMLActuator.prototype.writeConsole = function (str, css) {
  var eval1 = 'console.log("' + str.join('') + '",' + css.join(',') + ')';
  eval(eval1);
};