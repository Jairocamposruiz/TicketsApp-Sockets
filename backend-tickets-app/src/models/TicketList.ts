import Ticket from './Ticket';


class TicketList {
  private lastNumber: number;
  private pending: Ticket[];
  private assigned: Ticket[];

  constructor () {
    this.lastNumber = 0;
    this.pending = [];
    this.assigned = [];
  }

  get nextNumber (): number {
    this.lastNumber++;
    return this.lastNumber;
  }

  get lastTickets (): Ticket[] {
    return this.assigned.slice(0,13);
  }

  createTicket (): Ticket {
    const newTicket = new Ticket(this.nextNumber);
    this.pending.push(newTicket);
    return newTicket;
  }

  assignTicket (agent: string, desk: number): Ticket | undefined {
    const nextTicket = this.pending.shift();
    if(!nextTicket) return;
    nextTicket.agent = agent;
    nextTicket.desk = desk;
    this.assigned.unshift(nextTicket);
    return nextTicket;
  }
}

export default TicketList;
