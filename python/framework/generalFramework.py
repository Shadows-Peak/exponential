# I added comments just for you, Kai
# P.S. I hope you enjoy excessive

def onArgRaiseError(parameters, parameterNames, types, minValues, maxValues, exceptionValues): # General function to generalize the raise error messages to save code lines and create more readability in other functions
    '''
    Creates the raise error messages for the given paramets with the restrictions passed

    Args:
        parameters (tuple): Tuple of all parameters.
        parameterNames (list): List of all parameter names.
        types (list): List of all parameter types. (You can nest if a parameter can take multiple types) [0 -> str, 1 -> int, 2 -> float, 3 -> bool, 4 -> list, 5 -> dict, 6 -> tuple]
        minValues (list): List containing the minimum values of each parameter.
        maxValues (list): List containing the maximum values of each parameter.
        exceptionValues (list): List containing the exception values of each parameter. (You can nest if a parameter can take multiple exception values)
    '''

    def checkType(parameter, parameterType): # Function to check if the parameter is of the given type
        if parameterType == 0:
            return(type(parameter) == str)
        elif parameterType == 1:
            return(type(parameter) == int)
        elif parameterType == 2:
            return(type(parameter) == float)
        elif parameterType == 3:
            return(type(parameter) == bool)
        elif parameterType == 4:
            return(type(parameter) == list)
        elif parameterType == 5:
            return(type(parameter) == dict)
        elif parameterType == 6:
            return(type(parameter) == tuple)
    def convertTypeToName(parameterType): # Function to convert the type(s) to a string
        if type(parameterType) == list: # If the parameter can take multiple types
            typeNameStr = " or " # Joining string
            typeNameList = [] # Initialize dummy list
            for i in range(len(parameterType)): # Iterate through the types
                typeNameList.append(["a string", "an integer", "a float", "a boolean", "a list", "a dictionary", "a tuple"][parameterType[i]]) # Append the type to the list
            typeNameStr = typeNameStr.join(typeNameList) # Join the list into a string with a seperator of " or"
            return typeNameStr # Return the types as a string
        return ["a string", "an integer", "a float", "a boolean", "a list", "a dictionary", "a tuple"][parameterType] # Return the type as a string

    for i in range(len(parameters)):
        if type(types[i]) == list: # If the parameter can take multiple types
            tempCounter = 0 # Initialize a counter
            for j in range(len(types[i])): # Iterate through the types
                if not checkType(parameters[i], types[i][j]): # If the parameter is not the type
                    tempCounter += 1 # Increment the counter
            if tempCounter != len(types[i])-1: # If the counter is equal to the length of the types
                    raise TypeError(str(parameterNames[i])+" must be "+convertTypeToName(types[i])+".") # Raise the error
        elif not checkType(parameters[i],types[i]): # If the parameter is not the type (singular)
            raise TypeError(str(parameterNames[i])+" must be "+convertTypeToName(types[i])+".") # Raise the error
        if type(parameters[i]).__name__ in ["int","float"]: # If the parameter is an integer or float
            if parameters[i] < minValues[i]: # If the parameter is less than the minimum value
                if minValues[i] is False: # If the minimum value is defined as "False"
                    continue # Skip the check
                raise ValueError(str(parameterNames[i])+" must be greater than or equal to "+str(minValues[i])+".") # Raise the error
            if parameters[i] > maxValues[i]: # If the parameter is greater than the maximum value
                if maxValues[i] is False: # If the maximum value is defined as "False"
                    continue # Skip the check
                raise ValueError(str(parameterNames[i])+" must be less than or equal to "+str(maxValues[i])+".") # Raise the error
            if exceptionValues[i] is not False and parameters[i] in exceptionValues[i]: # If the parameter is an exception value
                raise ValueError(str(parameterNames[i])+" cannot be "+str(exceptionValues[i])+".") # Raise the error
        if type(parameters[i]) in [str,list,dict,tuple]: # If the parameter is a string, list, dictionary, or tuple
            if len(parameters[i]) < minValues[i]: # If the parameter's length is less than the minimum value
                if minValues[i] is False: # If the minimum value is defined as "False"
                    continue # Skip the check
                raise ValueError(str(parameterNames[i])+" must have a length greater than or equal to "+str(minValues[i])+".") # Raise the error
            if len(parameters[i]) > maxValues[i]: # If the parameter's length is greater than the maximum value
                if maxValues[i] is False: # If the maximum value is defined as "False"
                    continue # Skip the check
                raise ValueError(str(parameterNames[i])+" must have a length less than or equal to "+str(maxValues[i])+".") # Raise the error
            if exceptionValues[i] is not False and parameters[i] in exceptionValues[i]: # If the parameter is an exception value
                raise ValueError(str(parameterNames[i])+"'s length cannot be "+str(exceptionValues[i])+".") # Raise the error
