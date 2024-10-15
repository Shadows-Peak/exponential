# This is the main brain that prevents many attacks and conserves the values we wish to see

import sys
import os

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Get the parent directory
parent_dir = os.path.dirname(current_dir)

# Add the parent directory to the system path
sys.path.append(parent_dir)

# Get the data directory
data_dir = os.path.join(parent_dir, 'data')

# Add the data directory to the system path
sys.path.append(data_dir)

# Now you can import modules from the parent directory
import placeholder # Ignore line; this works

def simulateGameTick(data,n=1):
    '''
    Returns the data that it believes would be achieved after N (*1) game ticks.
    '''
    data['base'] += data['incrementer'] * data['multiplier'] * n
    return data