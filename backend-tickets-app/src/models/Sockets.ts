import { Server } from 'socket.io';
import TicketList from './TicketList';
import { User } from '../interfaces/User';

class Sockets {
  io: Server;
  ticketList: TicketList;

  constructor(io: Server) {
    this.io = io;
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    //Escuchamos el evento connection emitido desde el cliente
    this.io.on('connection', ( socket ) => {
      console.log(`Client ${socket.id} connect`);

      //Cuando hacemos socket.on estamos escuchando un evento
      //Pero solo de el cliente en concreto por ello tiene un id
      //Cada cliente tiene su id para diferenciarlos algo util
      //para tener comunicación privada solo con un cliente
      socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnect`)
      })

      //Escuchamos el evento create-ticket emitido desde el cliente,
      //en este caso no pasa data el cliente por ello no utilizamos
      //el primer parámetro, el callback se le devuelve al cliente
      //en este caso con el nuevo ticket creado. 
      socket.on('create-ticket', (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      })

      //Lo mismo que el anterior evento solo que esta vez para asignar
      //un nuevo ticket. En este caso si nos envia el cliente data desde
      //la app de React la extraemos y es el agente y el escritorio
      //datos necesarios para la asignación del ticket
      socket.on('assign-ticket', ({ agent, desk }: User, callback) => {
        const assignedTicket = this.ticketList.assignTicket(agent, desk);
        //Le devolvemos al cliente el ticket asignado
        callback(assignedTicket);

        //Cuando hacemos io.emit emitimos nosotros un evento hacia todos
        //los clientes en caso de que solo quisieramos emitirlo al cliente
        //actual hariamos socket.emit, el segundo parámetro es la data.
        this.io.emit('last-tickets-assigned', this.ticketList.lastTickets);
      })
    });
  }
}

export default Sockets;
