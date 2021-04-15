import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ReactFontLoader from 'react-font-loader'
import Button from '@material-ui/core/Button';
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function NavBar({prop}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Gentium+Book+Basic:wght@400;700&display=swap' />
      <AppBar style={{background:'rgb(25,25,112)',paddingTop:'0.7vh',paddingBottom:'0.7vh'}} position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" style={{color:'#ff4500',flexGrow:1,paddingTop:'0.5vh',paddingBottom:'0.5vh',paddingLeft:'0.5vw',paddingRight:'0.5vw',borderRadius:'4px',fontWeight:'bold',fontFamily:'Gentium Book Basic'}}>
            The Spark Community Bank
          </Typography>
          {prop===1&&(
          <Tooltip title='Home'>
          <Button onClick={()=>{window.location='/'}} color="inherit" style={{color:'rgb(25,25,112)',fontWeight:'bold'}}><HomeIcon style={{background:'#ff4500',padding:'1vh',borderRadius:'0.5vh'}}/></Button>
          </Tooltip>)}
          {prop===1&&(
          <Tooltip title='Customers'>
          <Button onClick={()=>{window.location='/customers'}} color="inherit" style={{color:'rgb(25,25,112)',fontWeight:'bold'}}><PeopleIcon style={{background:'#ff4500',padding:'1vh',borderRadius:'0.5vh'}}/></Button>
          </Tooltip>)}
          {prop===1&&(
          <Tooltip title='Transactions'>
          <Button onClick={()=>{window.location='/transactions'}} color="inherit" style={{color:'rgb(25,25,112)',fontWeight:'bold'}}><AccountBalanceWalletIcon style={{background:'#ff4500',padding:'1vh',borderRadius:'0.5vh'}}/></Button>
          </Tooltip>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}