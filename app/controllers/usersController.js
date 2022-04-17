const db = require('../models');
const { createHash } = require('crypto');
const Users = db.users;
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
    Users.create(user).then(data => {
        res.send(data);
    })
    .catch(e => {
        res.status(500).send({
            message: e.message
        });
    });
}

exports.findAll = (req, res) => {
    const email = req.query.email;
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
    const id = req.params.id;
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
    const id = req.params.id;
    if(req.body.password) {
        req.body.password = genHash(req.body.password);
    }
    Users.update(req.body, {
        where: { id: id }
    })
    .then(data => {
        res.send(`${data} id success changed`);
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