/**
 * Created with JetBrains WebStorm.
 * User: 松松
 * Date: 12-6-29
 * Time: 上午11:58
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs'),
    path = require('path'),
    $ = require("mongous").Mongous;

exports.upload = function (req, res) {
    res.header('Content-Type', 'text/json;charset=utf-8');

    var fileData = req.files.Filedata,
        tempPath = fileData.path,
        baseName = path.basename(tempPath),
        targetPath = 'storage\\' + baseName;

    var photo = Object.create(null);
    photo.name = fileData.name;
    photo.size = fileData.size;
    photo.fileName = baseName;
    photo.timeStamp = Date.now();


    fs.rename(tempPath, targetPath, function (err) {
        if (err) {
            res.end(JSON.stringify({status:'Error'}));
        } else {
            fs.unlink(tempPath, function (err) {
                if (err) {
                    res.end(JSON.stringify({status:'UnLink Error'}));
                } else {
                    $("database.collection").save(photo);
                    /*$("database.collection").find({}, function (result) {
                     res.send(JSON.stringify(result.documents[0]));
                     });*/
                    res.end(JSON.stringify({status:'Save success'}));
                }
            });
        }
    });
};
