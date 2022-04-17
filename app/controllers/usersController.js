const db = require('../models');
const { createHash } = require('crypto');
const Users = db.users;
const Op = db.Sequelize.Op;

const genHash = (pass) => {
    return createHash('sha256').update(pass).digest('hex');
}

exports.create = async (req, res) => {
    try {
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
        const data = await Users.create(user);
        res.send(data);
    }
    catch(e) {
        res.status(500).send({
            message: e.message
        });
    }
}

exports.findAll = async (req, res) => {
    try {
        const email = req.query.email;
        var users= email ? { email: { [Op.like]: `%${email}%` } } : null;
        const data = await Users.findAll({ where: users });
        res.send(data);
    }
    catch(e) {
        res.status(500).send({
          message:
            e.message
        });
    };
}

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Users.findByPk(id);
        if(data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: 'Can`t find user'
            })
        }
    }
    catch(e) {
        res.status(500).send({
            message: `${e}`
        });
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        if(req.body.password) {
            req.body.password = genHash(req.body.password);
        }
        const data = await Users.update(req.body, {
            where: { id: id }
        })
        res.send(`${data} id success changed`);
    }
    catch(e) {
        res.status(500).send({
            message: `${e}`
        });
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Users.destroy({
            where: { id: id }
        });
        res.send(`${data} el delete`);
    }
    catch(e) {
        res.status(500).send({
            message: `can\`t delete ${id}`
        });
    }
}

exports.deleteAll = async (req, res) => {
    try {
        const data = await Users.destroy({
            where: {},
            truncate: false
        });
        res.send({ message: `${data} was delete`});
    }
    catch(e) {
        res.status(500).send(e);
    }
}