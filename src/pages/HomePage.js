import React, { useContext, useEffect, useState } from "react";
import Add from "../components/Add";
import List from "../components/List";
import io from 'socket.io-client';
import { SocketContext } from "../context/SocketContext";
//import ChartC from "../components/ChartC";
import StatsChart from "../components/StatsChart";

/*const connectSocketServer = () =>{
 
  const socket = io.connect('http://localhost:8080',{
      transports: ['websocket']
  });
  //console.log(socket)
  return socket;
}*/
function HomePage() {
  const {
    socket, 
    online,
    bands,
    votar,
    borrar,
    changeName,
  } = useContext(SocketContext);
  //const [socket] = useState(connectSocketServer());
  //const [online, setOnline] = useState(false);
  //console.log("2")
  /*  useEffect(() => {
    //console.log(socket.connected);
    // alert("asd");
    setOnline(socket.connected);
  }, [socket]);
  
  useEffect(() => {
    
    socket.on('connect', () =>{
      setOnline(true);
    });

  }, [socket]);
  
  useEffect(() => {
    
    socket.on('disconnect', () =>{
      setOnline(false);
    });
    //return socket.disconnect();
  }, [socket]);
  */
 
  /*const crear = (name) =>{
    socket.emit('crear-banda', name);
  }*/
  return (
    <div className='container'>
        <div className='alert'>
            <p>
                Estado de la votacion: 
                { 
                online 
                ? 
                <span className="text-success"> Votando</span> :
                <span className="text-danger"> Finalizada</span>
                }
            </p>
        </div>
        <h1>Votaciones</h1>
        <div className="row">
          <div className="col-5">
                <StatsChart />
          </div>
          
        </div>
        <hr />
        <div className="row">
            
            <div className="col-8">
                <List
                  data={bands}
                  votar={votar}
                  borrar={borrar}
                  changeName = {changeName}
                  
                />
            </div>
            <div className="col-4">
                <Add 
                  //crear = {crear}
                />
            </div>
        </div>
    </div>
  );
}

export default HomePage;
