import React, { useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { SocketContext } from "../context/SocketContext";

const List = ({ /*data, votar, borrar, changeName */}) => {
  const [bands, setBands] = useState([]);
  const [getVotes, setGetVotes] = useState([]);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on("current-bands", (data) => {
      console.log(data);
      setBands(data);
    });
    return () => {
      socket.off("current-bands");
    };

    //  setBands(data);
  }, [socket]);

  const cambioNombre = (e, id) => {
    //console.log(e.target.value);
    //   console.log(id);
    const nuevoNombre = e.target.value;
    setBands((prev) =>
      prev.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        } 
        return band;
      })
    );
  };
  /*const changeName = (id, nombre) =>{
    socket.emit('changename-banda', {id, nombre});
  }*/
  const onLoseFocus = (id, nombre) => {
    //console.log(id, nombre);
    // changeName(id, nombre);
    socket.emit("changename-banda", { id, nombre });
    // TODO: disparar el evento del socket
  };
  const votar = (id) =>{
    console.log('votar - app'+ id);
    socket.emit('votar-banda', id);
  }
  const borrar = (id) =>{
    socket.emit('borrar-banda', id);
  }
  //console.log(bands);
  const crearRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button
            type=""
            className="btn btn-primary"
            onClick={() => votar(band.id)}
          >
            {" "}
            +1{" "}
          </button>
        </td>
        <td>
          <input
            type=""
            name=""
            value={band.name}
            className="form-control"
            onChange={(e) => cambioNombre(e, band.id)}
            onBlur={() => onLoseFocus(band.id, band.name)}
            //onSubmit = {(e) => changeName(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
            <button type="" className="btn btn-danger" onClick={(e) => borrar(band.id)}>Borrar</button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>Votar</th>
            <th>Nombre</th>
            <th>Votos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};

export default List;
