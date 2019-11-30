import requests
import json
import matplotlib.pyplot as plt
import numpy as np

URL = 'http://localhost:3000/euler/'
payload =  {'h': 0.25} 
r = requests.post(url = URL, json = payload) 
data = r.json() 
plt.plot(data['x'], data['y'])
plt.plot(data['xReal'], data['yReal'])

plt.ylabel('y')
plt.xlabel('x')
plt.show()

