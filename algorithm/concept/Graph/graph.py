# summer - john
# summer - justin
# summer - mike

# justin - mike
# john - justin
# justin - may
# may - kim

# tom - jerry

key = input()

graph_info = {
    "summer": ["john", "justin", "mike"],
    "john": ["summer", "justin"],
    "justin": ["summer", "john", "mike", "may"],
    "mike": ["summer", "justin"],
    "may": ["justin", "kim"],
    "kim": ["may"],
    "tom": ["jerry"],
    "jerry": ["tom"]
}


def find_fr(graph, key):
    queue = []
    done = set()

    queue.append(key)
    done.add(key)

    while queue:
        p = queue.pop(0)
        print(p)
        for x in graph[p]:
            if x not in done:
                queue.append(x)
                done.add(x)


# find_fr(graph_info, "summer")

def find_fr_tuple(graph, key):
    queue = []
    done = set()

    queue.append((key, 0))
    done.add(key)

    while queue:
        (p, d) = queue.pop(0)
        print(p, d)
        for x in graph[p]:
            if x not in done:
                print("x and d: ", x, d)
                queue.append((x, d + 1))
                done.add(x)


find_fr_tuple(graph_info, "summer")

practice_graph = {
    "1": ["2", "3"],
    "2": ["1", "4", "5"],
    "3": ["1"],
    "4": ["2"],
    "5": ["2"]
}


def find_practice_graph(g, key):
    queue = []
    done = set()

    queue.append((key, 0))
    done.add(key)

    while queue:
        (p, d) = queue.pop(0)
        print(p, d)
        for x in g[p]:
            if x not in done:
                queue.append((x, d+1))
                done.add(x)


# find_practice_graph(practice_graph, key)
