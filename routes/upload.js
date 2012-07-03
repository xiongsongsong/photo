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
    photo._id = baseName;
    photo.name = fileData.name;
    photo.size = fileData.size;
    photo.owner = decodeURIComponent(req.body['username']);
    photo.timeStamp = Date.now();


    fs.rename(tempPath, targetPath, function (err) {
        if (!err) {
            $("database.collection").save(photo);
            $("database.collection").find({ _id:photo._id }, function (result) {
                console.log(JSON.stringify(result.documents[result.documents.length - 1]));
                res.end('{}')
            });
        } else {
            res.end(JSON.stringify({status:'Error'}));
        }
    });
};
