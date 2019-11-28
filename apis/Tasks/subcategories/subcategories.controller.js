const { createJob, getAllJobs, getJobsById, getJobsByLocation, deleteJob } = require('./subcategories.services');

module.exports = {
    /////////////////////////////////////////Create task Api///////////////////////////////////////////
    createJob: (req, res) => {
        let today = new Date();
        const body = req.body;

        createJob(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Database connection failed'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Job created successfully',
                categories: results
            });
        });
    },

    /////////////////////////////////////////Get all task  Api////////////////////////////////////////
    getAllJobs: (req, res) => {
        getAllJobs((err, results) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json({
                success: true,
                jobs: results
            })
        })
    },

    /////////////////////////////////////////Get task by id Api//////////////////////////////////////////////
    getJobsById: (req, res) => {
        const taskcategory_id = req.params.taskcategory_id;
        getJobsById(taskcategory_id, (err, results) => {
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
                jobs: results
            })
        })
    },

    /////////////////////////////////////////Get task by location Api//////////////////////////////////////////////
    getJobsByLocation: (req, res) => {
        const location = req.params.location;
        getJobsByLocation(location, (err, results) => {
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
                jobs: results
            })
        })
    },


    /////////////////////////////////////////Delete task Api//////////////////////////////////////////////
    deleteJob: (req, res) => {
        const data = req.params.id;
        deleteJob(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (!results) {
                return res.json({
                    success: true,
                    message: 'Deleted Job successfully'
                })
            }
            return res.json({
                success: false,
                message: 'Failed to delete task'
            })
        })
    },
}