var ppm = require("binaryppm");
var fs = require("fs");
var Firebase = require("firebase");

var tetrisFirebase = new Firebase("https://a5ul9cul6hd.firebaseio-demo.com/");

var colorMap = {
  R: [255,0,0],
  G: [0,255,0],
  B: [0,0,255],
  b: [128,128,255],
  O: [255,255,0],
  Y: [0,255,255],
  P: [255,0,255],
  " ":[0,0,0]
};

function tetrisToPixels(tetrisBoard) {
  var pixelBoard = [];
  if(tetrisBoard == null) {
    for(var i=0; i < 20; i++) {
      pixelBoard.push([[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]);
    }
    return pixelBoard;
  } else {
    for(var i=0; i<20; i++) {
      var row = tetrisBoard[i];
      if(row == null) {
        pixelBoard.push([[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]);
      } else {
        var pixelRow = [];
        for(var j=0; j < row.length; j++) {
          pixelRow.unshift(colorMap[row.charAt(j)]);
        }
        pixelBoard.push(pixelRow);
      }
    }
  }
  return pixelBoard;
}


tetrisFirebase.child("player0/board").on("value", function(snapshot) {
  board = snapshot.val();
  var boardPixels = tetrisToPixels(board);
  // Transpose the board so it looks nicer
  var transposedPixels = boardPixels[0].map(function(col, i) {
    return boardPixels.map(function(row) {
      return row[i];
    })
  });
  var imageStream = ppm.serialize(transposedPixels);
  var fileStream = fs.createWriteStream("imagetmp.ppm");

  imageStream.pipe(fileStream);
  fs.rename("imagetmp.ppm", "image.ppm");
  console.log(".");
});

