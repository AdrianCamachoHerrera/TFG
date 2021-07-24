def handle(req):
    n = int(req)

    return str(fib(n))

def fib(n):
    if n==0:
        return 0
    if n==1:
        return 1
    return fib(n-1) + fib(n-2)