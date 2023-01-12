import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (serverPath) => {
  const socket = useMemo(
    () =>
      io.connect(serverPath, {
        transports: ["websocket"],
      }),
    [serverPath]
  );
  const [online, setOnline] = useState(false);
  useEffect(() => {
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

  
  return {
    socket,
    online,
  };
};
