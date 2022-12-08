var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input_01.txt')
});

let score = 0;
let score2 = 0;
let groups = [];

function getPriority(code) {
  if (65 <= code && code <= 90) {
    return code - 38;
  }   else if (97 <= code && code <= 122) {
    return code - 96;
  }
}

lineReader.on('line', function (line) {
    let first =  [...new Set([...line.substring(0, line.length / 2)])];
    let second = [...new Set([...line.substring(line.length / 2)])];
    score += getPriority(first.filter(value => second.includes(value))[0].charCodeAt(0));
    if (groups.length < 3) {
      groups.push([...new Set([...line])])
    } if (groups.length === 3) {
      score2 += getPriority(groups.reduce((a, b) => a.filter(c => b.includes(c)))[0].charCodeAt(0));
      groups = [];
    }
});

lineReader.on('close', function() {
  console.log(score);
  console.log(score2);
});