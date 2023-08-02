let model = require('../model/teams');



class Teams {
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
            let response = await model.findById(this.params.id).populate("");
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

    async getAllOfHeader(header){
        try {
            console.log(1)
            let allTypes = await model.find({header: header});
            let Item = new item();
            let response = []
            for(let i = 0; i< allTypes.length; i++) {
                
                let resp = await Item.getAllOfType(allTypes[i]._id)
                console.log("Here")
                if (resp.success == true) {
                    response.push({type: allTypes[i].name, response: resp.response})
                }
            }

            return {
                success: true,
                response: response
            }

        } catch(err) {
            return {
                success: false,
                message: err.message
            }
        }
    }


}

module.exports = Teams