from regression_nn import *

def train(email, data):

    x = []; y = []
    for elem in data:
        kcal = elem['kcal']
        time = elem['time']
        x.append(time)
        y.append(kcal)

    x = array_to_array_of_arrays(x)
    y = array_to_array_of_arrays(y)

    scaler_x = StandardScaler()
    scaler_y = StandardScaler()

    x=scaler_x.fit_transform(x)
    y=scaler_y.fit_transform(y)

    seed = 7
    np.random.seed(seed)
    estimator = KerasRegressor(build_fn=baseline_model, nb_epoch=50, batch_size=5, verbose=0)

    kfold = KFold(n_splits=5, random_state=seed)
    results = cross_val_score(estimator, x, y, cv=kfold)

    estimator.fit(x,y)

    path = 'data/'
    directory = path+email
    if not os.path.exists(directory):
        os.makedirs(directory)

    estimator.model.save(path+email+'/estimator.h5')
    joblib.dump(scaler_x, path+email+'/scaler_x.pkl')
    joblib.dump(scaler_y, path+email+'/scaler_y.pkl')


def predict(email, args):

    path = 'data/'
    estimator = load_model(path+email+'/estimator.h5')
    scaler_x = joblib.load(path+email+'/scaler_x.pkl')
    scaler_y = joblib.load(path+email+'/scaler_y.pkl')    
    args = scaler_x.transform(args)
    result = estimator.predict(args)
    result = scaler_y.inverse_transform(result)
    return np.reshape(result, len(result))