import sys, os, simulator

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

DATA = placeholder.data

EXPECTED = simulator.simulateGameTick(DATA, 1)

def gameTick():
    '''
    Runs a game tick.
    '''
    data = placeholder.data
    data['base'] += data['incrementer'] * data['multiplier']
    data = placeholder.data

if DATA != EXPECTED:
    print("ERROR.")
else: 
    print("SUCCESS.")