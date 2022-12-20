const fs = require('fs');

const dirs = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
let cubes = new Set();
let MIN = 0;
let MAX = 0;

fs.readFile('input_01.txt',{encoding: 'utf-8'}, function (err, data ) {
  
    var lines = data.split('\n');  
    for (var i = 0; i < lines.length; i++) {
        var [x, y, z] = lines[i].split(',');
        cubes.add([x, y, z].join());
        MIN = Math.min(MIN, x, y, z);
        MAX = Math.max(MAX, x, y, z);
    }

    q1();
    q2('0,0,0');
});

function q1() {
    let count = 0;
    const cubeArr = [...cubes];
    for (var a = 0; a < cubeArr.length; a++) {
        let sides = 6;
        let c1 = cubeArr[a].split(',').map(c => parseInt(c));
        for (const [x, y, z] of dirs) {
            const coord = [c1[0] + x, c1[1] + y, c1[2] + z];
            if (cubes.has(coord.join())) {
                sides--;
            }
        }
        count += sides;
    }

    console.log('q1: ' + count);
}

function q2(node) {
    let queue = [];
    let count = 0;
    let visited = new Set();
    
    queue.push(node);
    while (queue.length > 0) {
        let n = queue.shift();
        let c1 = n.split(',').map(c => parseInt(c));

        if (visited.has(n)) continue;
        if (cubes.has(n)) continue;
        if (c1[0] < MIN - 1 || c1[1] < MIN - 1 || c1[2] < MIN - 1) continue;
        if (c1[0] > MAX + 1 || c1[1] > MAX + 1 || c1[2] > MAX + 1) continue;

        visited.add(n);

        let sides = 0; 
        for (const [x, y, z] of dirs) {
            const coord = [c1[0] + x, c1[1] + y, c1[2] + z];
            if (cubes.has(coord.join())) sides++;
            queue.push(coord.join());         
        }

        count += sides;
    }
    console.log('q2: ' + count);
}





      
