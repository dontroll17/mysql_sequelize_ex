module.exports = app => {
    const users = require('../controllers/usersController');
    const router = require('express').Router();
    //New user
    router.post('/', users.create);
    router.get('/', users.findAll);
    router.get('/:id', users.findOne);
    router.put('/:id', users.update);
    app.use(router);
}