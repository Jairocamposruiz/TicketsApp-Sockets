import { Ticket } from '../interfaces/Ticket';

interface GetLastTicketsResponse {
  ok:    boolean;
  lasts: Ticket[];
}

export const getLastTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await fetch('http://localhost:3001/last-tickets');
    const lastTickets: GetLastTicketsResponse = await response.json();
    return lastTickets.lasts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
