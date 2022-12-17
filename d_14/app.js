const fs = require('fs');
let pathList = [];
let xVals = [];
let yVals = [];
let grid = [];
let minX = 0;
let minY = 0;
let maxY = 0;

let grain = 0;
let startX = 0;
let abyss = false;

fs.readFile('input_01.txt',{encoding: 'utf-8'}, function (err, data ) {
    let paths = data.split('\n');
    for (let i = 0; i < paths.length; i++)  {
        let path = paths[i];
        let line = path.split('->');
        pathList[i] = [];
        for (var j = 0; j < line.length; j++) {
            let point = line[j].trim().split(',');
            let x = parseInt(point[0]);
            let y = parseInt(point[1]);

            xVals.push(x);
            yVals.push(y);

            pathList[i].push([x, y]);
        }
    }

    q1();
    q2();
  
});

function q1() {
    let uY = [...new Set(yVals)];
    let uX = [...new Set(xVals)];
    
    minY  = Math.min(...uY) - 4;
     maxY = Math.max(...uY);
    
    minX  = Math.min(...uX);
    let maxX = Math.max(...uX);
    
    let yVal = maxY - minY;
    let xVal = maxX - minX;
    
    startX = 500 - minX;

    setup(xVal, yVal);
    build();

    while (abyss === false) {
        abyss = run(startX, 0);
    }
}

function q2() {
    let uY = [...new Set(yVals)];
    let uX = [...new Set(xVals)];
    
    minY  = Math.min(...uY);
     maxY = Math.max(...uY) + 1;
    
    minX  = Math.min(...uX);
    let maxX = Math.max(...uX);
    
    let yVal = maxY;
    let xVal = maxY * 3;
    
    startX =  500 - minX + maxY;

    setup(xVal, yVal);
    build2();

    while (abyss === false) {
        abyss = run2(startX, 0);
    }
}

function run(x, y) {
    if (x - 1 < 0 || x + 1 > grid[0].length || y+1 >= grid.length) {
        console.log(count())
        print();
        return true;
    }

    if ( !isBlocked(grid[y+1][x])) {
        return run(x, (y+1));
    } else if (!isBlocked(grid[y+1][x-1])) {
        return run(x-1, y+1);
    } else if ( !isBlocked(grid[y+1][x+1])) {
        return run(x+1, y+1);
    }

    grain++;
    grid[y][x] = 'o';
    return false;
}


function run2(x, y) {
    if (isBlocked(grid[0][startX])) {
        console.log(count())
        print();
        return true;
    }

    if (y + 1 < grid.length) {
        if ( !isBlocked(grid[y+1][x])) {
            return run2(x, (y+1));
        } else if (!isBlocked(grid[y+1][x-1])) {
            return run2(x-1, y+1);
        } else if ( !isBlocked(grid[y+1][x+1])) {
            return run2(x+1, y+1);
        }
    } 

    grain++;
    grid[y][x] = 'o';
    return false;
}

function isBlocked(point) {
    return point === '#' || point ===  'o';
}

function setup(xVal, yVal) {
    for (let y = 0; y <= yVal; y++) {
        grid[y] = [];
        for (let x = 0; x <= xVal; x++) {
            if (y === 0 && x === startX) {
                grid[y].push('+');
            } else {
                grid[y].push('.');
            }
        }
    }   
}

function build() {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            for (let i = 0; i < pathList.length; i++) {
                let path = pathList[i];            
                for (let p = 0; p < path.length-1; p++) {
                    let p1 = {x:path[p][0]-minX, y:path[p][1]};
                    let p2 = {x:path[p+1][0]-minX, y:path[p+1][1]};
                    if (between({x:x, y:y}, p1, p2)) {
                        grid[y][x] = '#';
                    }
                }
            }
        }
    }
}

function build2() {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            for (let i = 0; i < pathList.length; i++) {
                let path = pathList[i];            
                for (let p = 0; p < path.length-1; p++) {
                    let p1 = {x:((path[p][0]-minX) + maxY) , y:path[p][1]};
                    let p2 = {x:((path[p+1][0]-minX)+ maxY), y:path[p+1][1]};
                    if (between({x:x, y:y}, p1, p2)) {
                        grid[y][x] = '#';
                    }
                }
            }
        }
    }
}

function print() {
    // process.stdout.write('\033c');
    console.log('=================================')
    for (let y = 0; y < grid.length; y++) {
        console.log(grid[y].join(''));
    }
}

function between(curr, p1, p2) {
    if  (p1.x === curr.x && p2.x === curr.x) {
     if ((p1.y >= curr.y && curr.y >= p2.y) || (p2.y >= curr.y && curr.y >= p1.y)) {
         return true;
     }
    } else if(p1.y === curr.y && p2.y === curr.y) {
     if ((p1.x >= curr.x && curr.x >= p2.x) || (p2.x >= curr.x && curr.x >= p1.x)) {
         return true;
     }
    }

    return false;
 }

function count () {
    return grid.reduce((acc, arr) => {
        for (const item of arr) {
        acc[item] = acc[item] !== undefined ? acc[item] + 1 : 1
        }

        return acc
    }, {})
}

