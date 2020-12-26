maze_dict = {
    "a": ["e"],
    "b": ["f", "c"],
    "c": ["b", "d"],
    "d": ["c"],
    "e": ["a", "i"],
    "f": ["j", "b", "g"],
    "g": ["f", "h"],
    "h": ["g", "l"],
    "i": ["e", "m"],
    "j": ["n", "f", "k"],
    "k": ["j", "o"],
    "l": ["h", "p"],
    "m": ["i", "n"],
    "n": ["m", "j"],
    "o": ["k"],
    "p": ["l"]
}


def solve_maze(g, start, end):
    qu = []
    done = set()

    qu.append(start)
    done.add(start)

    while qu:
        p = qu.pop(0)
        v = p[-1]
        print("p: ", p)
        print("v: ", v)
        if v == end:
            print("p: ", p)
            return p

        for x in g[v]:
            print("g[v]: ", g[v])
            print("x: ", x)
            if x not in done:
                qu.append(p + x)
                done.add(x)
        print("qu: ", qu)

    return "?"


print(solve_maze(maze_dict, "a", "p"))
