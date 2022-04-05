import { CloseCircleOutlined, StepForwardOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SocketContext } from '../context/SocketContext';
import { getUserStorage } from '../helpers/getUserStorage';
import { useHideMenu } from '../hooks/useHideMenu';
import { Ticket } from '../interfaces/Ticket';


const { Title, Text } = Typography;

export const DeskPage = () => {

  useHideMenu(false);
  const navigate = useNavigate();
  //La función getUserStorage() devuelve un objeto con los datos del usuario
  const [user] = useState(getUserStorage);
  const { socket } = useContext(SocketContext);
  const [assignedTicket, setAssignedTicket] = useState<Ticket>();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  //Función para obtener el ticket el siguiente ticket por atender.
  const nextTicket = () => {
    //Disparamos el evento para obtener el siguiente ticket, este evento se escucha en el backend.
    socket.emit('assign-ticket', { agent: user.agent, desk: user.desk }, (ticket: Ticket) => {
      //Guardamos el ticket en el estado.
      setAssignedTicket(ticket);
    })
  }

  useEffect(() => {
    //Si no tiene los datos del agente y del escritorio no se puede continuar en esta página, se redirige al login
    if(!user.agent || !user.desk) {
      navigate('/login');
    }
  }, [user.agent, user.desk, navigate])

  return (
    <>
      <Row>
        <Col span={ 20 }>
          <Title level={2}>{user.agent}</Title>
          <Text>You are working in desk number: </Text>
          <Text type="success">{user.desk}</Text>
        </Col>

        <Col span={ 4 }>
          <Button
            shape="round"
            // @ts-ignore
            type="danger"
            onClick={ logout }
          >
            <CloseCircleOutlined /> Exit
          </Button>
        </Col>
      </Row>

      <Divider />

      {
        assignedTicket && (
          <Row>
            <Col>
              <Text>You are attending ticket number: </Text>
              <Text
                style={{ fontSize: 30 }}
                type="danger"
              >
                { assignedTicket.number }
              </Text>
            </Col>
          </Row>
        )
      }

      <Row>
        <Col offset={18} span={6}>
          <Button
            onClick={nextTicket}
            shape="round"
            type="primary"
          >
            Next <StepForwardOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};
