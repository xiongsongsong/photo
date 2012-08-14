/**
 * Created with JetBrains WebStorm.
 * User: 松松
 * Date: 12-6-29
 * Time: 上午11:58
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs'),
    path = require('path');


var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017, {});
var fed = new mongodb.Db('wall-works', server, {});

var Client;
exports.dbClient = function (func) {
    if (Client !== undefined) {
        console.log('Database connection is alive\t' + new Date().toLocaleTimeString());
        func();
    } else {
        fed.open(function (error, client) {
            console.log('The database is open!\t' + new Date().toLocaleTimeString());
            Client = client;
            func();
        });
    }
};

fed.on('close', function () {
    console.log('Database connection is disconnected!\t' + new Date().toLocaleTimeString());
    Client = undefined;
});

exports.upload = function (req, res) {
    res.header('Content-Type', 'text/json;charset=utf-8');
    var fileData = req.files.Filedata,
        tempPath = fileData.path,
        baseName = path.basename(tempPath),
        targetPath = 'storage\\' + baseName;

    var works = Object.create(null);
    works._id = baseName;
    works.name = fileData.name;
    works.size = fileData.size;
    works.owner = decodeURIComponent(req.body['username']);
    works.timestamp = Date.now();

    fs.rename(tempPath, targetPath, function (err) {
        if (!err) {
            exports.dbClient(function () {
                var collection = new mongodb.Collection(Client, 'works');
                collection.insert(works, {safe:true},
                    function (err, docs) {
                        if (err) {
                            res.end(JSON.stringify('error'), undefined, '\t');
                        } else {
                            console.log(docs);
                            res.end(JSON.stringify({'status':true}, undefined, '\t'));
                        }
                    });
            });
        } else {
            res.end(JSON.stringify({status:'Error'}));
        }
    });
};
