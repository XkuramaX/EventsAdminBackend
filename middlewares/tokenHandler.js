const jwt = require('jsonwebtoken');
const Members = require('../controllers/member');


module.exports  = {
    generateToken : async(_id,access="user") => {
        const token = await jwt.sign({id : _id, access: access}, process.env.JWT_SECRET);
        return token;
    },
    verifyToken : async(token) => {
        try{
            console.log(token)
            const response = await jwt.verify(token,process.env.JWT_SECRET);
            console.log("Verify token: ",response)
            return({
                success:true,
                statusCode:200,
                user:response
            });
        } 
        catch(err){
            return({
                success:false,
                statusCode:401,
                message:'You must be loggedIn!'
            });
        }
    },
    verifyTokenForAdmin : async(token) => {
        try{
            console.log(token)
            const response = await jwt.verify(token,process.env.JWT_SECRET);
            console.log("Verify token: ",response)
            if (response.id) {
                const memberController = new Members({}, response, {}, {});
                const member = await memberController.findByID();
                console.log(member);
                if (member.response && member.response.isAdmin == true) {
                    return({
                        success:true,
                        statusCode:200,
                        user:response
                    });
                } else {
                    return({
                        success:false,
                        statusCode:401,
                        message:'You must be an Admin!'
                    });
                }
            }
            return({
                success:false,
                statusCode:401,
                message:'You must be an Admin!'
            });
        } 
        catch(err){
            return({
                success:false,
                statusCode:401,
                message:'You must be loggedIn!'
            });
        }
    },
    verifyTokenForSuperAdmin : async(token) => {
        try{
            console.log(token)
            const response = await jwt.verify(token,process.env.JWT_SECRET);
            console.log("Verify token: ",response)
            if (response.id) {
                const memberController = new Members({}, response, {}, {});
                const member = await memberController.findByID();
                if (member.response && member.response.isSuper == true) {
                    console.log("Super")
                    return({
                        success:true,
                        statusCode:200,
                        user:response
                    });
                } else {
                    return({
                        success:false,
                        statusCode:401,
                        message:'You must be an Admin!'
                    });
                }
            }
            return({
                success:false,
                statusCode:401,
                message:'You must be an Admin!'
            });
        } 
        catch(err){
            return({
                success:false,
                statusCode:401,
                message:'You must be loggedIn!'
            });
        }
    }
};