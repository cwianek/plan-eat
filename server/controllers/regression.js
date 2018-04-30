const axios = require('axios');
const qs = require('qs');

const URL = "http://127.0.0.1:5000"

exports.predict = function (req, res, next) {
  axios.post(URL + '/predict', {
    email: req.body.email,
    data: req.body.data
  })
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error.data);
    });
}

exports.train = function (req, res, next) {
  const userData = [
    { 'time': 6, 'kcal': 300 },
    { 'time': 7, 'kcal': 400 },
    { 'time': 8, 'kcal': 200 },
    { 'time': 10, 'kcal': 500 },
    { 'time': 14, 'kcal': 200 },
    { 'time': 16, 'kcal': 100 },
    { 'time': 19, 'kcal': 700 },
    { 'time': 20, 'kcal': 900 },
    { 'time': 22, 'kcal': 1100 },
  ];
  axios.post(URL + '/train', {
    email: req.body.email,
    data: userData
  })
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error.data);
    });
}