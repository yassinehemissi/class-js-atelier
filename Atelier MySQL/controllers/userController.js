const { createUser, getUser, getUsers, deleteUser, updateUser} = require("../services/userService");
const { validateUser, userSchema } = require("../middleware/userValidate");
const express = require("express");

const router = express.Router();

router.get('/', getUsers);

router.get('/create', createUser); 

router.post('/create', validateUser(userSchema), createUser);

router.get('/:id', getUser)

router.post('/:id', validateUser(userSchema), updateUser);

router.post('/:id/delete', deleteUser);


module.exports = router;





