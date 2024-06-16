const express = require('express');
const {
  createUser,
  getUser,
  getUserById,
  updateUserById,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUser);

module.exports = router;
