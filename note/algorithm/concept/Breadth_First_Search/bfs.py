from collections import deque

number = 7
c = []


def bfs(start):
    q = []
    q.append(start)
    c[start] = True
    for i in q:
        x = q[0]
        q.deque()
        print(x)
