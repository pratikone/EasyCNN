
# coding: utf-8

# In[1]:


# get_ipython().run_line_magic('matplotlib', 'inline')
# get_ipython().run_line_magic('load_ext', 'autoreload')
# get_ipython().run_line_magic('autoreload', '2')


# In[2]:


# In[4]:



# params = {}
# params["train_dir"] = "train"
# params["test_dir"] = "test"
# params["batch_size"] = 8
# params["img_width"] = 221
# params["img_height"] = 221


# params["loss"] = "categorical_crossentropy"
# params["metrics"] = ['top_k_categorical_accuracy', 'accuracy']
# params["initial_epoch"] = 2
# params["final_epoch"] = 4
# params["workers"] = 8
# params["step_per_epoch"] = 32
# params["train_threshold"] = 0
# params["phase1_optimizer"] = "adam"

# params["model_list"] = ["InceptionV3", "xception", "InceptionResNetV2", "DenseNet121", "DenseNet169", "DenseNet201"]
# params["dropout_list"] = [0.1, 0.2, 0.3]
# params["dense_list"] = [512, 1024]

# with open("params.json", "w") as f:
#     json.dump(params, f)
    


# In[5]:

def run() :
    
    from keras.applications.inception_v3 import InceptionV3
    from keras.applications.inception_resnet_v2 import InceptionResNetV2
    from keras.applications.xception import Xception
    from keras.applications.densenet import DenseNet121
    from keras.applications.densenet import DenseNet169
    from keras.applications.densenet import DenseNet201
    from keras.applications.resnet50 import ResNet50
    from keras.preprocessing import image
    from keras.models import Model
    from keras.layers import Dense, GlobalAveragePooling2D, Dropout
    from keras import backend as K
    from keras.preprocessing.image import ImageDataGenerator
    from keras.optimizers import SGD
    from keras.optimizers import Adam
    from keras.metrics import top_k_categorical_accuracy
    import math
    from keras.callbacks import TensorBoard
    import os
    import json
    from collections import defaultdict
    import keras
    import tensorflow as tf
    import shutil

    # In[3]:


    from tensorflow.python.client import device_lib
    print(device_lib.list_local_devices())

    params = {}

    with open("params_manual.json", "r") as f:
        params = json.load(f)

    if ("model_file" in params):
        val_datagen = ImageDataGenerator(rescale=1./255)
        params["test_size"] = sum([len(files) for r, d, files in os.walk( params["test_dir"] )])
        validation_generator = val_datagen.flow_from_directory(
            params["test_dir"],
            target_size = (params["img_width"], params["img_height"]),
            batch_size = params["batch_size"],
            shuffle = True,
            class_mode = 'categorical')

        sess = tf.Session()
        K.set_session(sess)
        params["historypath"] = "./history/current"

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
        final_history['model'] = params["model_file"]   
        with open(params["historypath"] + "/model.txt", "w") as f:
            json.dump(final_history, f)  
                
        del model
        sess.close()
        tf.reset_default_graph()

        K.clear_session()

        return
        
    params["train_size"] = sum([len(files) for r, d, files in os.walk( params["train_dir"] )])
    params["test_size"] = sum([len(files) for r, d, files in os.walk( params["test_dir"] )])
    params["classes"] = sum([len(d) for r, d, files in os.walk( params["train_dir"] )])
    params["phase2_optimizer"] = SGD(lr=0.001, momentum=0.9)
    params["dense_num"] = 2
    params["dense2"] = {"num":params["classes"], "activation":"softmax"}    


    # In[6]:


    train_datagen = ImageDataGenerator(
            rescale=1./255,
            zoom_range=0.1,
            width_shift_range=0.1,
            height_shift_range=0.1,
            horizontal_flip=True)

    train_generator = train_datagen.flow_from_directory(
            params["train_dir"],
            target_size = (params["img_width"], params["img_height"]),
            batch_size = params["batch_size"],
            shuffle = True,
            class_mode = 'categorical')

    val_datagen = ImageDataGenerator(rescale=1./255)

    validation_generator = val_datagen.flow_from_directory(
            params["test_dir"],
            target_size = (params["img_width"], params["img_height"]),
            batch_size = params["batch_size"],
            shuffle = True,
            class_mode = 'categorical')


    # In[7]:


    def create_model():
        base_model=None
        if params["model"] == "InceptionV3":
            params["train_threshold"] = 249
            base_model = InceptionV3(weights='imagenet', include_top=False, input_tensor=None, input_shape=(params["img_width"], params["img_height"], 3))
        elif params["model"] == "xception":
            params["train_threshold"] = 106
            base_model = Xception(weights='imagenet', include_top=False, input_tensor=None, input_shape=(params["img_width"], params["img_height"], 3))
        elif params["model"] == "InceptionResNetV2":
            params["train_threshold"] = 727
            base_model = InceptionResNetV2(weights='imagenet', include_top=False, input_tensor=None, input_shape=(params["img_width"], params["img_height"], 3))
        elif params["model"] == "DenseNet121":
            params["train_threshold"] = 403
            base_model = DenseNet121(weights='imagenet', include_top=False, input_tensor=None, input_shape=(params["img_width"], params["img_height"], 3))    
        elif params["model"] == "DenseNet169": 
            params["train_threshold"] = 571
            base_model = DenseNet169(weights='imagenet', include_top=False, input_tensor=None, input_shape=(params["img_width"], params["img_height"], 3))    
        elif params["model"] == "DenseNet201":
            params["train_threshold"] = 683
            base_model = DenseNet201(weights='imagenet', include_top=False, input_tensor=None, input_shape=(params["img_width"], params["img_height"], 3))    
        elif params["model"] == "ResNet50":
            params["train_threshold"] = 140
            base_model = ResNet50(weights='imagenet', include_top=False, input_tensor=None, pooling=None, input_shape=(params["img_width"], params["img_height"], 3))    
        else:
            print("unknown model")

        count = 0
        modelx = base_model.output

        while count < params["dense_num"]:
            count += 1
            string = "dense"+str(count)

            if "pool" in params[string]:
                if params[string]["pool"] == "avg_poolx":
                    modelx = GlobalAveragePooling2D(name=params[string]["pool"])(modelx)

            modelx = Dense(params[string]["num"], activation = params[string]["activation"])(modelx)
        
            if "dropout" in params[string]:
                modelx = Dropout(params[string]["dropout"])(modelx)
            
        model = Model(inputs=base_model.input, output=modelx)

        for layer in base_model.layers:
            layer.trainable = False

        model.compile(loss=params["loss"], optimizer=params["phase1_optimizer"], metrics=params["metrics"])
        
        return model


    # In[ ]:


    class log_history(keras.callbacks.Callback):
        def on_train_begin(self, logs={}):
            pass
         
        def on_batch_end(self, batch, logs={}): 
            best_model1 = {}
            best_model1['model'] = params['model']
            best_model1['acc'] = str(logs.get('acc'))
            best_model1['top_k_categorical_accuracy'] = str(logs.get('top_k_categorical_accuracy'))
            best_model1['loss'] = str(logs.get('loss'))
            with open("./history/current/" + 'model.txt', "w") as f:
                json.dump(best_model1, f)        
            params["batch"]["loss"].append(str(logs.get('loss')))        
            params["batch"]["top_k_categorical_accuracy"].append(str(logs.get('top_k_categorical_accuracy')))          
            params["batch"]["acc"].append(str(logs.get('acc')))
            #print(params["history"])
            with open(params["historypath"] + "/batch.json", "w") as f:
                json.dump(params["batch"], f)     
        
        def on_epoch_end(self, batch, logs={}):
            best_model1 = {}
            best_model1['model'] = params['model']
            best_model1['val_acc'] = str(logs.get('val_acc'))
            best_model1['val_top_k_categorical_accuracy'] = str(logs.get('val_top_k_categorical_accuracy'))
            best_model1['val_loss'] = str(logs.get('val_loss'))
            best_model1['acc'] = str(logs.get('acc'))
            best_model1['top_k_categorical_accuracy'] = str(logs.get('top_k_categorical_accuracy'))
            best_model1['loss'] = str(logs.get('loss'))
            with open("./history/current/" + 'model.txt', "w") as f:
                json.dump(best_model1, f)        
            params["history"]["val_top_k_categorical_accuracy"].append(logs.get('val_top_k_categorical_accuracy'))
            params["history"]["val_loss"].append(logs.get('val_loss'))        
            params["history"]["loss"].append(logs.get('loss'))        
            params["history"]["top_k_categorical_accuracy"].append(logs.get('top_k_categorical_accuracy'))          
            params["history"]["acc"].append(logs.get('acc'))
            params["history"]["val_acc"].append(logs.get('val_acc')) 
            #print(params["history"])
            with open(params["historypath"] + "/epoch.json", "w") as f:
                json.dump(params["history"], f)         


    # In[ ]:


    max_accuracy = 0
    for model_name in params["model_list"]:
        params["model"] = model_name
        best_accuracy = 0

        if os.path.exists('./history/current'):
            shutil.rmtree('./history/current')        
        for dropout_num in params["dropout_list"]:
            for dense_num in params["dense_list"]:
                sess = tf.Session()
                K.set_session(sess)
                params["dense1"] = {"num":dense_num, "dropout":dropout_num, "pool":"avg_poolx", "activation":"relu"}
                params["tensorpath"] = "./tensor/" + params['model'] + "/" + "dense_"+str(dense_num) + "_dropout_" + str(dropout_num)
                params["historypath"] = "./history/current" + "/" + "dense_"+str(dense_num) + "_dropout_" + str(dropout_num)
                tbd = TensorBoard(log_dir=params["tensorpath"] ,  batch_size=params["batch_size"], write_graph=True )
                params["history"] = {}
                params["history"]["val_top_k_categorical_accuracy"] = []
                params["history"]["val_loss"] = []
                params["history"]["loss"] = []
                params["history"]["top_k_categorical_accuracy"] = []
                params["history"]["acc"] = []
                params["history"]["val_acc"] = []
                params["batch"] = {}
                params["batch"]["loss"] = []
                params["batch"]["acc"] = []
                params["batch"]["top_k_categorical_accuracy"] = []            
                model = create_model()
                epoch_history = log_history()
                if not os.path.exists(params['historypath']):
                    os.makedirs(params['historypath'])
                
                history = model.fit_generator(generator=train_generator,
                             steps_per_epoch = params["step_per_epoch"],
                             epochs = params["initial_epoch"],
                             use_multiprocessing=False,
                             max_queue_size=10,
                             workers = params["workers"],     
                             validation_data = validation_generator,
                             callbacks=[tbd, epoch_history],
                             validation_steps = math.ceil(params["test_size"]  / params["batch_size"]))  
                
                for layer in model.layers[:params["train_threshold"]]:
                   layer.trainable = False
                for layer in model.layers[params["train_threshold"]:]:
                   layer.trainable = True
                params["phase2_optimizer"] = SGD(lr=0.001, momentum=0.9)                       
                model.compile(loss=params["loss"], optimizer=params["phase2_optimizer"], metrics=params["metrics"])
                history1 = model.fit_generator(generator=train_generator,
                             steps_per_epoch = params["step_per_epoch"] ,
                             epochs = params["final_epoch"] ,
                             initial_epoch= params["initial_epoch"] ,
                             use_multiprocessing=False,
                             max_queue_size=10,
                             workers = params["workers"],                                  
                             validation_data = validation_generator,
                             callbacks=[tbd, epoch_history],
                             validation_steps = math.ceil(params["test_size"]  / params["batch_size"]))

                if not os.path.exists("./history/best/" + params["model"]):
                    os.makedirs("./history/best/" + params["model"])
                
                if (history1.history['val_acc'][-1] > best_accuracy):
                    best_accuracy = history1.history['val_acc'][-1]
                    model.save("model_" + params["model"] + ".h5")
                    shutil.copyfile(params["historypath"] + "/epoch.json", "./history/best/" + params["model"] +"/epoch.json")
                    shutil.copyfile(params["historypath"] + "/batch.json", "./history/best/" + params["model"] +"/batch.json")                

                if (history1.history['val_acc'][-1] > max_accuracy):
                    max_accuracy = history1.history['val_acc'][-1]
                    model.save("best_model" + ".h5")
                    best_model = {}
                    best_model['model'] = params["model"]
                    best_model["val_acc"] = history1.history['val_acc'][-1]
                    best_model['val_top_k_categorical_accuracy'] = history1.history['val_top_k_categorical_accuracy'][-1]
                    best_model['val_loss'] = history1.history['val_loss'][-1]
                    best_model["acc"] = history1.history['acc'][-1]
                    best_model["top_k_categorical_accuracy"] = history1.history['top_k_categorical_accuracy'][-1]
                    best_model["loss"] = history1.history['loss'][-1]
                    with open("./history/best/" + 'model.txt', "w") as f:
                        json.dump(best_model, f)                             

                del model
                sess.close()
                tf.reset_default_graph()

                K.clear_session()


if __name__ == '__main__' :
    run()

