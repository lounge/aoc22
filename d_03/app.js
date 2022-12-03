var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input_01.txt')
});

const items = [];
const items2 = [];
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
    items.push(first.filter(value => second.includes(value)));

    if (groups.length < 3) {
      groups.push([...new Set([...line])])
    } if (groups.length === 3) {
      items2.push(groups.reduce((a, b) => a.filter(c => b.includes(c))));
      groups = [];
    }
});

lineReader.on('close', function() {
  let score = 0;
  let score2 = 0;
  items.forEach(item => {
    var charCode = item[0].charCodeAt(0);
    score += getPriority(charCode);
  });

  items2.forEach(item => {
    var charCode = item[0].charCodeAt(0);
    score2 += getPriority(charCode);
  });

  console.log(score);
  console.log(score2);
});