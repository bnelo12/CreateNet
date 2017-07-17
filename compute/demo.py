import pandas as pd
import numpy as np

import tensorflow as tf

dataframe = pd.read_csv("house.csv")


inputX = dataframe.loc[:, ['price']].as_matrix()
inputY = dataframe.loc[:, ['price']].as_matrix()

learning_rate = .0001
training_epochs = 2000
display_step = 1
n_samples = inputY.size

x = tf.placeholder(tf.float32, [None, 1])
W = tf.Variable(tf.zeros([1, 1]))
layer_1 = tf.matmul(x, W)
y = tf.placeholder(tf.float32, [None,1])

cost = tf.reduce_sum(tf.pow(y - layer_1, 2))/(2*n_samples)
optimizer = tf.train.GradientDescentOptimizer(learning_rate).minimize(cost)
init = tf.initialize_all_variables()
sess = tf.Session()
sess.run(init)

for i in range(training_epochs):  
    sess.run(optimizer, feed_dict={x: inputX, y: inputY}) # Take a gradient descent step using our inputs and labels

    # That's all! The rest of the cell just outputs debug messages. 
    # Display logs per epoch step
    if (i) % display_step == 0:
        cc = sess.run(cost, feed_dict={x: inputX, y:inputY})
        print ("Training step: {}, cost= {:.9f}".format(i, cc)) #, \"W=", sess.run(W), "b=", sess.run(b)

print ("Optimization Finished!")
training_cost = sess.run(cost, feed_dict={x: inputX, y: inputY})

sess.run(y, feed_dict={x: inputX })
sess.run(tf.nn.softmax([1., 2.]))
