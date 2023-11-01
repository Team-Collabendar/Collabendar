const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
  return res.status(200).json({})
})

//create user
router.post('/', (req, res) => {
  return res.status(200).json({})
})
  
//PATCH users --> remove calendar ForeignID from a user's profile in database - when they click toremove that calendar from their profileapp.patch('user', (req, res) => {
router.patch('/', (req, res) => {
  return res.status(200).json({})
})

router.delete('/', (req, res) => {
  return res.status(200).json({})
})





module.exports = router;
  