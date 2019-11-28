const pool = require('../../config/db_config');

module.exports = {
    create: (data, callback) => {
        pool.query(
            'INSERT INTO users(first_name, last_name, email, phone_number, password) VALUE(?,?,?,?,?)', [
                data.first_name,
                data.last_name,
                data.email,
                data.phone_number,
                data.password
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        )
    },

    getAllUsers: (callback) => {
        pool.query(
            'SELECT id, first_name, last_name, email, phone_number, password FROM users', [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    getUsersByUserId: (id, callback) => {
        pool.query(
            'SELECT id, first_name, last_name, email, phone_number, password FROM users WHERE id = ?', [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        );
    },

    updateUser: (data, callback) => {
        pool.query(
            'UPDATE users set first_name = ?, last_name = ?, email = ?, phone_number = ?, password = ? WHERE id = ?', [
                data.first_name,
                data.last_name,
                data.email,
                data.phone_number,
                data.password,
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

    deleteUser: (id, callback) => {
        pool.query(
            'DELETE FROM users WHERE id = ?', [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        );
    },

    /////////////////////////////////////////Login Api//////////////////////////////////////////////
    getUsersByUserEmail: (email, callback) => {
        pool.query(
            'SELECT * FROM users WHERE email = ?', [email],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        );
    }
}