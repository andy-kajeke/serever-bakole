const { createUser, getAllUsers, getUsersByUserId, updateUser, deleteUser, loginUser } = require('./users.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token.vaildation');

router.post('/register', createUser);
router.get('/', checkToken, getAllUsers);
router.get('/:id', checkToken, getUsersByUserId);
router.patch('/update', checkToken, updateUser);
router.delete('/delete', checkToken, deleteUser);
router.post('/login', loginUser);

module.exports = router;