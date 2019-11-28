const pool = require('../../../config/db_config');

module.exports = {
    createJob: (data, callback) => {
        //const today = new Date();
        pool.query(
            'INSERT INTO tasksubcategories(task_name, taskcategory_id, location, needed, description, phone_number, user_id, created_at) VALUE(?,?,?,?,?,?,?,?)', [
                data.task_name,
                data.taskcategory_id,
                data.location,
                data.needed,
                data.description,
                data.phone_number,
                data.user_id,
                data.created_at
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    getAllJobs: (callback) => {
        pool.query(
            'SELECT id, task_name, description, location, needed, phone_number, user_id, created_at FROM tasksubcategories', [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    getJobsById: (taskcategory_id, callback) => {
        pool.query(
            'SELECT id, task_name, description, location, needed, phone_number, user_id, created_at FROM tasksubcategories WHERE taskcategory_id = ?', [
                taskcategory_id
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    getJobsByLocation: (location, callback) => {
        pool.query(
            'SELECT id, task_name, description, location, needed, phone_number, user_id, created_at FROM tasksubcategories WHERE location = ?', [
                location
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    deleteJob: (id, callback) => {
        pool.query(
            'DELETE FROM tasksubcategories WHERE id = ?', [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        );
    },
}