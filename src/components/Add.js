import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
//import { useSocket } from "../hooks/useSocket";

const Add = () => {
    const {socket} = useContext(SocketContext);
    const [valor, setValor] = useState('');
  //  const {socket} = useSocket('http://localhost:8080');
    /*const crear = (name) =>{
        socket.emit('crear-banda', name);
    }*/
    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(valor);
        if(valor.trim().length > 0){
            //TODO: llamar la funcion para emitir el evneto
            //crear(valor);
            //socket.emit('crear-banda', {name:valor});
            socket.emit('crear-banda', {name:valor});
            setValor('');
        }
    }
  return (
    <>
      <h3>Agregar Candidato</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          type=""
          name=""
          value={valor}
          placeholder="Nuevo candidato"
          onChange={(e) => setValor(e.target.value)}
        />
      </form>
      <button>Reiniciar Votaciones</button>
    </>
  );
};

export default Add;
