let express = require('express')
let MembersController = require('../../controllers/member')
let loginMiddlewares = require('../../middlewares/isLoggedin')

let app = express()

app.get('/all', loginMiddlewares.requireAdminRights, async (req,res)=> {
    try {
        let controller = new MembersController(req.body, req.params, req.query, req.file)
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

app.get('/:id',loginMiddlewares.requireLogin, async (req,res) => {
    try {
        let controller = new MembersController(req.body, req.params, req.query, req.file)
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
        let controller = new MembersController(req.body, req.params, req.query, req.file)
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

app.delete('/:id',loginMiddlewares.requireSuperAdminRights, async (req,res) => {
    try {
        let controller = new MembersController(req.body, req.params, req.query, req.file)
        let response = await controller.deleteByID()
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

app.post('/create', async (req,res) => {
    try {
        console.log(req.body)
        let controller = new MembersController(req.body, req.params, req.query, req.file)
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

app.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        let controller = new MembersController(req.body, req.params, req.query, req.file)
        let response = await controller.login()
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

app.post('/makeAdmin/:id', loginMiddlewares.requireAdminRights, async (req, res) => {
    try {
        let controller = new MembersController(req.body, req.params, req.query, req.file)
        let response = await controller.makeAdminByID();
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

app.post('/makeSuperAdmin/:id', loginMiddlewares.requireSuperAdminRights, async (req, res) => {
    try {
        let controller = new MembersController(req.body, req.params, req.query, req.file)
        let response = await controller.makeAdminByID();
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