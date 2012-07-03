/**
 * Created with JetBrains WebStorm.
 * User: 松松
 * Date: 12-6-30
 * Time: 下午2:07
 * To change this template use File | Settings | File Templates.
 */


exports.login = function (req, res) {
    res.header('Content-Type', 'text/json; charset=utf-8');
    if (req.body.username !== undefined) {
        res.cookie('username', encodeURIComponent(req.body.username), { maxAge:900000 });
        res.end(JSON.stringify({status:'已成功保存帐号痕迹'}));
    } else {
        res.end(JSON.stringify({status:'无法获取用户名'}));
    }
};
