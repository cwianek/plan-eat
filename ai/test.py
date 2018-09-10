from regression_nn import *

def test():
    n = 7
    daily_calories = 2500
    calories_distribution=[25,10,35,10,20]
    hours_distribution=[(6,8),(8,12),(12,16),(16,20),(20,24)]

    x = []; y = []
    for calories_percentage, hours in zip(calories_distribution,hours_distribution):
        calories = daily_calories*calories_percentage/100
        x_sample, y_sample = generate_samples(calories,hours,n)
        x.extend(x_sample)
        y.extend(y_sample)

    add_noise(daily_calories,hours_distribution,n*2,x,y)

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

    args = np.linspace(6,24,30)
    args = array_to_array_of_arrays(args)
    args = scaler_x.transform(args)

    result = estimator.predict(args)

    ax1 = plt.subplot(121)
    ax1.scatter(scaler_x.inverse_transform(x),scaler_y.inverse_transform(y))
    ax1.set_ylim([0,1000])
    ax2 = plt.subplot(122)
    ax2.scatter(scaler_x.inverse_transform(args),scaler_y.inverse_transform(result))
    ax2.set_ylim([0,1000])
    plt.show()