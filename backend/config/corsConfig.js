const cors = require('cors')
const { DELETE } = require('sequelize/lib/query-types')

const corsConfig = () =>{
    return cors({
        origin :(origin,callback)=>{
            const allowedOrigin =[
                'http://localhost:5173', 
                'https://localhost:5173' 
            ]
            if(!origin || allowedOrigin.indexOf(origin) !== -1){
                callback(null,true)
            } else{
                callback(new Error("Not allowd by cors"));
            }
        },
        methods : ['GET','POST','PUT','DELETE'],
        allowedHeaders : [
            'Content-Type',
            'Authorization',
            'Accept-Version'
        ],
        exposedHeaders : ['X-Total-count','Content-Range'],
        credentials : true,
        preflightContinue: false,
        maxAge: 600,
        optionsSuccessStatus: 204,
        
    })
}

module.exports = corsConfig;