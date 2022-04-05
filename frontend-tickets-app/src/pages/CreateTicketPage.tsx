import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useContext, useState } from 'react';

import { SocketContext } from '../context/SocketContext';
import { useHideMenu } from '../hooks/useHideMenu';
import { Ticket } from '../interfaces/Ticket';


const { Title, Text } = Typography;

export const CreateTicketPage = () => {

  useHideMenu(true);
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState<Ticket>();

  const newTicket = () => {
    //Emitimos un evento para crear un nuevo ticket, en donde tenemos el null también podemos mandar datos
    //al backend en caso de ser necesario para crear un ticket, como por ejemplo el usuario que lo crea, como
    //vemos se le pasa una función callback que recibe un ticket ya creado desde el backend.
    socket.emit('create-ticket', null, (ticket: Ticket) => {
      setTicket(ticket);
    });
  }

  return (
    <>
      <Row>
        <Col span={14} offset={6} style={{ textAlign: 'center'}}>
          <Title level={3}>
            Press the button to create a new Ticket
          </Title>

          <Button
            type="primary"
            shape="round"
            icon={ <DownloadOutlined /> }
            size="large"
            onClick={newTicket}
          >
            New Ticket
          </Button>
        </Col>
      </Row>

      {
        ticket && (
          <Row style={{ marginTop: 100 }}>
            <Col span={14} offset={6} style={{ textAlign: 'center'}}>
              <Text style={{ fontSize: '18px' }}>
                Your number
              </Text>
              <br />
              <Text type="success" style={{ fontSize: 55 }}>
                { ticket.number }
              </Text>
            </Col>
          </Row>
        )
      }
    </>
  );
};
