const db = require("../database/models")
const Users = db.Users;
const Module = db.Module;
const authRoutes = require('../routes/authRoutes')

const index = async (req, res) => {
    try {
        const { page, size, title } = req.query;
        var condition = title ? { username: { [Op.like]: `%${title}%` } } : null;
        const { limit, offset } = getPagination(page, size);
        const result = await Users.findAndCountAll({
            where: condition,
            limit,
            offset,
            order: [
                ['id', 'DESC'],
                ['username', 'ASC'],
            ],
        });

        const response = getPagingData(result, page, limit);
        res.send(response);
    } catch (err) {
        res.json(err).status(422)
    }
}

const store = async (req, res) => {
    try {
        const store = await Users.create(req.body)
        res.json(store).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const destroy = (req, res) => {
    const id = req.params.id
    Users.findByPk(id).then((row) => {
        if (row) {
            row.destroy()
            msg = "success delete"
        } else {
            msg = `${id} not found in db`
        }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({
            message: err.message
        });
    })
}

const getPagination = (page, size) => {
    const limit = size ? +size : 1;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

module.exports = { index, destroy, store }