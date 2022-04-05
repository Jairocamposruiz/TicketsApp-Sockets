import { v4 as uuidv4 } from 'uuid';

class Ticket {
  id: string;
  number: number;
  desk: null | number;
  agent: null | string;

  constructor ( number: number ) {
    this.id = uuidv4();
    this.number = number;
    this.desk = null;
    this.agent = null;
  }

}

export default Ticket;
