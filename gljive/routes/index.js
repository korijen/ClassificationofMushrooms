
var express = require('express');
var request = require('request');
var router = express.Router();

router.post('/process-shrooms', function(req, res, next) {

    
    var test = {
        "Inputs": {
            "input1": {
            "ColumnNames": [
                "cap-shape",
                "cap-surface",
                "cap-color",
                "odor",
                "gill-spacing",
                "habitat"
            ],
            "Values": [
                [
                req.body["cap-shape"],
                req.body["cap-surface"],
                req.body["cap-color"],
                req.body["odor"],
                req.body["gill-spacing"],
                req.body["habitat"]
                ]
            ]
            }
        },
        "GlobalParameters": {}
    };

    var sendable = JSON.stringify(test);

    var clientServerOptions = {
        uri: 'https://ussouthcentral.services.azureml.net/workspaces/f5d3b541d5164dc792b96c0e3bab6236/services/e425230164f14cfd88d68b551335814e/execute?api-version=2.0&details=true',
        body: sendable,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer 0Lk6xggNNaelmVFfS41HpKwTshhFLl77CpYLZpNKeksxHeI76KjKNyrRL1PSLAeCy2BVzr8V3G2F+AMCXgj3Bw=='
        }
    }

    request(clientServerOptions, function (error, response) {
        var resp = JSON.parse(response.body);
        var final = JSON.parse(response.body).Results.output1.value.Values[0];
        res.render('index', { results : true, result : final });
    });


});

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', {  result : ["b","f","n","a","c","l","e","0"] });
});

module.exports = router;
