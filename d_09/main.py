import os, sys

def connected(x1, x2, y1, y2):
    dx = abs(x1 - x2)
    dy = abs(y1 - y2)
    return max([dx, dy]) == 1 or max([dx, dy]) == 0

def move_head(dir, x1, y1):
    match dir:
        case "U":
            y1 += 1
        case "D":
            y1 -= 1
        case "L":
            x1 -= 1
        case "R":
            x1 += 1 
    return x1, y1

def check_vert(x1, x2):
    if x1 > x2:
        x2 += 1
    else:
        x2 -= 1
    return x2

def check_hor(y1, y2):
    if y1 > y2:
        y2 += 1
    else:
        y2 -= 1
    return y2

def move_tail(x1, x2, y1, y2):
    if x1 == x2:
        y2 = check_hor(y1, y2)
    elif y1 == y2:
        x2 = check_vert(x1, x2)
    else:
        y2 = check_hor(y1, y2)
        x2 = check_vert(x1, x2)
    return x2, y2

def q1():
    visited = set()
    x1, x2, y1, y2 = 0, 0, 0, 0
    with open(os.path.join(sys.path[0], "input_01.txt"), "r") as file:
        while (line := file.readline().rstrip()):
            instr = line.split(' ')
            for _ in range(int(instr[1])):
                x1, y1 = move_head(instr[0], x1, y1)

                if not connected(x1, x2, y1, y2):
                    x2, y2 = move_tail(x1, x2, y1, y2)

                tail_pos = "{},{}".format(str(x2), str(y2))
                visited.add(tail_pos)
    
    print("q1: ", len(visited))

def q2():
    visited = set()
    rope = [[0 for _ in range(2)] for y in range(10)] 
    with open(os.path.join(sys.path[0], "input_01.txt"), "r") as file:
        while (line := file.readline().rstrip()):
            instr = line.split(' ')
            for _ in range(int(instr[1])):
                rope[0][0], rope[0][1] = move_head(instr[0], rope[0][0], rope[0][1])

                for i in range(len(rope) - 1):
                    new_h = [rope[i][0], rope[i][1]]
                    new_t = [rope[i+1][0], rope[i+1][1]]

                    if not connected(new_h[0], new_t[0], new_h[1], new_t[1]):
                        rope[i+1][0], rope[i+1][1] = move_tail(new_h[0], new_t[0], new_h[1], new_t[1])

                tail_pos = "{},{}".format(rope[9][0], rope[9][1])
                visited.add(tail_pos)

    print("q2: ", len(visited))

q1()
q2()

