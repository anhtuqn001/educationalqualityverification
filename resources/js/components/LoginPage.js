import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../../../node_modules/antd/dist/antd.css';
// import './index.css';
import { Form, Input, Button, Checkbox, Row, Col, Space, Alert } from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, ChromeOutlined } from '@ant-design/icons';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '160px'
  }
}

const LoginPage = ({ getUserInfo }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);

  const onFinish = values => {
    setIsSubmitting(true);
    fetch('/api/login', {
      method: 'post',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((response) => {
        if (!response.ok) return Promise.reject(response);
        return response.json();
      })
      .then((resData) => {
        console.log(resData);
        localStorage.setItem('token', resData['access_token']);
        getUserInfo();
        // history.push('/');
        setIsSubmitting(false);
      })
      .catch((error) => {
        if (error.status == 401) {
          setErrorMessage('Sai tên đăng nhập hoặc mật khẩu');
        } else {
          setErrorMessage('Lỗi hệ thống')
        }
        setIsSubmitting(false);
      });
    // console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  // if (isSubmitting) return (
  //  
  // );


  return (
    <Row
      // justify="start"
      // align="bottom"
      style={styles.container}
    >
      <Col span={6}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="tendangnhap"
            rules={[
              {
                required: true,
                message: 'Tên đăng nhập không được bỏ trống!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Mật khẩu không được bỏ trống!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          {/* <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
            {errorMessage && !!errorMessage.length && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: '10px'}}/>}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block loading={isSubmitting}>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;