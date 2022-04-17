const db = require('../models');
const { createHash } = require('crypto');
const users = db.users;
const Op = db.Sequelize.Op;

const genHash = (pass) => {
    return createHash('sha256').update(pass).digest('hex');
}

exports.create = (req, res) => {
    if(!req.body.email) {
        res.status(400).send({
            message: 'Email can not be empty'
        });
        return;
    }
    const user = {
        email: req.body.email,
        password: genHash(req.body.password)
    }
    user.create(user).then(data => {
        res.send(data);
    })
    .catch(e => {
        res.status(500).send({
            message: e.message
        });
    });
}

exports.findAll = (req, res) => {
    const email = req.body.email;
    var users= email ? { email: { [Op.like]: `%${email}%` } } : null;
    Users.findAll({ where: users })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message
        });
      });
}

exports.findOne = (req, res) => {
    const id = req.body.id;
    Users.findByPk(id).then(data => {
        if(data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: 'Can`t find user'
            })
        }
    })
    .catch(e => {
        res.status(500).send({
            message: `${e}`
        });
    });
}

exports.update = (req, res) => {
    const id = req.body.id;
    Users.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if(num === 1) {
            res.send({
                message: 'Update successfully'
            });
        }
        else {
            res.send({
                message: 'Can`t update'
            })
        }
    })
    .catch(e => {
        res.status(500).send({
            message: `${e}`
        });
    });
}

exports.delete = (req, res) => {

}

exports.deleteAll = (req, res) => {

}