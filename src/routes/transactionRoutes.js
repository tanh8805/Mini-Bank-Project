const express = require('express')
const { withdrawController, depositController, transferController, getHistoryController } = require("../controllers/transactionController")
const jwtFilter = require("../middleware/jwtFilter")
const router = express.Router()

router.post('/with-draw', jwtFilter, withdrawController)
router.post('/deposit', jwtFilter, depositController)
router.post('/transfer', jwtFilter, transferController)
router.get('/history', jwtFilter, getHistoryController)

module.exports = router