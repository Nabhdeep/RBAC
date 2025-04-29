import express from 'express'
import forceSSL from 'express-force-ssl'
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan'
import bodyParser from 'body-parser';
import { errorHandler as bodyErrorHandler } from 'bodymen';
import {env} from '../../config'

export default (apiRoot , routes)=>{
    const app = express()
    if(env==='production'){
        app.set('forceSSLOptions' ,
        { enable301Redirects:false , 
            trustXFPHeader: true
        })
        app.use(forceSSL)
    }

    if(env === 'production' || env==='development'){
        app.use(cors())
        app.use(compression())
        app.use(morgan('dev'))
    }

    app.use(bodyParser.urlencoded({limit:'10mb' , extended:true}))
    app.use(bodyParser.json({limit:'10mb'}))
    app.use(apiRoot , routes)
    app.use(bodyErrorHandler())
    
    
    return app
}

