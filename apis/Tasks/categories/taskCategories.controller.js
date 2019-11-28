const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('./taskCategories.service');

module.exports = {
    /////////////////////////////////////////Create task category Api///////////////////////////////////////////
    createTaskCategory: (req, res) => {
        let today = new Date();
        const body = {
            task_name: req.body.task_name,
            task_image: 'http://localhost:1010/task_icons/' + req.file.originalname,
            created_at: today
        };
        createTask(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Database connection failed'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Task category added successfully',
                categories: results
            });
        });
    },

    /////////////////////////////////////////Get all task categories Api////////////////////////////////////////
    getAllTasks: (req, res) => {
        getAllTasks((err, results) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json({
                success: true,
                categories: results
            })
        })
    },

    /////////////////////////////////////////Get task by id Api//////////////////////////////////////////////
    getTaskById: (req, res) => {
        const id = req.params.id;
        getTaskById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (!results) {
                return res.json({
                    success: false,
                    message: 'Record not found'
                });
            }
            return res.json({
                success: true,
                category: results
            })
        })
    },

    /////////////////////////////////////////Update task info Api//////////////////////////////////////////////
    updateTask: (req, res) => {
        const body = req.body;

        updateTask(body, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            }
            if (!results) {
                return res.json({
                    success: false,
                    message: 'Update task info failed'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Updated task info successfully'
            });
        });
    },

    /////////////////////////////////////////Delete task Api//////////////////////////////////////////////
    deleteTask: (req, res) => {
        const data = req.params.id;
        deleteTask(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (!results) {
                return res.json({
                    success: true,
                    message: 'Deleted task successfully'
                })
            }
            return res.json({
                success: false,
                message: 'Failed to delete task'
            })
        })
    },

}