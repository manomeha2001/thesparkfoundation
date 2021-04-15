import NavBar from "./navbar";
import Background from '../static/Bank.png'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Money from '../static/Money2.png'
import Target from '../static/Target.png'
import User from '../static/User.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Button from '@material-ui/core/Button';

const Home = () => {

    const matches = useMediaQuery('(min-width:689px)');
    const clickHandler=()=>{
        window.location='/customers'
    }


    return (
        <div style={{overflow:'hidden' }}>
            <NavBar prop={0} />
            <div style={matches?{
                backgroundImage: `url(${Background})`,
                //  background: '#cccccc',
                height: '100vh',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                // alignItems: 'center',
                flexDirection: 'column',
                backgroundAttachment: 'fixed'
            }:{
                backgroundImage: `url(${Background})`,
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
                <div style={matches?{background: 'rgba(40,49,85,0.5)',marginBottom: '2vh',marginTop:'2vh'}:{background: 'rgba(40,49,85,0.5)',marginBottom: '2vh',marginTop:'2vh'}}>
                <Typography variant="h2" style={{  color: '#ff4500', fontWeight: 'bold', marginLeft: '2vw',marginRight:'1vw',  fontFamily: 'Gentium Book Basic' }}>
                    Banking Made Easy.
                </Typography>
                </div>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginRight:'4.5vw'}}>
                <Grid container spacing={1} >
                    <Grid item xs={matches?4:12} >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <div style={matches?{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            paddingLeft:'5vw'
                        }:{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            paddingLeft:'0vmin'
                        }} >
                            <img style={{ height: '15vh', width: '15vh', borderRadius: '2vh' }} src={User} alt="User" />
                            <Typography variant="h4" style={{ marginTop: '1.5vh', color: 'white', fontWeight: 'bold',marginLeft:'3vw',textAlign:'center', fontFamily: 'Gentium Book Basic' }}>
                                   Select Sender Account
                            </Typography>
                        </div>
                        {/* <ArrowForwardIosIcon style={{color:'#ff4500',fontSize:'6vmin',marginLeft:'2vmin'}}/> */}
                        
                        </div>
                    
                    </Grid>
                    <Grid item xs={matches?4:12}>
                        <div style={matches?{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }:{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            {matches?<ArrowForwardIosIcon style={{color:'#ff4500',fontSize:'10vmin',marginTop:'-4vh'}}/>:<KeyboardArrowDownIcon style={{color:'#ff4500',fontSize:'10vmin'}}/>}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}>
                                <img style={{ height: '15vh', width: '15vh', borderRadius: '2vh' }} src={Money} alt="Money" />
                                <Typography variant="h4" style={{ marginTop: '1.5vh',textAlign:'center',marginLeft:'3vw', color: 'white', fontWeight: 'bold', fontFamily: 'Gentium Book Basic' }}>
                                   Select Transaction Amount
                                </Typography>
                            </div>
                            {/* <ArrowForwardIosIcon style={{color:'#ff4500',fontSize:'6vmin',marginLeft:'2vmin'}}/> */}
                        </div>
                    </Grid>
                    <Grid item xs={matches?4:12}>
                    <div style={matches?{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }:{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            {matches?<ArrowForwardIosIcon style={{color:'#ff4500',fontSize:'10vmin',marginTop:'-4vh'}}/>:<KeyboardArrowDownIcon style={{color:'#ff4500',fontSize:'10vmin'}}/>}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <img style={{ height: '15vh', width: '15vh', borderRadius: '2vh' }} src={Target} alt="Recipient" />
                            <Typography variant="h4" style={{ marginTop: '1.5vh',textAlign:'center',marginLeft:'3vw', color: 'white', fontWeight: 'bold', fontFamily: 'Gentium Book Basic' }}>
                                   Select Recepient Account
                            </Typography>
                        </div>
                        </div>
                    </Grid>
                </Grid>

                   
                <Button onClick={clickHandler} variant="contained" style={{background:'#ff4500',width:'fit-content',marginTop:'6vh',marginBottom:'5vh'}}>
                    <Typography variant='h6' style={{color:'white',fontWeight:'bold'}}>Begin!</Typography>
                </Button>
                
                </div>
            </div>
        </div>
    );
}

export default Home;