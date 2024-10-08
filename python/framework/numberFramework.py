class LargeNumber:
    import sys, math
    global max_intsize, nextpower_maxint
    max_intsize = sys.maxsize # Maximum size a integer can be 
    nextpower_maxint = 10**math.ceil(math.log10(max_intsize)) # Next power of 10 after max_intsize
    power10gap_maxint = nextpower_maxint - max_intsize # Gap between max_intsize and next power of 10
    def __init__(self, component1,component2=[0,0],component3=[0,0]):
        '''
        System for going up to 1 Octodecillion (10^57). Takes advantage of int overflow amount and its next power of 10 (19) to store large numbers.
        '''
        if not type(component1) == list and not type(component2) == list and not type(component3) == list:
            raise TypeError("Components must be lists [standard value, overflow to fill power of 10].")
        if (not type(component1[0]) == float or not type(component1[0]) == int) and (not type(component1[1]) == float or not type(component1[10]) == int):
            raise TypeError("Component 1's inputs must be a float or integer.")
        if (not type(component2[0]) == int or not type(component2[1]) == int) and (not type(component2[0]) == int or not type(component2[1]) == int):
            raise TypeError("Components 2 and 3's inputs must be integers.")
        if component1[0] > LargeNumber.max_intsize:
            raise ValueError("Component 1's standard value must be less than or equal to the maximum integer size.")
        if component1[1] > LargeNumber.power10gap_maxint:
            raise ValueError("Component 1's overflow value must be less than or equal to the maximum integer size.")
        self.components = (component1, component2, component3)
    
    def compact(self):
        # Convert the smaller numbers into the larger ones if needed, or vice versa if thats how the system ends up working
        print("for later")

    def __str__(self):
        return self.number_str

    def __add__(self, other):
        if not isinstance(other, LargeNumber):
            raise TypeError("Operands must be LargeNumber instances.")
        return LargeNumber(str(int(self.number_str) + int(other.number_str)))

    def __sub__(self, other):
        if not isinstance(other, LargeNumber):
            raise TypeError("Operands must be LargeNumber instances.")
        return LargeNumber(str(int(self.number_str) - int(other.number_str)))

    def __mul__(self, other):
        if not isinstance(other, LargeNumber):
            raise TypeError("Operands must be LargeNumber instances.")
        return LargeNumber(str(int(self.number_str) * int(other.number_str)))

    def __truediv__(self, other):
        if not isinstance(other, LargeNumber):
            raise TypeError("Operands must be LargeNumber instances.")
        return LargeNumber(str(int(self.number_str) // int(other.number_str)))

def abbreviate(number, decimals=3, digits=False):
    import math, masterList
    from generalFramework import onArgRaiseError
    '''
    Outputs a string representation of a number with a specified number of decimal places and/or digits.

    Args:
        number (int or LargeNumber): Input value.
        decimals (int): Number of decimal places to round to. (OPTIONAL)
        digits (int): Number of digits to display from the number (Floors past ones place). (OPTIONAL)
    '''

    onArgRaiseError((number,decimals,digits),("number","decimals","digits"),[[1,2,4],1,[1,3]],[False,0,False],[False,False,False],[False,False,False])

    #if not type(number) == int and not type(number) == LargeNumber:
    #    raise TypeError("Number must be an integer or LargeNumber instance.")
    #if not type(decimals) == int:
    #    raise TypeError("Decimals must be an integer.")
    #if not type(digits) == int or not type(digits) == bool:
    #    raise TypeError("Digits must be an integer or boolean.")
    #if decimals < 0:
    #    raise ValueError("Decimals must be a non-negative integer.")
    
    degree = math.floor(math.log10(number)/3)*3

    if type(number) == int:
        abbrevSymbol = masterList.abbreviations[degree]
    number/=10**degree
    number = math.floor(number*(10**decimals))/(10**decimals)
    if digits:
        oldDigits = len(str(number)) - (1 if decimals > 0 else 0)-decimals
        print(number)
        print(oldDigits)
        number = str(number)[:(digits+((1 if (digits // decimals > 0) else 0) if (decimals > 0) else 0))]
        curDigits = len(str(number))
        print(number)
        print(curDigits)
        number = float(number)*(10**(oldDigits - curDigits))
        print(number)
        print((digits+((1 if (digits // decimals > 0) else 0) if (decimals > 0) else 0)))
    if decimals == 0:
        number = int(number)
    if digits and len(str(number)) - ((1 if (digits // decimals > 0) else 0) if (decimals > 0) else 0) > digits:
        number = int(number)
    return str(number)+abbrevSymbol

print(abbreviate(254254266260,5,4))

# Too lazy to fix this rn

# And too lazy to fix this rn too
# print(abbreviate(2525426260,-1)) works meaning generalFramework.py has an issue with minimum value checking