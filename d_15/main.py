import os, sys
import re

tris = []
x_val = set()
b = set()
row = 10
n = 4000000

def area(x1, y1, x2, y2, x3, y3):
    return abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0)
 
def inside(x1, y1, x2, y2, x3, y3, x, y):
    a = area(x1, y1, x2, y2, x3, y3)
    a1 = area(x, y, x2, y2, x3, y3)
    a2 = area(x1, y1, x, y, x3, y3)
    a3 = area(x1, y1, x2, y2, x, y)
    return a == a1 + a2 + a3

def safe(points, point):
    if point[0] < 0 or point[0] > n or point[1] < 0 or point[1] > n:
        return False

    for x1, y1, manh in points:
        manh_b = abs(x1-point[0]) + abs(y1-point[1])
        if manh >= manh_b:
            return False

    return True
        
def q1():
    c = 0
    for x in range(min(x_val), max(x_val)):
        for tx, ty in tris:
            if inside(tx[0], ty[0], tx[1], ty[1], tx[2], ty[2], x, row):
                c = c + 1
                break
            
    return c-len(b)

def q2(points): 
    for x1, y1, manh in points:
        start = y1 - manh - 1
        end = y1 + manh + 1
        x = 0

        for i in range(start,end+1):
            left, right = (x1+x, i), (x1-x, i)

            if safe(points, left): return left
            if safe(points, right): return right

            if i < y1: x+=1 
            else: x-=1
    
    return None

with open(os.path.join(sys.path[0], "input_test.txt"), "r") as file:
    points = []

    while (line := file.readline().rstrip()):
        s = re.findall("[-+]?[.]?[\d]+(?:,\d\d\d)*[\.]?\d*(?:[eE][-+]?\d+)?", line)
        x1, y1, x2, y2 = [eval(i) for i in s]
        dist = abs(x1-x2) + abs(y1-y2)

        if y2 == row:
            b.add((x2, y2))

        left, right = x1-dist, x1+dist
        x_val.update([left, right])

        tris.append([[left, x1, right], [y1, y1+dist, y1]])
        tris.append([[left, x1, right], [y1, y1-dist, y1]])

        points.append((x1, y1, dist))

    print(q1())

    x, y  = q2(points)
    print(x * 4000000 + y)






