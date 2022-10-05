const db = require("../database/models")
const Employe = db.Employe;

const index = async (req, res) => {
    try {
        const { page, size, title } = req.query;
        var condition = title ? { employe_name: { [Op.like]: `%${title}%` } } : null;

        const { limit, offset } = getPagination(page, size);
        const result = await Employe.findAndCountAll({
            where: condition,
            limit,
            offset,
        })
        const response = getPagingData(result, page, limit);
        res.send(response);
        // res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
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

const store = async (req, res) => {
    try {
        const save = await Employe.create(req.body)
        res.json(save).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const show = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Employe.findByPk(id)
        const result = data ? data : `${id} not found in db`
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const update = (req, res) => {
    Employe.findByPk(req.params.id).then((emp) => {
        if (emp) {
            emp.update(req.body)
            msg = emp
        } else {
            msg = `${req.params.id} not found in db`
        }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({ msg: err.message });
    });
}

const destroy = (req, res) => {
    let msg
    Employe.findByPk(req.params.id).then((row) => {
        if (row) {
            row.destroy()
            msg = "success deleted"
        } else {
            msg = `${req.params.id} not found in db`
        }
        res.json({ message: err.message })
    }).catch((err) => {
        res.json({ message: err.message })
    })
}

module.exports = {
    index, show, store,
    update, destroy
}