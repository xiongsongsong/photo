/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', {
        title:'杰杰图片分享系统',
        isLogin:req.cookies['username'] !== undefined
    });
};

exports.init = function (app) {

    app.get('/', exports.index);

    app.post('/upload', require('./upload').upload);

    app.post('/login', require('./login').login);

};
