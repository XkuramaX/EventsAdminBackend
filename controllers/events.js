let model = require('../model/events');
let bcrypt = require('bcrypt')
let salt = 11

class Events {
    constructor (payload, params, query, file) {
        this.payload = payload;
        this.params = params;
        this.query = query;
        this.file = file
    }

    async create() {
        try {
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
            let response = await model.find().populate("type").populate("images").populate("registrations").populate("registrations.member").populate("registrations.transaction").populate("registrations.transaction.image");
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
            let response = await model.findById(this.params.id).populate("registrations");
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
                    if (key == "password") {
                        response[key] = await bcrypt.hash(this.payload[key], salt)
                    } else {
                        response[key] = this.payload[key]
                    }
                    
                }
                response = await response.save()
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
}

module.exports = Events
