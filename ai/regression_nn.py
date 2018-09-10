from keras.models import Sequential
from keras.layers import Dense
from keras.wrappers.scikit_learn import KerasRegressor
from keras.models import load_model
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler, scale
from sklearn.externals import joblib

import matplotlib.pylab as plt
import numpy as np
import random
import os

def baseline_model():
	model = Sequential()
	model.add(Dense(1024, input_dim=1, init='normal', activation='relu'))    
	model.add(Dense(256, init='normal', activation='relu'))
	model.add(Dense(32, init='normal', activation='relu'))
	model.add(Dense(1, init='normal'))
	model.compile(loss='mean_squared_error', optimizer='adam')
	return model


def array_to_array_of_arrays(arr):
    wrapper = []
    for el in arr:
        wrapper.append([el])
    return wrapper

def generate_samples(calories,hours,n):
    return np.linspace(hours[0],hours[1],n), [random.random()*calories/2 + calories/2 for i in range(n)]

def add_noise(daily_calories, hours_distribution, n, x ,y):
    start = hours_distribution[0][0]
    stop = hours_distribution[len(hours_distribution)-1][1]
    x1 = np.linspace(start,stop,n)
    y1 =  [random.random()*daily_calories/10 + daily_calories/10 for i in range(n)]
    x.extend(x1)
    y.extend(y1)