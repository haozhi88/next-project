import React from 'react';
import loadingImg from '../media/Double Ring-1s-131px.svg'



export default function LoadingNav(){
    return(
        <>
        <div style={{position:"absolute", display: "flex", justifyContent: "center", top: "50%", width: "100%"}}>
            <img src={loadingImg} alt="loader"/>
         </div>         
        </>
    )
}