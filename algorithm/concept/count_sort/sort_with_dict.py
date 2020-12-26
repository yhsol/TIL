N = int(input())

arr = []
temp = []
result_dict = {}

for _ in range(N):
    n = int(input())

    if n in result_dict:
        result_dict[n] += 1
    else:
        result_dict[n] = 1

for i in result_dict:
    for j in range(result_dict[i]):
        temp.append(i)

print(sorted(temp))
