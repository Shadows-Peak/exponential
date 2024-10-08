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

def softcap(function, limitPoint, baseDecay, decayExponent, hardExponent): # https://www.desmos.com/calculator/ofsodmsbbm
    '''
    Applies a softcap to the given function.

    Args:
        function (lambda): The function to apply the softcap to.
        limitPoint (float): The point at which the softcap starts to apply.
        baseDecay (float): The base decay value.
        decayExponent (float): The exponent for the decay function.
        hardExponent (float): The growing exponent for the decay function.
    '''
    from generalFramework import onArgRaiseError, is_lambda

    onArgRaiseError((function, limitPoint, baseDecay, decayExponent, hardExponent), 
                    ("function", "limitPoint", "baseDecay", "decayExponent", "hardExponent"), 
                    [7, 2, 2, 2, 2], 
                    [False, False, False, False, False], 
                    [False, False, False, False, False], 
                    [False, False, False, False, False])

    def softcapped_function(number):
        if number <= limitPoint:
            return function(number)
        else:
            return function(limitPoint) + ((1 + baseDecay) ** (-decayExponent * ((number - limitPoint) ** hardExponent))) * function(number)

    return lambda x: softcapped_function(x)

# HAVE NOT TESTED SOFTCAP AT ALL
