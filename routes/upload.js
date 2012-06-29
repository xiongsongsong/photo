/**
 * Created with JetBrains WebStorm.
 * User: 松松
 * Date: 12-6-29
 * Time: 上午11:58
 * To change this template use File | Settings | File Templates.
 */

exports.upload = function (req, res) {
    console.log(req.files.upfile);
    res.header('Content-Type', 'text/plain;charset=utf-8');
    res.end(JSON.stringify(req.body, undefined, '\t'));
};
