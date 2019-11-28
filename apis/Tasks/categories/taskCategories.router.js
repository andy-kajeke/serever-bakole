const { createTaskCategory, getAllTasks, getTaskById, updateTask, deleteTask } = require('./taskCategories.controller');
const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./task_icons");
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post('/create', upload.single('task_image'), createTaskCategory);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.patch('/update', updateTask);
router.delete('/delete/:id', deleteTask);

module.exports = router;