var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.get('/', function(req, res) {
    res.status(400)
    res.send({
        "error": "Could not decode request: JSON parsing failed"
    })
})

app.post('/', bodyParser.json(), function(req, res) {
    if (req.body == undefined || req.body.payload == undefined) {
        res.status(400)
        res.send({
            "error": "Could not decode request: JSON parsing failed"
        })

    } else {
        var json = []
        for (var i in req.body.payload) {
            //sails.log.debug(i)
            var src = req.body.payload[i]
            if (src.episodeCount && src.episodeCount > 0) {
                var obj = {}
                if (src.image && src.image.showImage) {
                    obj.image = src.image.showImage
                }
                obj.slug = src.slug
                obj.title = src.title
                json.push(obj)
            }

        }
        return res.json({
            response: json
        });
    }
})

app.use(function(err, req, res, next) {
    res.status(400)
    res.send({
        "error": "Could not decode request: JSON parsing failed"
    })
});

var server = app.listen(process.env.PORT || 3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('app listening at http://%s:%s', host, port)

})
