const pool = require('../../../config/db_config');

module.exports = {
    createTask: (data, callback) => {
        //const today = new Date();
        pool.query(
            'INSERT INTO taskcategories(task_name, task_image) VALUE(?,?)', [
                data.task_name,
                data.task_image,
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    getAllTasks: (callback) => {
        pool.query(
            'SELECT id, task_name, task_image FROM taskcategories', [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    getTaskById: (id, callback) => {
        pool.query(
            'SELECT id, task_name, task_image FROM taskcategories WHERE id = ?', [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        );
    },

    updateTask: (data, callback) => {
        pool.query(
            'UPDATE taskcategories set task_name = ?, task_image = ? WHERE id = ?', [
                data.task_name,
                data.task_image,
                data.id
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        )
    },

    deleteTask: (id, callback) => {
        pool.query(
            'DELETE FROM taskcategories WHERE id = ?', [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        );
    },
}