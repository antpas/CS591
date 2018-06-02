var express = require('express');
var router = express.Router();

router.get('/:inputParam', function (req, res) {
    inputVar = req.params.inputParam
    inputLength = inputVar.length

    var data = {
        string: inputVar,
        length: inputLength
    };

    res.send(data)
  })

router.post('/', function (req, res) {
    res.send(req.body)
})


module.exports = router;