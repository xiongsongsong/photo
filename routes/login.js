/**
 * Created with JetBrains WebStorm.
 * User: 松松
 * Date: 12-6-30
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */

var iconv = require('iconv-lite');
var http = require('http');
var BufferHelper = require('bufferhelper');

exports.login = function (req, res) {
    var content = {
        'UNAME':req.body.UNAME,
        'PASSWORD':req.body.PASSWORD
    };

    var options = {
        host:'192.168.1.240',
        port:80,
        path:'/logincheck.php',
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Connection':'Close'
        }
    };

    var request = http.request(options, function (response) {
        var bufferHelper = new BufferHelper();
        console.log(response.headers);
        response.on('data', function (chunk) {
            bufferHelper.concat(chunk);
        });
        response.on('end', function () {
            var html = iconv.decode(bufferHelper.toBuffer(), 'GBK').toString();
            if (html.indexOf('location="general"') > -1) {
                /*req.session.username = user;
                req.session.userid = docs[0]._id;*/
                res.write('{"status":"success"}');
            } else {
                res.write('{"status":"error"}');
            }
            res.end();
        });
    });

    request.write(Object.keys(content).map(function (item) {
        return item + '=' + content[item];
    }).join('&'));
    request.end();

};
