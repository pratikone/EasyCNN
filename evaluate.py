
# coding: utf-8

# In[1]:


from keras.preprocessing import image
from keras.models import Model
from keras import backend as K
from keras.preprocessing.image import ImageDataGenerator
import math
import os
import json
import keras
import tensorflow as tf


# In[2]:


from tensorflow.python.client import device_lib
print(device_lib.list_local_devices())


# In[3]:



params = {}
params["test_dir"] = "test"
params["batch_size"] = 64
params["img_width"] = 221
params["img_height"] = 221
params["workers"] = 8
params["model_file"] = "best_model.h5"

with open("params_evaluate.json", "w") as f:
    json.dump(params, f)


# In[4]:


params = {}

with open("params_evaluate.json", "r") as f:
    params = json.load(f)

params["test_size"] = sum([len(files) for r, d, files in os.walk( params["test_dir"] )])


# In[5]:


val_datagen = ImageDataGenerator(rescale=1./255)

validation_generator = val_datagen.flow_from_directory(
        params["test_dir"],
        target_size = (params["img_width"], params["img_height"]),
        batch_size = params["batch_size"],
        shuffle = True,
        class_mode = 'categorical')


# In[6]:



sess = tf.Session()
K.set_session(sess)
params["historypath"] = "./history/evaluation"

if not os.path.exists(params['historypath']):
    os.makedirs(params['historypath'])
            
model = keras.models.load_model(params["model_file"])
history = model.evaluate_generator(generator = validation_generator,
                                steps=math.ceil(params["test_size"]  / params["batch_size"]),
                                max_queue_size=10, 
                                workers=params["workers"],
                                use_multiprocessing=False)            
final_history = {}
count = 0
for i in model.metrics_names:
    final_history[i] = history[count]
    count += 1
with open(params["historypath"] + "/model.txt", "w") as f:
        json.dump(final_history, f)  
                
del model
sess.close()
tf.reset_default_graph()

K.clear_session()

