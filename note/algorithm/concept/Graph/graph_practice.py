g_dict = {
    "1": ["2", "3"],
    "2": ["1", "4", "5"],
    "3": ["1"],
    "4": ["2"],
    "5": ["2"]
}

key = input()


def search_graph(g, key):
    qu = []
    done = set()

    qu.append(key)
    done.add(key)

    while qu:
        p = qu.pop(0)
        print(p)
        for i in g[p]:
            if i not in done:
                qu.append(i)
                done.add(i)


# search_graph(g_dict, key)

def search_graph_all(g, key):
    qu = []
    done = set()

    qu.append((key, 0))
    done.add(key)

    while qu:
        (p, d) = qu.pop(0)
        print(p, d)
        for x in g[p]:
            if x not in done:
                qu.append((x, d + 1))
                done.add(x)


search_graph_all(g_dict, key)
