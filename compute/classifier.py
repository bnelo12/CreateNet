import pandas as pd
import numpy as np
from sys import argv
import tensorflow as tf

import json


def loadData(network):
    features_to_remove = []
    features = []
    for feature in network['features']['features']:
        if feature['enabled'] == False:
            features_to_remove.append(feature['name'])
        else:
            features.append(feature['name'])
    outputs = []
    for output in network['outputs']['outputs']:
        if output['enabled'] == True:
            outputs.append(output['name'])
    dataframe = pd.read_csv(network['file_name'])
    dataframe = dataframe.drop(['index', 'price', 'sq_price'], axis=1)
    return dataframe, features, outputs

def parseNetwork(filename):
    network = json.loads(open(filename).read())
    return network


def run():
    network = parseNetwork(argv[1])
    dataframe, features, outputs = loadData(network)
    print(dataframe)
    inputX = dataframe.loc[:, features].as_matrix()
    inputY = dataframe.loc[:, outputs].as_matrix()
    learning_rate = 0.000001
    training_epochs = 2000
    display_step = 50
    n_samples = inputY.size

if __name__ == '__main__':
    run()

