var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users')

// /* GET users listing. */
router.get('/', usersController.getAllUsers)
router.get('/:id', usersController.getUserById)
router.post('/', usersController.createUser)
router.put('/:id', usersController.updateUser)
router.patch('/:id', usersController.patchUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router;
