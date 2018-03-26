import os
from sklearn.cross_validation import train_test_split

for i in os.listdir('caltech_100'):
	X = y = os.listdir('caltech_100/'+i)
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=0)

	if not os.path.exists('train/'+i):
    		os.makedirs('train/'+i)

	if not os.path.exists('test/'+i):
    		os.makedirs('test/'+i)

	for x in X_train:
		os.rename('caltech_100/'+i+'/'+x, 'train/'+i+'/'+x)
	for x in X_test:
		os.rename('caltech_100/'+i+'/'+x, 'test/'+i+'/'+x)