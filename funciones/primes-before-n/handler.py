
def handle(req):
    
    n = int(req)
    i = 0
    primes = []

    while (i < n):
        if (isPrime(i)):
            primes.append(i) 
        i = i+1

    return str(primes)

def isPrime(n):
    if(n<2):
        return False
    i = 2
    div = 0
    while(i<n):
        if(n%i == 0):
            return False
        i = i+1
    return True