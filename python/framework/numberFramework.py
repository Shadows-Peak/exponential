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

# Example usage:
print(abbreviate(2540000000000660205040000000000000042662602540000000000066020500000000000000000000000000000000000000000000426626025400000000000660205000000000000000000000000000000000000000000004266260254000000000006602050000000000000000000000000000000000000000000042662602540000000000066020500000000000000000000000000000000000000000000426626025400000000000660205000000000000000000000000000000000000000000004266260, 5, 3))  # Output: "254.254B"
print(abbreviate(254254266260, 10))     # Output: "254.25B"
#print(abbreviate(254254266260, 10,0))     # Throws error
print(abbreviate(254254266260, digits=4))  # Output: "254.3B"
print(abbreviate(2542542000066260, 5, scientific=True))  # Output: "2.54250e+15"
print(abbreviate(2542542000066260, digits=4, scientific=True))  # Output: "2.542e+15"