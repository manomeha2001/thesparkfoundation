const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const path = require('path');

const app=express();

app.use(cors());
app.use(express.static('./public'))

const connection=mysql.createConnection({
    host:'database-1.ctwx4kseab3f.us-east-1.rds.amazonaws.com',
    user:'root',
    password:'root1234',
    database:'grip'
})




const SELECT_ALL_CUSTOMERS_QUERY='SELECT * FROM customers';
app.get('/cust',(req,res)=>{connection.query(SELECT_ALL_CUSTOMERS_QUERY,(err,results)=>{
    if(err){
        return res.send(err)
    }
    else{

        // return res.send(results)
        return res.json({
            data:results
        })
    }
})})

const SELECT_ALL_TRANSFERS_QUERY='SELECT * FROM transfer';
app.get('/transfers',(req,res)=>{connection.query(SELECT_ALL_TRANSFERS_QUERY,(err,results)=>{
    if(err){
        return res.send(err)
    }
    else{

        
        return res.json({
            data:results
        })
    }
})})


app.get('/custtransfer',(req,res)=>{
    var {accno}=req.query
    const SELECT_TRANSFERS_QUERY=`SELECT * FROM transfer WHERE from_id LIKE '${accno}' OR to_id LIKE '${accno}' `;
    connection.query(SELECT_TRANSFERS_QUERY,(err,results)=>{
    if(err){
        return console.log(err)
    }
    else{

        
        return res.json({
            data:results
        })
    }
})})


app.get('/accounts',(req,res)=>{
    var{accno}=req.query
    const SELECT_ALL_ACCNO_QUERY=`SELECT a_no FROM customers where a_no not LIKE '${accno}'`;
    connection.query(SELECT_ALL_ACCNO_QUERY,(err,results)=>{
    
    if(err){
        return res.send(err)
    }
    else{

        
        return res.json({
            data:results
        })
    }
})})


app.get('/custdetails',(req,res)=>{
    var{accno}=req.query
    const SELECT_CUSTOMER_DETAILS_QUERY=`SELECT * FROM customers WHERE a_no LIKE '${accno}'`;
    connection.query(SELECT_CUSTOMER_DETAILS_QUERY,(err,results)=>{
    if(err){
        return res.send(err)
    }
    else{

        // return res.send(results)
        console.log(results)
        return res.json({
            data:results
        })
    }
})})

app.get('/dotransact',(req,res)=>{
    var{fromacc,toacc,amt}=req.query
    const INSERT_TRANSACTION_QUERY=`INSERT INTO transfer(from_id,to_id,amt) VALUES('${fromacc}','${toacc}',${amt})`;
    connection.query(INSERT_TRANSACTION_QUERY,(err,results)=>{
    if(err){
        console.log(err)
    }
    else{

        

        // return res.send(results)
        console.log(results)
        console.log('dotransact')
        // return res.json({
        //     data:results
        // })
        
    }
    res.end()
})})

app.get('/modifycust',(req,res)=>{
    var{fromacc,amt}=req.query
    const MODIFY_CUSTOMER_QUERY=`UPDATE customers SET bal=bal-${amt} WHERE a_no LIKE '${fromacc}'`;
    connection.query(MODIFY_CUSTOMER_QUERY,(err,results)=>{
    if(err){
        console.log(err)
    }
    else{

        

        // return res.send(results)
        console.log(results)
        console.log('modifycust')
        // return res.json({
        //     data:results
        // })
    }
    res.end()
})})

app.get('/modifytocust',(req,res)=>{
    var{toacc,amt}=req.query
    const MODIFY_CUSTOMER_QUERY1=`UPDATE customers SET bal=bal+${amt} WHERE a_no LIKE '${toacc}'`;
    connection.query(MODIFY_CUSTOMER_QUERY1,(err,results)=>{
    if(err){
        console.log(err)
    }
    else{

        

        // return res.send(results)
        console.log(results)
        console.log('modifytocust')
        // return res.json({
        //     data:results
        // })
    }
    res.end()
})})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.listen(process.env.PORT||4000,()=>{console.log("server listening on 4000")});