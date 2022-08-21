const router = require('express').Router();

const User = require('../../database/user');
const { deleteUserSchema, updateUserSchema } = require('./schema');
const { catchError } = require('../../utils/helper');

const getUsers = catchError(async (req, res, next) => {
  const result = await User.getUsers();

  return res.status(200).send({
    message: "Users list",
    data: result
  })
});

const updateUser = catchError(async (req, res, next) => {
  const { error, value } = updateUserSchema.validate(req.params);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  const result = await User.updateUser([value.userId]);

  if (!result.length) {
    return res.status(404).send({
      message: 'User not found'
    })
  }

  return res.status(200).send({
    message: 'User updated',
    data: result
  })
});


const deleteUser = catchError(async (req, res, next) => {
  const { error, value } = deleteUserSchema.validate(req.params);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  const result = await User.deleteUser([value.userId]);

  if (!result.length) {
    return res.status(404).send({
      message: 'User not found'
    })
  }

  return res.status(200).send({
    message: 'User dateleted',
    data: result
  })
});

router.get('/', getUsers);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;