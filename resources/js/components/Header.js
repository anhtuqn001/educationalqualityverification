import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Typography, Button } from 'antd';
import { useHistory } from "react-router-dom";
import { PoweroffOutlined } from '@ant-design/icons';
import { LogoutContext } from "./Contexts.js";

const { Title, Text } = Typography;

const { Header } = Layout;

const styles = {
    menuBar: {
        backgroundColor: '#096dd9',
        padding: '0px 30px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500'
    },
    img: {
        maxHeight: '90%',
        width: 'auto',
        marginRight: '7px'
    },
    title: {
        display: 'inline-block',
        marginBottom: 0,
        color: 'white'
    }
}

const CustomHeader = ({ tendangnhap }) => {
    const history = useHistory();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { doLogout } = useContext(LogoutContext);

    function handleLogout() {
        if (localStorage.getItem("token") === null) {
            doLogout();
            // setAuthFalse();
        } else {
            setIsLoggingOut(true);
            fetch('/api/logout', {
                method: 'post',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token")
                })
            })
                .then((response) => {
                    if (!response.ok) return Promise.reject(response);
                    return response.json();
                })
                .then((resData) => {
                    setIsLoggingOut(true);
                    localStorage.removeItem('token');
                    //   history.push('/dangnhap');
                    // setAuthFalse();
                    doLogout();
                })
                .catch((error) => {
                    // setErrorMessages(['Lỗi hệ thống'])
                    // error.json().then(res => {
                    //     console.log(res);
                    // })
                    console.log(error);
                });
        };
    }
    return (
        <Header style={styles.menuBar}>
            {/* <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu> */}
            <img src="/images/logo2.png" alt="logo" style={styles.img} />
            <Title level={3} style={styles.title}>PHẦN MỀM KIỂM ĐỊNH CHẤT LƯỢNG GIÁO DỤC</Title>
            <Text style={{ marginLeft: 'auto', marginRight: '10px', color: 'white' }}>Xin chào, {tendangnhap}</Text>
            <LogoutContext.Consumer>
                {({ doLogout }) =>
                    <Button
                        type="primary"
                        style={{ backgroundColor: 'inherit' }}
                        onClick={handleLogout}
                        loading={isLoggingOut}
                        icon={<PoweroffOutlined />}>ĐĂNG XUẤT
                    </Button>
                }
            </LogoutContext.Consumer>

        </Header>
    )
}



export default CustomHeader;