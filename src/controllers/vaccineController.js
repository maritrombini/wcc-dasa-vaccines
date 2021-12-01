const Vaccine = require('../models/Vaccine')

const createVaccine = async (req, res) => {
  const { name, expected_date, manufacturer, vaccinated } = req.body
  try {
    const vaccine = await Vaccine.create({
      name,
      expected_date,
      manufacturer,
      vaccinated
    })
    console.log(`Vacina ${vaccine.name} cadastrada com sucesso.`)
    res.status(201).send(vaccine)
  } catch (error) {
    messageError(res, error)
  }
}

const messageError = (res, error) => {
  res.status(500).send({ message: error.message })
}

const getAllVaccines = async (req, res) => {
  const vaccinated = req.query.vaccinated
  try {
    const where = vaccinated ? { where: { vaccinated } } : {}
    const vaccines = await Vaccine.findAll({
      where,
      order: [['id', 'ASC']]
    })

    if (vaccines && vaccines.length > 0) {
      res.status(200).send(vaccines)
    } else {
      res.status(204).send()
    }
  } catch (error) {
    messageError(res, error)
  }
}

const getVaccine = async (req, res) => {
  const vaccineId = req.params.id
  try {
    const vaccine = await Vaccine.findOne({
      where: { id: vaccineId }
    })
    if (vaccine) {
      res.status(200).send(vaccine)
    } else {
      res.status(404).send({
        message: `Vacina de Id ${vaccineId} não foi localizada na Base de Dados.`
      })
    }
  } catch (error) {
    messageError(res, error)
  }
}

const getByManufacturer = async (req, res) => {
  const vaccineManufacturer = req.params.manufacturer
  try {
    const manufacturer = await Vaccine.findOne({
      where: { manufacturer: vaccineManufacturer }
    })
    if (manufacturer) {
      res.status(200).send(manufacturer)
    } else {
      res.status(404).send({
        message: `Fabricante ${vaccineManufacturer} não foi localizado na Base de Dados.`
      })
    }
  } catch (error) {
    messageError(res, error)
  }
}

const updateVaccine = async (req, res) => {
  const vaccineId = req.params.id
  const { name, expected_date, manufacturer, vaccinated } = req.body
  try {
    const rowsUpdated = await Vaccine.update(
      { name, expected_date, manufacturer, vaccinated },
      { where: { id: vaccineId } }
    )
    if (rowsUpdated && rowsUpdated[0] > 0) {
      res.status(200).send({
        message: `Vacina com o Id ${vaccineId} atualizada com sucesso.`
      })
    } else {
      res.status(404).send({
        message: `Vacina com o Id ${vaccineId} não localizada na Base de Dados para atualização.`
      })
    }
  } catch (error) {
    messageError(res, error)
  }
}

const updateVaccinated = async (req, res) => {
  const vaccineId = req.params.id
  const vaccinated = req.body.vaccinated

  try {
    const updatedRows = await Vaccine.update(
      { vaccinated },
      { where: { id: vaccineId } }
    )
    if (updatedRows && updatedRows[0] > 0) {
      res.status(200).send({
        message: `${updatedRows[0]} vacina(s) atualizada com sucesso.`
      })
    } else {
      res.status(404).send({
        message: `Vacina com o Id ${vaccineId} não localizada na Base  de Dados.`
      })
    }
  } catch (error) {
    messageError(res, error)
  }
}

const deleteVaccine = async (req, res) => {
  const vaccineId = req.params.id
  try {
    const rowDeleted = await Vaccine.destroy({ where: { id: vaccineId } })
    if (rowDeleted) {
      res
        .status(200)
        .send({ message: `${rowDeleted} Vacina deletada com sucesso.` })
    } else {
      res.status(404).send({
        message: `Vacina com o Id ${vaccineId} não foi localizada na Base de Dados.`
      })
    }
  } catch (error) {
    messageError(res, error)
  }
}

module.exports = {
  createVaccine,
  getAllVaccines,
  getVaccine,
  updateVaccine,
  updateVaccinated,
  deleteVaccine,
  getByManufacturer
}
