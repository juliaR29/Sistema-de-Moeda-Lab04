const pool = require('./db');

function usuarioLogado(req, res, next) {
    if (!req.cookies.token) {
        next();
    } else {
        pool.query('SELECT * FROM usuario INNER JOIN token ON usuario.email = token.email WHERE token.token = $1', [req.cookies.token], (err, result) => {
            if (err) {
                next(err);
            } else {
                if (result.rows.length > 0) {
                    req.user = result.rows[0];
                }
                next();
            }
        });
    }
}

function checkAuth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

function checkAdmin(req, res, next) {
    if (req.user && req.user.admin) {
        next();
    } else {
        res.redirect('/');
    }
}

exports.usuarioLogado = usuarioLogado;
exports.checkAuth = checkAuth;
exports.checkAdmin = checkAdmin;
