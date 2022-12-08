var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input_01.txt')
});

let grid = [];

const arrayColumn = (arr, c) => arr.map(x => x[c]);
const visible = (arr, r, c) => arr.every( (val) => val < grid[r][c] );

function treeCount(arr, tree) {
    let count = 0;
    for (var i = 0; i < arr.length; i++) {
        count++
        if (arr[i] < tree) {
            count++;
        }
    }
    return count;
} 

function q1() {
    let trees = 0;
    for (var r = 1; r < grid.length - 1; r++) {
        for (var c = 1; c < grid[0].length - 1; c++) {
            const column = arrayColumn(grid, c);

            const up = visible(column.slice(0, r), r, c);
            const down = visible(column.slice(r + 1), r, c);
            const left = visible(grid[r].slice(0, c), r, c)
            const right = visible(grid[r].slice(c + 1), r, c)
            
            trees += [up, down, left, right].filter(Boolean).length > 0 ? 1 : 0;
        }
    }
    console.log(grid[0].length*2+(grid.length-2)*2 + trees);
}

function q2() {
    let scores = [];
    for (var r = 1; r < grid.length - 1; r++) {
        for (var c = 1; c < grid[0].length - 1; c++) {
            const column = arrayColumn(grid, c);
            const current = grid[r][c];

            const up = column.slice(0, r).reverse();
            const left = grid[r].slice(0, c).reverse();
            const right = grid[r].slice(c + 1);
            const down = column.slice(r + 1);

            scores.push(treeCount(up, current) * treeCount(left, current) * treeCount(right, current) * treeCount(down, current));
        }
    }
    console.log(Math.max(...scores));
}

lineReader.on('line', function (line) {
    let row = [...line];
    grid.push(row);
});

lineReader.on('close', function (line) {
    q1();
    q2();
});