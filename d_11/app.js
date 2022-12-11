const fs = require('fs');

let monkeyInfo = [];

fs.readFile('input_01.txt',{encoding: 'utf-8'}, function (err, data ) {
    monkeyInfo = data.split('Monkey');
    monkeyInfo.splice(0, 1);

    q1();
    q2();
});

function parse(monkeyInfo, i) {
    let info = monkeyInfo.split("\n");
    let opLine = info[2].substring(23).split(' ');

    return monkey = {
        id: i,
        items: info[1].substring(18).split(',').map(Number).filter(element => typeof element === 'number' && !Number.isNaN(element)),
        op: opLine[0],
        param: opLine[1] == 'old' ? -1 : parseInt(opLine[1]),
        inspect: 0,
        test: {
            param: parseInt(info[3].replace ( /[^\d.]/g, '' )),
            outcomes: [parseInt(info[4].replace ( /[^\d.]/g, '' )), parseInt(info[5].replace ( /[^\d.]/g, '' ))]
        }
    }
}

function calculate(val1, val2, sign) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    }
    if (sign in operators) {
        return operators[sign](val1, val2);
    }
}


function q1() {
    let monkeys = [];
    for (let i = 0; i < monkeyInfo.length; i++) {
        monkeys.push(parse(monkeyInfo[i], i));
    }

    let round = 1;
    while (round <= 20) {
        for (let i = 0; i < monkeys.length; i++) {
            let m = monkeys[i];
    
            if (m.items.length == 0) {
                continue;
            }

            for (let y = 0; y < m.items.length; y++) {
                let item = m.items[y];
                item = calculate(item, m.param === -1 ? item : m.param, m.op);
                item = Math.floor(item / 3)
                m.inspect++;

                item % m.test.param == 0 ? monkeys[m.test.outcomes[0]].items.push(item) : monkeys[m.test.outcomes[1]].items.push(item);
            }
            m.items = [];
        }
        round++;
    }

    const top = monkeys.sort((a, b) => b.inspect - a.inspect);
    console.log('q1: ' + top[0].inspect * top[1].inspect,  top[0].inspect,  top[1].inspect);
}

function q2() {
    let monkeys = [];
    for (let i = 0; i < monkeyInfo.length; i++) {
        monkeys.push(parse(monkeyInfo[i], i));
    }

    let round = 1;
    let mod = monkeys.map(m => m.test.param).reduce((a,b) => a * b);
    while (round <= 10000) {
        for (let i = 0; i < monkeys.length; i++) {
            let m = monkeys[i];
    
            if (m.items.length == 0) {
                continue;
            }

            for (let y = 0; y < m.items.length; y++) {
                let item = m.items[y];
                item = calculate(item, m.param === -1 ? item : m.param, m.op);
                item = item % mod;
                m.inspect++;

                item % m.test.param == 0 ? monkeys[m.test.outcomes[0]].items.push(item) : monkeys[m.test.outcomes[1]].items.push(item);
            }
            m.items = [];
        }
        round++;
    }

    const top = monkeys.sort((a, b) => b.inspect - a.inspect);
    console.log('q2: ' + top[0].inspect * top[1].inspect,  top[0].inspect,  top[1].inspect);
}