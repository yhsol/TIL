N = int(input())

arr = []
for _ in range(N):
    arr.append(int(input()))


def counting_sort(arr, k):
    c = [0] * k
    sorted_arr = [0] * len(arr)

    for i in arr:
        c[i] += 1

    for i in range(1, k):
        c[i] += c[i-1]

    for i in range(len(arr)):
        sorted_arr[c[arr[i]] - 1] = arr[i]
        c[arr[i]] -= 1

    return sorted_arr


print(counting_sort(arr, N))
