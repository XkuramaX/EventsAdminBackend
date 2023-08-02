let express = require('express')

let app = express()
let jwt = require('jsonwebtoken')
let tokenHandler = require('./tokenHandler')

module.exports  = {
    requireLogin : async(req,res,next) => {
    try {
        console.log("here")
        let token = req.headers['Authorization'] || req.headers['authorization'] || (req.session ? req.session.token : null) || ( req.cookies ? req.cookies.token : null ) ;
        if(!token){
            res.status(401).send({
                success:false,
                statusCode:401,
                message:"Not logged in"
            });
            return
        }
        token = token.split(' ');
        token = token[token.length-1];
        if(!token){
            res.status(401).send({
                success:false,
                statusCode:401,
                message:"Not logged in"
            });
            return
        }
        const result = await tokenHandler.verifyToken(token);
        if(result.success===true){
            req.user = result.user
            next()
        }
        else{
            res.status(401).send(result);
        }
    } 
    catch(error) {
        res.status(401).send({
            success: false,
            statusCode:401,
            message: error.message
        });
    }
},
requireAdminRights : async(req,res,next) => {
        try {
            console.log("here")
            let token = req.headers['Authorization'] || req.headers['authorization'] || (req.session ? req.session.token : null) || ( req.cookies ? req.cookies.token : null ) ;
            if(!token){
                res.status(401).send({
                    success:false,
                    statusCode:401,
                    message:"Not logged in"
                });
                return
            }
            token = token.split(' ');
            token = token[token.length-1];
            if(!token){
                res.status(401).send({
                    success:false,
                    statusCode:401,
                    message:"Not logged in"
                });
                return
            }
            const result = await tokenHandler.verifyTokenForAdmin(token);
            if(result.success===true){
                req.user = result.user
                next()
            }
            else{
                res.status(401).send(result);
            }
        } 
        catch(error) {
            res.status(401).send({
                success: false,
                statusCode:401,
                message: error.message
            });
        }
},

requireSuperAdminRights : async(req,res,next) => {
    try {
        console.log("here")
        let token = req.headers['Authorization'] || req.headers['authorization'] || (req.session ? req.session.token : null) || ( req.cookies ? req.cookies.token : null ) ;
        if(!token){
            res.status(401).send({
                success:false,
                statusCode:401,
                message:"Not logged in"
            });
            return
        }
        token = token.split(' ');
        token = token[token.length-1];
        if(!token){
            res.status(401).send({
                success:false,
                statusCode:401,
                message:"Not logged in"
            });
            return
        }
        const result = await tokenHandler.verifyTokenForSuperAdmin(token);
        if(result.success===true){
            req.user = result.user
            next()
        }
        else{
            res.status(401).send(result);
        }
    } 
    catch(error) {
        res.status(401).send({
            success: false,
            statusCode:401,
            message: error.message
        });
    }
}
}