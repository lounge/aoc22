import os, sys

score1 = 0
score2 = 0
scores = ["X", "Y", "Z"] 
a_hands = [["A", "Z", "X", "Y"], 
           ["B", "X", "Y", "Z"], 
           ["C", "Y", "Z", "X"]] 

def q1(played_hands):
    for i in range(3):
        if a_hands[i][0] == played_hands[0]:
            for j in range(4):
                if a_hands[i][j] == played_hands[1]:
                    print((scores.index(played_hands[1]) + 1) + (j-1)*3)
                    return (scores.index(played_hands[1]) + 1) + (j-1)*3

def q2(played_hands):
    for i in range(3):
        if a_hands[i][0] == played_hands[0]:
            for j in range(3):
                if scores[j] == played_hands[1]:
                    return (scores.index(a_hands[i][j+1]) + 1) + (j)*3

with open(os.path.join(sys.path[0], "input_01.txt"), "r") as file:
    while (line := file.readline().rstrip()):
        score1 += q1(line.split(' '))
        score2 += q2(line.split(' '))

print(score1)
print(score2)

