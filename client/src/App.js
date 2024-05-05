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
        user.setUser(true)
        user.setIsAuth(2)
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
