def abbreviate(number, decimals=3, digits=False, scientific=False):
    '''
    Outputs a string representation of a number with a specified number of decimal places and/or digits.

    Args:
        number (int or LargeNumber): Input value.
        decimals (int): Number of decimal places to round to. (OPTIONAL)
        digits (int or bool): Number of digits to display from the number (Floors past ones place). [Takes priority over decimals parameter] (OPTIONAL)
        scientific (bool): Whether to use scientific notation. (OPTIONAL)
    '''
    import math, masterList
    from generalFramework import onArgRaiseError

    onArgRaiseError((number,decimals,digits,scientific),("number","decimals","digits","scientific"),[[1,2,4],1,[1,3],3],[False,0,1,False],[False,False,False,False],[False,False,False,False])

    if scientific:
        if digits:
            return f"{number:.{digits - 1}e}"
        else:
            return f"{number:.{decimals}e}"

    degree = 0

    if number != 0:
        degree = math.floor(math.log10(abs(number)) / 3) * 3
        degree = min(degree, max(masterList.abbreviations.keys()))
        number /= 10 ** degree

    if digits:
        number = round(number, digits - int(math.floor(math.log10(abs(number)))) - 1)
        if number.is_integer():
            number = int(number)
    else:
        number = round(number, decimals)
        if number.is_integer():
            number = int(number)

    abbrev_symbol = masterList.abbreviations[degree]
    return f"{number}{abbrev_symbol}"

# Feel free to change how our softcap works
def softcap(function, XlimitPoint=False, YlimitPoint=False, baseDecay=1, decayExponent=1, hardExponent=1): # https://www.desmos.com/calculator/ofsodmsbbm
    '''
    Applies a softcap to the given function.

    Args:
        function (lambda): The function to apply the softcap to.
        XlimitPoint (float, optional): The x-value at which the softcap starts to apply.
        YlimitPoint (float, optional): The y-value at which the softcap starts to apply.
        baseDecay (float): The base decay value.
        decayExponent (float): The exponent for the decay function.
        hardExponent (float): The growing exponent for the decay function.
    '''
    if XlimitPoint and YlimitPoint:
        raise ValueError("Only specify one limit point.")
    if not XlimitPoint and not YlimitPoint:
        raise ValueError("You must specify a limit point.")
    
    import scipy.optimize
    from generalFramework import onArgRaiseError, is_lambda
    limitPoint = XlimitPoint if XlimitPoint else YlimitPoint
    onArgRaiseError((function, limitPoint, baseDecay, decayExponent, hardExponent), 
                    ("function", "limitPoint", "baseDecay", "decayExponent", "hardExponent"), 
                    [7, [1,2], [1,2], [1,2], [1,2]], 
                    [False, False, False, False, False], 
                    [False, False, False, False, False], 
                    [False, False, [0,1], False, False])

    def softcapped_function(number):
        if XlimitPoint:
            if number <= XlimitPoint:
                return function(number)
            else:
                return function(XlimitPoint) + ((1 + baseDecay) ** (-decayExponent * ((number - XlimitPoint) ** hardExponent))) * function(number)
        elif YlimitPoint:
            result = function(number)
            target_value = result
            result2 = scipy.optimize.fsolve(lambda x: function(x) - target_value, 0)
            if result <= YlimitPoint:
                return result
            else:
                return YlimitPoint + ((1 + baseDecay) ** (-decayExponent * ((number - result2[0]) ** hardExponent))) * result

    return lambda x: softcapped_function(x)

def hardcap(function, XlimitPoint=False, YlimitPoint=False):
    '''
    Applies a hardcap to the given function.

    Args:
        function (lambda): The function to apply the hardcap to.
        XlimitPoint (float, optional): The x-value at which the hardcap starts to apply.
        YlimitPoint (float, optional): The y-value at which the hardcap starts to apply.
    '''
    if XlimitPoint and YlimitPoint:
        raise ValueError("Only specify one limit point.")
    if not XlimitPoint and not YlimitPoint:
        raise ValueError("You must specify a limit point.")
    from generalFramework import onArgRaiseError, is_lambda
    limitPoint = XlimitPoint if XlimitPoint else YlimitPoint
    onArgRaiseError((function, limitPoint), ("function", "limitPoint"), [7, [1,2]], [False, False], [False, False], [False, False])

    
    if XlimitPoint:
        def hardcapped_function(number):
            if number <= XlimitPoint:
                return function(number)
            else:
                return function(XlimitPoint)
    elif YlimitPoint:
        def hardcapped_function(number):
            result = function(number)
            if result <= YlimitPoint:
                return result
            else:
                return YlimitPoint

    return lambda x: hardcapped_function(x)

def exponential(base, exponentialFactor=1, totalFactor=1, exponentialOffset=0, TotalOffset=0):
    '''
    Computes the result of an exponential function with the given parameters.

    Args:
        number (float): The input value to the exponential function.
        base (float): The base of the exponential function.
        exponentialFactor (float, optional): The exponent multiplier.
        totalFactor (float, optional): The total multiplier applied to the result.
        exponentialOffset (float, optional): The offset added to the exponent.
        TotalOffset (float, optional): The offset added to the final result.
    '''
    return lambda x : totalFactor * (base ** (x * exponentialFactor + exponentialOffset)) + TotalOffset

testFunc = softcap(exponential(base=2,exponentialFactor=2),YlimitPoint=16)
testFunc2 = softcap(exponential(base=2,exponentialFactor=2),XlimitPoint=2)
testFunc3 = exponential(base=2,exponentialFactor=2)
print(testFunc(3))
print(testFunc2(3))
print(testFunc3(3))