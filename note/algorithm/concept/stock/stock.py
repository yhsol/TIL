stock = [10300, 9600, 9800, 8200, 7800, 8300, 9500, 9800, 10200, 9500]


def max_profit(prices):
    n = len(prices)
    max_profit = 0

    for i in range(0, n-1):
        for j in range(i+1, n):
            profit = prices[j] - prices[i]

            if profit > max_profit:
                max_profit = profit

    return max_profit


# print(max_profit(stock))


def max_profit_two(prices):
    max = 0
    min_price = prices[0]

    for i in range(1, len(prices)):
        if prices[i] - min_price > max:
            max = prices[i] - min_price
        if prices[i] < min_price:
            min_price = prices[i]

    return max


print(max_profit_two(stock))
