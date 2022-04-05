import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '../hooks/useSocket';


interface SocketContextProps {
  socket: Socket;
  online: boolean;
}

interface SocketProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps);

//Creamos el Provider que va a proveer el contexto
export const SocketProvider = ({ children }: SocketProviderProps) => {
  //Hacemos uso del hook useSocket para obtener el socket y el estado de la conexión
  const { socket, online } = useSocket('http://localhost:3001');
  return (
    <SocketContext.Provider value={ { socket, online } }>
      { children }
    </SocketContext.Provider>
  );
};
