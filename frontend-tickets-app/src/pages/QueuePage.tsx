import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../context/SocketContext';
import { getLastTickets } from '../helpers/getLastTickets';
import { useHideMenu } from '../hooks/useHideMenu';
import { Ticket } from '../interfaces/Ticket';


const { Title, Text } = Typography;

export const QueuePage = () => {

  useHideMenu(true);
  const { socket } = useContext(SocketContext);
  const [lastTickets, setLastTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    //Escuchamos el evento que nos traerá los últimos tickets asignados cada vez que estos cambien.
    socket.on('last-tickets-assigned', (tickets: Ticket[]) => {
      setLastTickets(tickets);
    });

    return () => {
      //En caso de salir de la pantalla dejamos de escuchar el evento
      socket.off('last-tickets-assigned');
    };
  }, [socket]);

  //Aquí se obtiene la lista de los últimos tickets asignados la primera vez que entramos a la página
  useEffect(() => {
    //Es un simple fetch al backend para obtener los últimos tickets asignados
    getLastTickets()
      .then(tickets => setLastTickets(tickets));
  }, []);

  return (
    <>
      <Title level={ 1 }>Attending to client:</Title>
      <Row>
        <Col span={ 11 } style={ { textAlign: 'center' } }>
          <List
            dataSource={ lastTickets.slice(0, 3) }
            renderItem={ (item) => (
              <List.Item>
                <Card
                  style={ { width: '100%', marginTop: 16 } }
                  actions={ [
                    <Tag color="volcano">{ item.agent }</Tag>,
                    <Tag color="magenta">Desk: { item.desk }</Tag>,
                  ] }
                >
                  <Title>Num. { item.number }</Title>
                </Card>
              </List.Item>
            ) }
          />
        </Col>

        <Col span={ 11 } offset={ 2 } style={ { textAlign: 'center' } }>
          <Divider>History</Divider>
          <List
            dataSource={ lastTickets.slice(3) }
            renderItem={ (item) => (
              <List.Item.Meta
                title={ `Ticket Num. ${ item.number }` }
                description={
                  <>
                    <Text type="secondary">Desk: </Text>
                    <Tag color="magenta">{ item.desk }</Tag>
                    <Text type="secondary">Agent: </Text>
                    <Tag color="volcano">{ item.agent }</Tag>
                    <Divider />
                  </>
                }
              />
            ) }
          />
        </Col>
      </Row>
    </>
  );
};
