const { createJob, getAllJobs, getJobsById, getJobsByLocation, deleteJob } = require('./subcategories.controller');
const router = require('express').Router();

router.post('/create', createJob);
router.get('/', getAllJobs);
router.get('/:taskcategory_id', getJobsById);
router.get('/location/:location', getJobsByLocation);
router.delete('/delete/:id', deleteJob);

module.exports = router;