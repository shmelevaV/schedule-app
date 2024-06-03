import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";
import { check } from "./http/userAPI";
import { Context } from "./index";

const App = observer( ()=>{
  const{user}=useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect( ()=>{
      check().then(data =>{
        if(data){
         user.setUser(true)
         let role
         if(data.role === "ADMIN"){
          role=2;
         }else{
          role=1;
         }
         user.setIsAuth(role)
        }
      }).finally( ()=> setLoading(false))
  },[])

  if(loading){
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Spinner animation={"grow"}/>
      </div>
    )
  }

  return (
    <BrowserRouter>
    <NavBar />
     <AppRouter />
    </BrowserRouter>
  );
});

export default App;
