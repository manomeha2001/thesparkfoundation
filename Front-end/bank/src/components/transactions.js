import NavBar from "./navbar"
import * as React from 'react'
import { Typography } from "@material-ui/core"
import ReactFontLoader from 'react-font-loader';

const Transactions = () => {

    const [transfers,setTransfers]=React.useState(null)

    async function getTransactions(){
        await fetch("/transfers")
        .then(response=>response.json())
        .then(response=>setTransfers(response.data))
        .catch(err=>console.error(err))
      }
        
        React.useEffect(()=>{
        getTransactions()
    },[])

    return ( 
        <div>
            <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Gentium+Book+Basic:wght@400;700&display=swap' />
            <NavBar prop={1}/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',marginBottom:'1vh'}}>
                <Typography variant='h4' style={{fontFamily:'Gentium Book Basic',fontWeight:'bold',color:'#ff4500',marginTop:'2vh'}}>All Transactions:</Typography>
                {transfers&&<table style={{textAlign:'center',marginTop:'2vh',width:'99%'}}>
                <tbody>
                    <tr>
                        <th style={{background:'#CCE5FF',padding:'1vw'}}>Transaction ID</th>
                        <th style={{background:'#CCE5FF',padding:'1vw'}}>From</th>
                        <th style={{background:'#CCE5FF',padding:'1vw'}}>To</th>
                        <th style={{background:'#CCE5FF',padding:'1vw'}}>Amount Transferred</th>
                    </tr>
                    {transfers.map((transfer,index)=>(
                        <tr key={index}>
                        <td style={{background:'#FFCC99',padding:'1vw'}}>{transfer.t_id}</td>
                        <td style={{background:'#FFCC99',padding:'1vw'}}>{transfer.from_id}</td>
                        <td style={{background:'#FFE5CC',padding:'1vw'}}>{transfer.to_id}</td>
                        <td style={{background:'#FFCC99',padding:'1vw'}}>{transfer.amt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>}

            </div>

        </div>
     );
}
 
export default Transactions;