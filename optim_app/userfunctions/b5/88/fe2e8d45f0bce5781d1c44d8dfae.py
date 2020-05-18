import sys

def foo(a, b):
    return a*b

def main():
    if len(sys.argv) == 3:
        return foo(int(sys.argv[1]), int(sys.argv[2]))
    elif len(sys.argv) == 2:
        return sys.argv[1]
    elif len(sys.argv) == 1:
        return 0

print(main())
