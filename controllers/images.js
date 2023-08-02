let model = require('../model/images');
let fs = require('fs');
let path = require('path')
let dir = __dirname
let dir2 = path.dirname(dir)


class Images {
    constructor (payload, params, query, file) {
        this.payload = payload;
        this.params = params;
        this.query = query;
        this.file = file
    }

    async create() {
        try {
            if(this.file && this.file.filename){
                let obj = {
                    url : this.file.filename
                }
                let response = await model.create(obj);

                if (response) {
                    return {
                        success: true,
                        message: "Successfully created!",
                        response: response
                    }
                }

                response = await model.create(obj);
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
            } else {
                return {
                    success: false,
                    message: "No file is detected!"
                }
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
            let page = this.query.page || 0;
            let items = this.query.items || 9;
            let response = await model.find().sort({createdAt: -1}).skip(Number(page) * Number(items)).limit(Number(items));
            let count = await model.countDocuments();
            if (response) {
                return {
                    success: true,
                    message: "Successfully found!",
                    response: response,
                    count: count
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
            let response = await model.findById(this.params.id);
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
            console.log("here")
            let response = await model.findById(this.params.id)
            if(response) {
                fs.unlink(dir2+'/uploads/'+response.url, (err)=>{
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(response.url, "is deleted!")
                    }
                })
                response = await model.findByIdAndDelete(this.params.id)
                if (response) {
                    return {
                        success: true,
                        message: "Successfully deleted!",
                        response: response
                    }
                }
            } else {
                return {
                    success: false,
                    message: "No image found with that id!"
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
                    response[key] = this.payload[key]
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

    async getMenu() {
        try {
            let response = await model.findOne(this.params.id);
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


}

module.exports = Images
