import os, sys

stacks_q1 = [[0 for i in range(0)] for j in range(9)]
stacks_q2 = [[0 for i in range(0)] for j in range(9)]

with open(os.path.join(sys.path[0], "input_01.txt"), "r") as file:
    line_count = 0
    while (line := file.readline()):
        spacing = 0
        if "[" in line:
            for col in range(len(stacks_q1)):
                crate = line[1+spacing:2+spacing]
                spacing += 4
                if crate != ' ':
                    stacks_q1[col].append(crate)
                    stacks_q2[col].append(crate)
        elif line[0:1] == "m":
            a, b, c = [int(val) for val in line.rstrip().split(' ') if val.isdigit()]
            for move_count in range(a):
                crate = stacks_q1[b-1].pop(0)
                stacks_q1[c-1].insert(0, crate)

            new_col = stacks_q2[b-1][0:a] + stacks_q2[c-1]
            stacks_q2[b-1] = stacks_q2[b-1][a:len(stacks_q2[b-1])]
            stacks_q2[c-1] = new_col

print(''.join(map(str, [i[0] for i in stacks_q1])))
print(''.join(map(str, [i[0] for i in stacks_q2])))

