import http from 'http'
import express from './services/express'
import api from './api'
import {apiRoot , env , port , ip ,mongo} from './config'
import mongoose from './services/mongoose'

const app = express(apiRoot , api)
const server = http.createServer(app)

if (mongo) {
    mongoose.connect(mongo)
    .then((e)=>{
        console.log("connected to mongo" , mongo);
    }).catch((e)=>{
        console.log("error connecting to mongo" , e);
    })
  }
mongoose.Promise = Promise
setImmediate(()=>{
    server.listen(port , ip, ()=>{
        console.log(`Express server listening on http://${ip}:${port}, in mode ${env}`);
    })
})


export default app