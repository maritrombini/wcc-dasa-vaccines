const express = require('express')
const router = express.Router()
const controller = require('../controllers/vaccineController')

router.post('/', controller.createVaccine)

router.get('/', controller.getAllVaccines)

router.get('/:id', controller.getVaccine)

router.get('/manufacturer/:manufacturer', controller.getByManufacturer)

router.put('/:id', controller.updateVaccine)

router.patch('/:id/vaccinated', controller.updateVaccinated)

router.delete('/:id', controller.deleteVaccine)

module.exports = router
