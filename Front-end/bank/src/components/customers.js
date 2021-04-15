import NavBar from "./navbar";
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ReactFontLoader from 'react-font-loader';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import {useEffect} from 'react';
import bg from '../static/back4.png';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


const Customers = () => {

    const [customers,setCustomers]=React.useState(null)
    const [accno,setAccno]=React.useState(null)

    async function getCustomers(){
        await fetch("/cust")
        .then(response=>response.json())
        .then(response=>setCustomers(response.data))
        .catch(err=>console.error(err))
      }
        
        useEffect(()=>{
        getCustomers()
    },[])

    const clickHandler=(c)=>{
        console.log(c)
        window.location=`/customers/${c}`
    }

    console.log(customers)
    const matches = useMediaQuery('(min-width:689px)');

    return ( 
        <div style={matches?{
            backgroundImage: `url(${bg})`,
            //  background: '#cccccc',
            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            // alignItems: 'center',
            flexDirection: 'column',
            
            backgroundAttachment: 'fixed'
        }:{
            backgroundImage: `url(${bg})`,
            //  background: '#cccccc',
            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            // alignItems: 'center',
            flexDirection: 'column',
            
            backgroundAttachment: 'fixed'
        }}>
            <NavBar prop={1} />
            <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Gentium+Book+Basic:wght@400;700&display=swap' />
            <div style={{textAlign:'center',background: 'rgba(25,25,112,0.5)',marginTop:'5vh'}}>
            <Typography variant='h3' style={{fontWeight:'bold',color:'#ff4500',fontFamily:'Gentium Book Basic'}}>
                    Select Account to Transfer From:
                </Typography></div>
            <Container style={{marginTop:'3vh',marginBottom:'2vh'}} maxWidth="md">
                
                {customers&&customers.map((customer,index)=>(<Paper key={index} style={{background:'rgb(84,140,186,0.5)',marginBottom:'1vh'}} elevation={1}>
                    <div style={{color:'white',fontFamily:'Gentium Book Basic',marginLeft:'3vw'}}>
                        <div style={{display:'flex',paddingTop:'3vh'}}>
                        <PersonIcon style={{color:'#191970',marginTop:'2vh',borderRadius:'2px',fontSize:'7vh',background:'white'}}/>
                        <div style={{marginLeft:'2vw'}}>
                        <Typography style={{fontFamily:'Gentium Book Basic',paddingTop:'1vh',fontWeight:'bold'}} variant='h5'>
                            {`${customer.cust_name}`} 
                        </Typography>
                        <Typography style={{fontFamily:'Gentium Book Basic',paddingBottom:'1vh',fontWeight:'bold'}} variant='body1'>
                            {`Account Number: ${customer.a_no}`} 
                        </Typography></div></div>
                        <div style={{textAlign:'right',marginRight:'1vw'}}>
                        <Button onClick={()=>clickHandler(customer.a_no)} variant="contained" style={{background:'#ff4500',width:'fit-content',marginBottom:'2vh'}}>
                            <Typography variant='caption' style={{color:'white',fontWeight:'bold'}}>Select Account</Typography>
                        </Button></div>
                    </div>
                </Paper>))
                }
            </Container>
        </div>
     );
}
 
export default Customers;