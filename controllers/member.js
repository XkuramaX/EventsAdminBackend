let model = require('../model/members');
let bcrypt = require('bcrypt')
let salt = 11
let jwt = require('jsonwebtoken')

class Members {
    constructor (payload, params, query, file) {
        this.payload = payload;
        this.params = params;
        this.query = query;
        this.file = file
    }

    async create() {
        try {
            let form = this.payload
            //encrypting the password
            console.log(form);
            form.password = await bcrypt.hash(form.password, salt)
            let response = await model.create(this.payload);
            if (response) {
                return {
                    success: true,
                    message: "Successfully created!",
                    response: response
                }
            }
            return {
                success: false,
                message: "Error during creation!"
            } 
        } catch (err) {
            return {
                success: false,
                message: err.message
            }
        }
    }

    async findAll() {
        try {
            let response = await model.find();
            if (response) {
                return {
                    success: true,
                    message: "Successfully found!",
                    response: response
                }
            }
            return {
                success: false,
                message: "Error during search!"
            } 
        } catch (err) {
            return {
                success: false,
                message: err.message
            }
        }
    }

    async findByID() {
        try {
            let response = await model.findById(this.params.id).populate("image");
            if (response) {
                return {
                    success: true,
                    message: "Successfully Found!",
                    response: response
                }
            }
            return {
                success: false,
                message: "Error! Cannot be found!"
            } 
        } catch (err) {
            return {
                success: false,
                message: err.message
            }
        }
    }

    async deleteByID() {
        try {
            let response = await model.findByIdAndDelete(this.params.id)
            if (response) {
                return {
                    success: true,
                    message: "Successfully deleted!",
                    response: response
                }
            }
            return {
                success: false,
                message: "Error during deletion!"
            } 
        } catch (err) {
            return {
                success: false,
                message: err.message
            }
        }
    }

    async editByID() {
        try {
            let response = await model.findById(this.params.id)
            if (response) {
                for( let key in this.payload) {
                    if (key != "isAdmin" && key != "isSuper") {
                        if (key == "password") {
                            response[key] = await bcrypt.hash(this.payload[key], salt)
                        } else {
                            response[key] = this.payload[key]
                        }
                    }
                }
                response = await response.save();
                response = await model.findById(this.params.id).populate("image");
                return {
                    success: true,
                    message: "Successfully edited!",
                    response: response
                }
            }
            return {
                success: false,
                message: "Cannot be found!"
            } 
        } catch (err) {
            return {
                success: false,
                message: err.message
            }
        }
    }

    async makeAdminByID() {
        try {
            let response = await model.findById(this.params.id)
            if (response) {
                response.isAdmin = true;
                await response.save()
                return {
                    success: true,
                    response: response,
                    message: "Successfully edited!",
                }
            }
            return {
                success: false,
                message: "Cannot be found!"
            } 
        } catch (err) {
            return {
                success: false,
                message: err.message
            }
        }
    }

    async makeSuperAdminByID() {
        try {
            let response = await model.findById(this.params.id)
            if (response) {
                response.isAdmin = true;
                response.isSuperAdmin = true;
                await response.save()
                return {
                    success: true,
                    response: response,
                    message: "Successfully edited!",
                }
            }
            return {
                success: false,
                message: "Cannot be found!"
            } 
        } catch (err) {
            return {
                success: false,
                message: err.message
            }
        }
    }
    
    async login() {
        try {
            let response = await model.findOne({username: this.payload.username})
            if (response) {
                let match = await bcrypt.compare(this.payload.password, response.password)
                if (match) {
                    let key = {
                        id : response._id,
                        username: response.username
                    }
                    let jwt_token = await jwt.sign(key, process.env.JWT_SECRET, {})
                    return {
                        success: true,
                        message: "Login Successful!",
                        response: jwt_token,
                        isAdmin: response.isAdmin,
                        isSuperAdmin: response.isSuperAdmin,
                        id: response._id
                    }
                }
                return {
                    success: false,
                    message: "Login unsuccessful! Wrong Password!",
                }
            }
        } catch (err) {
            return {
                success: false,
                message: err.message
            }
        }
    }

}

module.exports = Members
