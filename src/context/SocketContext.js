import React, { useState, useEffect, createContext } from 'react';
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();


export const SocketProvider = ({children}) =>{
    const {socket, online} = useSocket('https://votesapp.herokuapp.com/');
    const [bands, setBands] = useState([]);
 //const {} = useSocket('http://localhost:8080');

  useEffect(() => {
    
    socket.on('current-bands', (data) =>{
     
      setBands(data);
    });
    //return socket.disconnect();
  }, [socket]);
/*
  const votar = (id) =>{
    console.log('votar - app'+ id);
    socket.emit('votar-banda', id);
  }*/
  // Borrar

  /*
  const borrar = (id) =>{
    socket.emit('borrar-banda', id);
  }
  const changeName = (id, nombre) =>{
    socket.emit('changename-banda', {id, nombre});
  }*/
    return (
        <SocketContext.Provider
            value={{
                socket,
                online,
                //votar,
               // borrar,
                //changeName,
                bands,
                setBands
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}