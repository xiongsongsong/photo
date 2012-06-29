/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title:'test' });
};

exports.init = function (app) {

    /*首页*/
    app.get('/', exports.index);

    /*上传*/
    app.post('/upload', require('./upload').upload);

};
