package main

import (
    "bufio"
    "fmt"
    "log"
    "os"
	"strings"
	"strconv"
)

var step = 20
var q1_sum = 0

var crt [6][40]string
var crt_row = 0
var crt_pos = 1

func main() {
	x := 1
	cycle := 0

    file, err := os.Open("input_01.txt")
    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
		s := strings.Split(scanner.Text(), " ")
        cycle, x = process(s, cycle, x)
    }

    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }

	fmt.Println(q1_sum)

	for i := range crt {
		fmt.Println(crt[i])
	}
}

func process(cmd []string, cycle int, x int) (int, int) {
	switch {
		case cmd[0] == "addx":
			for i := 0; i < 2; i++ {
				cycle++
				q1_sum = q1_sum + decrypt_signal(cycle, x)
				crt_pos++
			}
			add, _ := strconv.Atoi(cmd[1])
			x = x + add
		default:
			cycle++
			q1_sum = q1_sum + decrypt_signal(cycle, x)
			crt_pos++
	}

	return cycle, x
}

func decrypt_signal(cycle int, x int) int {
	if ((crt_pos - 1) >= (x - 1)) && ((crt_pos - 1) <= (x + 1)) {
		 crt[crt_row][crt_pos - 1] = "#"
	} else {
		crt[crt_row][crt_pos - 1] = "."
	}

	if (crt_pos  == 40) {
		crt_row = crt_row + 1
		crt_pos = 0
	}

	if (cycle == step) {
		signal := (step * x)
		step = step + 40
		
		return signal
	}
	return 0	
}


