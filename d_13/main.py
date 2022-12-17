import os, sys, json
from typing import List, Any, Iterable

def q1(f):
    dict = set()
    correct = set()
    packet = f.split('\n\n')
    for g, p in enumerate(packet):
        g = g + 1
        left, right = p.split('\n')
        l = json.loads(left)
        r = json.loads(right)
        correct = check(l, r, g, dict, correct)
    print(sum(correct))

def q2(f):
    lists = []
    packet = f.split('\n\n')
    for g, p in enumerate(packet):
        g = g + 1
        left, right = p.split('\n')
        l = json.loads(left)
        r = json.loads(right)
        lists.append(list(flatten(l)))
        lists.append(list(flatten(r)))
    lists.extend([[2], [6]])
    lists.sort()

    for li in lists:
        print(li)

    print((lists.index([2]) + 1) * (lists.index([6]) + 1))

def flatten(lst: List[Any]) -> Iterable[Any]:
    for item in lst:
        if isinstance(item, list):
            if len(item) == 0:
                item.append(0)
            yield from flatten(item)
        else:
            yield item

def check(l, r, g, dict, correct):
    l_count = len(l)
    r_count = len(r)
    
    for i, x in enumerate(l):
        left = x

        if g in dict:
            break
        elif r_count > i:
            right = r[i]
        else:
            dict.add(g)
            break

        if all(isinstance(x, int) for x in [left, right]):
            if left == right:
                continue
            if left < right:
                correct.add(g)
            dict.add(g)
     
        left = [left] if isinstance(left, int) else left
        right = [right] if isinstance(right, int) else right
        correct = check(left, right, g, dict, correct)
    
    if not g in dict and r_count > l_count:
        correct.add(g)

    return correct

def main():
    with open(os.path.join(sys.path[0], "input_test.txt"), "r") as file:
        f = file.read()
        q1(f)
        q2(f)

main()