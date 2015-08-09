/**
 * Mi9Controller
 *
 * @description :: Server-side logic for managing mi9s
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * `Mi9Controller.index()`
     */
    index: function(req, res) {
        //sails.log.debug(req.body)
        if (req.body == undefined || req.body.payload == undefined) {
            res.status(400)
            res.send({
                "error": "Could not decode request: JSON parsing failed"
            })

        } else {
          var json = []
          for(var i in req.body.payload){
            //sails.log.debug(i)
            var src = req.body.payload[i]
            if (src.episodeCount && src.episodeCount>0){
              var obj = {}
              if(src.image && src.image.showImage){
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

        
    }

}
