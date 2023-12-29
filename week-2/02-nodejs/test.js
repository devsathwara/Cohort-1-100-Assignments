const express = require('express');
  const bodyParser = require('body-parser');
  const todolist=require('./todos.json')
  const app = express();
  
  app.use(bodyParser.json());
  console.log(todolist)
  app.post('/todos',(req,res)=>{
    
  })