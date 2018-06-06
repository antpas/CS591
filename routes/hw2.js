var express = require('express');
var router = express.Router();

var Stringinput = require('../models/list');

//Check DB for string, if not present add it to DB
router.get('/:inputParam', function (req, res) {
    
    inputVar = req.params.inputParam

    Stringinput.count({string: inputVar}, function (err, count) {
        if (err) console.log("Error on count function")
        console.log('Count: %d', count);

        if(count == 0){
            inputLength = inputVar.length

            var data = {
                string: inputVar,
                length: inputLength
            };

            Stringinput.findOneAndUpdate(data, data, {upsert:true}, function(err, doc){
                if (err) return res.send(500, { error: err });
                console.log("Succesfully saved");
                res.send(data)
            });
        }
        else if(count > 0){
            Stringinput.find({string: inputVar}, function (err, doc) {
                if (err) console.log("Error on find function")
                var outputFromDB = {
                    string: doc[0].string,
                    length: doc[0].length
                };
                console.log("Successfully read from DB")
                res.send(outputFromDB)
              });
        }
      });
})

//Return all strings currently stored in DB
router.get('/', function (req, res) {
    Stringinput.find({}, function (err, doc) {
        if (err) console.log("Error on find function")
        console.log("Successfully read from DB")
        res.send(doc)
      });
})

router.post('/', function (req, res) {
   
    inputVar = req.body.inputParam

    function isEmptyObject(obj) {
        return !Object.keys(obj).length;
    }

    if(isEmptyObject(inputVar) || err){
        var errorText = {
            Error: "No string provided"
        };
        res.send(errorText)
    }

    else{
        Stringinput.count({string: inputVar}, function (err, count) {
            if (err) console.log("Error on count function")
            console.log('Count: %d', count);

            if(count == 0){
                inputLength = inputVar.length

                var data = {
                    string: inputVar,
                    length: inputLength
                };

                Stringinput.findOneAndUpdate(data, data, {upsert:true}, function(err, doc){
                    if (err) return res.send(500, { error: err });
                    console.log("Succesfully saved");
                    res.send(data)
                });
            }
            else if(count > 0){
                Stringinput.find({string: inputVar}, function (err, doc) {
                    if (err) console.log("Error on find function")
                    var outputFromDB = {
                        string: doc[0].string,
                        length: doc[0].length
                    };
                    console.log("Successfully read from DB")
                    res.send(outputFromDB)
                });
            }
        });
    }
})

router.delete('/', function (req, res) {
    inputVar = req.body.inputParam

    Stringinput.count({string: inputVar}, function (err, count) {
        if (err) console.log("Error on count function")
        console.log('Count: %d', count);

        if(count == 0){
            inputLength = inputVar.length

            var noStringText = {
                Response: "String not found"
            };
            res.send(noStringText)
        }
        else if(count > 0){
            Stringinput.deleteOne({string: inputVar}, function (err, doc) {
                if (err) console.log("Error on find function")
                console.log("Successfully deleted")  
                var deletedResp = {
                    Response: "Sucessfully deleted"
                };
                res.send(deletedResp)
            });
        }
    });

})

module.exports = router;
