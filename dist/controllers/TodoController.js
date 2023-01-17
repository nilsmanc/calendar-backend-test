import TodoModel from '../models/Todo';
export const getAll = async (req, res) => {
    try {
        const todos = await TodoModel.find().populate('profile').exec();
        res.json(todos);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get todos',
        });
    }
};
export const getOne = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await TodoModel.findById(todoId).exec();
        res.json(todo);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get todo',
        });
    }
};
export const getProfileTodos = async (req, res) => {
    const profileId = req.params.id;
    try {
        const todos = await TodoModel.find({ profile: { _id: profileId } })
            .populate('profile')
            .exec();
        res.json(todos);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get todos',
        });
    }
};
export const create = async (req, res) => {
    try {
        const doc = new TodoModel({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            file: req.body.file,
            done: req.body.done,
            profile: req.body.profile,
        });
        const todo = await doc.save();
        res.json(todo);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create todo',
        });
    }
};
export const update = async (req, res) => {
    try {
        const todoId = req.params.id;
        await TodoModel.updateOne({
            _id: todoId,
        }, {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            file: req.body.file,
            done: req.body.done,
        });
        res.json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update todo',
        });
    }
};
export const remove = async (req, res) => {
    try {
        const todoId = req.params.id;
        TodoModel.findOneAndDelete({
            _id: todoId,
        }, (err, doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Todo not found',
                });
            }
            res.json({
                success: true,
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete todo',
        });
    }
};
