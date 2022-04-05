import { io } from 'socket.io-client';
import { useEffect, useMemo, useState } from 'react';


export const useSocket = (serverPath: string) => {
  //Conexión con el servidor de sockets
  const socket = useMemo(() => io(serverPath, {
    transports: [ 'websocket' ],
  }), [serverPath]);

  //Estado de la conexión
  const [ online, setOnline ] = useState(false);


  useEffect(() => {
    //Mira el estado de la conexión
    setOnline(socket.connected);
  }, [ socket ]);

  useEffect(() => {
    //Escucha el evento de conexión
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [ socket ]);

  useEffect(() => {
    //Escucha el evento de desconexión
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [ socket ]);

  return {
    socket,
    online
  }
}
