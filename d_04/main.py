import os, sys

q1 = 0
q2 = 0

with open(os.path.join(sys.path[0], "input_01.txt"), "r") as file:
    while (line := file.readline().rstrip()):
        sections = line.split(',')
        s1 = set(range(int(sections[0].split('-')[0]), int(sections[0].split('-')[1]) + 1))
        s2 = set(range(int(sections[1].split('-')[0]), int(sections[1].split('-')[1]) + 1))
        
        if (len(s1 - s2) == 0 or len(s2 - s1) == 0):
            q1 += 1
        if (len(s1 - s2) < len(s1) or len(s2 - s1) < len(s2)):
            q2 += 1
        
print(q1)
print(q2)
