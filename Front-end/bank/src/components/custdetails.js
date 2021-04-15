import { useParams } from "react-router";
import NavBar from "./navbar";
import * as React from 'react'
import { Button, Container, Typography } from "@material-ui/core";
import ReactFontLoader from 'react-font-loader';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import bg from '../static/blue.png'


const CustDetails = () => {
    var {accno}=useParams()
    const [customer,setCustomer]=React.useState(null);
    const [toacc,setToAcc]=React.useState('');
    const [amt,setAmt]=React.useState('');
    const [acc,setAcc]=React.useState(null);
    const [err,seterr]=React.useState('');
    const [open, setOpen] = React.useState(false);
    const [transactFlag, setTransactFlag] = React.useState(0);
    const [transactions, setTransactions] = React.useState(null);
    


  const handleClickTransact=()=>{
        setTransactFlag(transactFlag===1?0:1)
        fetch(`/custtransfer?accno=${customer[0].a_no}`)
        .then(response=>response.json())
        .then(response=>setTransactions(response.data))
        .catch(err=>console.error(err))

  }  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      seterr('')
      setAmt('')
      setToAcc('')
      window.location.reload()
    setOpen(false);
  };

    const handleChangeToAcc=(e)=>{
        setToAcc(e.target.value)
        
    }
    const handleChangeAmt=(e)=>{
        setAmt(e.target.value)
        
        
    }

    async function submitHandler(e){
        e.preventDefault()
        console.log(toacc)
        var a=parseFloat(amt)
        setAmt(a)
        if(amt<0){
            seterr('Invalid Amount')
        }
        else if(customer[0].bal-amt<0){
            seterr('Insufficient Balance')
        }
        else{
            
            seterr('Transaction Successful')
             await fetch(`/dotransact?fromacc=${customer[0].a_no}&toacc=${toacc}&amt=${amt}`)
            .then(response=>response.json())
            .then(response=>response.json())
            .catch(err=>console.error(err))

            await fetch(`/modifycust?fromacc=${customer[0].a_no}&amt=${amt}`)
            .then(response=>response.json())
            .then(response=>response.json())
            .catch(err=>console.error(err))

            await fetch(`/modifytocust?toacc=${toacc}&amt=${amt}`)
            .then(response=>response.json())
            .then(response=>response.json())
            .catch(err=>console.error(err));

            
            // history.go(0);
            
        }

      
    }
    console.log(typeof(amt))
    async function getCustDetails(){
        fetch(`/custdetails?accno=${accno}`)
        .then(response=>response.json())
        .then(response=>setCustomer(response.data))
        .catch(err=>console.error(err))
        
      }

      async function getAccounts(){
      fetch(`/accounts?accno=${accno}`)
        .then(response=>response.json())
        .then(response=>setAcc(response.data))
        .catch(err=>console.error(err))
        
      }

      React.useEffect(()=>{
      getCustDetails()
      getAccounts()
  },[])

  console.log(acc)

    return ( 
        <div style={{backgroundImage: `url(${bg})`,
        //  background: '#cccccc',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflowY:'scroll',       
        backgroundAttachment: 'fixed'}}>
            <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Gentium+Book+Basic:wght@400;700&display=swap' />
           
            <NavBar prop={1}/>

        <div style={{}}>

        <div>
            <Container style={{background:'#163097',paddingBottom:'2vh'}} maxWidth='md'><Typography style={{fontFamily:'Gentium Book Basic',color:'#ff4500',fontWeight:'bold',marginTop:'3vh'}} variant='h5'>Account Details:</Typography>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                {customer&&<table style={{width:'70%',marginTop:'2vh'}}>
                    <tbody>
                    <tr>
                        <td style={{background:'#CCE5FF',padding:'1.5vw'}}>Account Number:</td>
                        <td style={{background:'#FFE5CC',padding:'1.5vw'}}>{customer[0].a_no}</td>
                    </tr>
                    <tr>
                        <td style={{background:'#99CCFF',padding:'1.5vw'}}>Name:</td>
                        <td style={{background:'#FFCC99',padding:'1.5vw'}}>{customer[0].cust_name}</td>
                    </tr>
                    <tr>
                        <td style={{background:'#CCE5FF',padding:'1.5vw'}}>Email:</td>
                        <td style={{background:'#FFE5CC',padding:'1.5vw'}}>{customer[0].cust_email}</td>
                    </tr>
                    <tr>
                        <td style={{background:'#99CCFF',padding:'1.5vw'}}>Account Balance:</td>
                        <td style={{background:'#FFCC99',padding:'1.5vw'}}>{customer[0].bal}</td>
                    </tr>
                    </tbody>
                </table>}
            </div>
            </Container>

            <div style={{textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:"center"}}>
      <Button style={{background:'#ff4500',marginTop:'2vh',color:'white',fontWeight:'bold'}} onClick={handleClickOpen}>
        Perform Transaction
      </Button>
      <Button style={{background:'#ff4500',marginTop:'2vh',color:'white',fontWeight:'bold'}} onClick={handleClickTransact}>
        View Transaction History
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{color:'#ff4500',}} id="alert-dialog-title"><Typography variant='h5' style={{fontFamily:'Gentium Book Basic',fontWeight:'bold'}}>Enter Transaction Details</Typography></DialogTitle>
        <DialogContent>
        <div>
                <form onSubmit={submitHandler} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <InputLabel style={{marginBottom:'1vh'}} htmlFor="demo-simple-select-label"><Typography variant='body1' style={{fontFamily:'Gentium Book Basic',fontWeight:'bold',color:'#191970'}}>Recipient Account Number:</Typography></InputLabel>
                    
                    <Select
                    required
                    id="demo-simple-select"
                    name='Age'
                    variant='outlined'
                    style={{marginBottom:'2vh',}}
                    value={toacc}
                    onChange={handleChangeToAcc}
                    >
                    {acc&&acc.map((a,index)=>(<MenuItem key={index} value={a.a_no}>{a.a_no}</MenuItem>))}
                   
                    </Select>
                    <TextField
                    required
                    variant='outlined'
                    color='primary'
                    id="standard-basic" 
                    placeholder="Amount"
                    value={amt}
                    onChange={handleChangeAmt} />
                    <Typography style={err==='Transaction Successful'?{color:'green',marginBottom:'2vh'}:{color:'red',marginBottom:'2vh'}} variant='caption'>{err}</Typography>


                    <Button style={{background:'#ff4500',color:'white',fontWeight:'bold'}} type='submit'>Ok</Button>
                </form>
            </div>
        </DialogContent>
      </Dialog>
    </div>

    {transactFlag&&<div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingBottom:'3vh'}}>
                {transactions&&<table style={{width:'80%',marginTop:'2vh',textAlign:'center'}}>
                    <tbody>
                    <tr>
                    <th style={{background:'#CCE5FF',padding:'1vw'}}>Transaction ID</th>
                        <th style={{background:'#CCE5FF',padding:'1vw'}}>From</th>
                        <th style={{background:'#CCE5FF',padding:'1vw'}}>To</th>
                        <th style={{background:'#CCE5FF',padding:'1vw'}}>Amount Transferred</th>
                    </tr>
                    {transactions.map((transaction,index)=>(
                    <tr key={index}>
                        <td style={{background:'#FFE5CC',padding:'1vw'}}>{transaction.t_id}</td>
                        <td style={{background:'#FFCC99',padding:'1vw'}}>{transaction.from_id}</td>
                        <td style={{background:'#FFE5CC',padding:'1vw'}}>{transaction.to_id}</td>
                        <td style={{background:'#FFCC99',padding:'1vw'}}>{transaction.amt}</td>
                    </tr>))}
                    </tbody>
                </table>}
            </div>}

            
            

            </div>
            </div>  
        </div>
    
     );
}
 
export default CustDetails;