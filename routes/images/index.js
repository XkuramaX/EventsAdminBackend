let express = require('express')
let ImageController = require('../../controllers/images')
let loginMiddlewares = require('../../middlewares/isLoggedin')
let requireAdminRights = require('../../middlewares/isLoggedin');
let app = express()


let maxSize = 20 * 1000 * 1000
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads') 
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now() + '.' +extension)
    }

  });
  const upload = multer({ storage: storage, limits: {fileSize: maxSize} });

  
  
  app.get('/all', loginMiddlewares.requireAdminRights, async (req,res)=> {
      try {
          let controller = new ImageController(req.body, req.params, req.query, req.file)
          let response = await controller.findAll()
          if (response.success) {
              res.status(200).send(response)
          } else {
  
              res.status(500).send(response)
          }
      } catch (err) {
          res.status(500).send({
              success: false,
              message: err.message
          })
      }
  })

  app.get('/latest', loginMiddlewares.requireLogin, async (req,res) => {
    try {
        let controller = new ImageController(req.body, req.params, req.query, req.file)
        let response = await controller.getMenu()
        if (response.success) {
            res.status(200).send(response)
        } else {

            res.status(500).send(response)
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

  
  app.get('/:id', loginMiddlewares.requireLogin, async (req,res) => {
      try {
          let controller = new ImageController(req.body, req.params, req.query, req.file)
          let response = await controller.findByID()
          if (response.success) {
              res.status(200).send(response)
          } else {
  
              res.status(500).send(response)
          }
      } catch (err) {
          res.status(500).send({
              success: false,
              message: err.message
          })
      }
  })
  
  app.put('/:id', loginMiddlewares.requireLogin, async (req,res) => {
      try {
          let controller = new ImageController(req.body, req.params, req.query, req.file)
          let response = await controller.editByID()
          if (response.success) {
              res.status(200).send(response)
          } else {
  
              res.status(500).send(response)
          }
      } catch (err) {
          res.status(500).send({
              success: false,
              message: err.message
          })
      }
  })
  
  app.delete('/:id', loginMiddlewares.requireAdminRights, async (req,res) => {
      try {
          let controller = new ImageController(req.body, req.params, req.query, req.file)
          let response = await controller.deleteByID()
          console.log(response)
          if (response.success) {
              res.status(200).send(response)
          } else {
  
              res.status(500).send(response)
          }
      } catch (err) {
          res.status(500).send({
              success: false,
              message: err.message
          })
      }
  })
  
  app.post('/create', loginMiddlewares.requireLogin, upload.single("imgFile"), async (req,res) => {
      console.log(req.file)
      try {
          let controller = new ImageController(req.body, req.params, req.query, req.file)
          let response = await controller.create()
          if (response.success) {
              res.status(200).send(response)
          } else {
  
              res.status(500).send(response)
          }
      } catch (err) {
          res.status(500).send({
              success: false,
              message: err.message
          })
      }
  })

module.exports = app