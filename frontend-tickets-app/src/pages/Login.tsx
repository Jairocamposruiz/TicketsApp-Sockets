import { useNavigate } from 'react-router-dom';
import { SaveOutlined } from '@ant-design/icons';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { getUserStorage } from '../helpers/getUserStorage';
import { useHideMenu } from '../hooks/useHideMenu';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

export const Login = () => {

  useHideMenu(false);

  const navigate = useNavigate();
  const [user] = useState(getUserStorage);

  const onFinish = ({agent, desk}: any) => {
    localStorage.setItem('agent', agent);
    localStorage.setItem('desk', desk);

    navigate('/desk');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if(user.agent && user.desk) {
      navigate('/desk');
    }
  }, [user.agent, user.desk, navigate])

  return (
    <>
      <Title level={2}>Login</Title>
      <Text>Input your name and desk number</Text>
      <Divider />

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Agent Name"
          name="agent"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desk"
          name="desk"
          rules={[{ required: true, message: 'Please input your desk!' }]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined /> Login
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
