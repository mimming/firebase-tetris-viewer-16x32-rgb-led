var fs = require("fs");

var buf = new Buffer(4);
buf.writeUInt8(0x67, 0);
buf.writeUInt8(0x69, 1);
buf.writeUInt8(0x23, 2);


console.log(buf);

var stream = fs.createWriteStream("my_file.bin");

stream.write(intToByte(43));
stream.write(intToByte(55));
stream.end();


function intToByte(int) {
  var buf2 = new Buffer(1);
  buf2.writeUInt8(int, 0);
  return buf2;
}