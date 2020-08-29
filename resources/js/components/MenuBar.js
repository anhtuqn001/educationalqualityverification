import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Typography } from 'antd';
import { ProfileOutlined, PaperClipOutlined, UsergroupAddOutlined, ApartmentOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { SubMenu } = Menu;

const { Header } = Layout;

const styles = {
    header: {
        backgroundColor: 'white',
        padding: '0',
        // color: 'rgba(0, 0, 0, 0.85)'
    },
    menu: {
        color: 'rgba(0, 0, 0, 0.85)'
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

const MenuBar = () => {
    return (
        <Header
        style={styles.header}
        >
            <Menu theme="light" mode="horizontal" style={styles.menu}>
                <SubMenu 
                icon={<UsergroupAddOutlined/>} 
                title="Hội Đồng Tự Đánh Giá">
                        <Menu.Item key="setting:1" style={{color: 'rgba(0, 0, 0, 0.85)'}}><a href="/creategroup">Tạo nhóm thực hiện nhiệm vụ</a></Menu.Item>
                        <Menu.Item key="setting:2" style={{color: 'rgba(0, 0, 0, 0.85)'}}>In quyết định thành lập hội đồng</Menu.Item>
                </SubMenu>
                <SubMenu 
                icon={<ApartmentOutlined/>} 
                title="Phân công đánh giá">
                        <Menu.Item key="setting:1" style={{color: 'rgba(0, 0, 0, 0.85)'}}><a href="/assignments">Phân công giao việc</a></Menu.Item>
                        <Menu.Item key="setting:2" style={{color: 'rgba(0, 0, 0, 0.85)'}}>In bản phân công</Menu.Item>
                </SubMenu>
                <Menu.Item
                icon={<CalendarOutlined/>}
                key="1">Kế hoạch tự đánh giá</Menu.Item>
                <SubMenu icon={<PaperClipOutlined/>} title="Minh chứng">
                        <Menu.Item key="setting:1" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Thiết lập minh chứng</Menu.Item>
                        <Menu.Item key="setting:2" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Phân công minh chứng</Menu.Item>
                        <Menu.Item key="setting:3" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Bảng danh mục mã minh chứng</Menu.Item>
                </SubMenu>
                <SubMenu icon={<ProfileOutlined/>} title="Báo cáo">
                        <Menu.Item key="setting:1" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Mục lục</Menu.Item>
                        <Menu.Item key="setting:2" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Cơ sở dữ liệu</Menu.Item>
                        <Menu.Item key="setting:3" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Kế hoạch tự đánh giá</Menu.Item>
                        <Menu.Item key="setting:4" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Tổng hợp kết quả tự đánh giá</Menu.Item>
                        <Menu.Item key="setting:5" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Phụ lục 1</Menu.Item>
                        <Menu.Item key="setting:6" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Phụ lục 2</Menu.Item>
                        <Menu.Item key="setting:7" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Phụ lục 3</Menu.Item>
                        <Menu.Item key="setting:8" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Phụ lục 4</Menu.Item>
                        <Menu.Item key="setting:9" style={{color: 'rgba(0, 0, 0, 0.85)'}}>Phụ lục 5</Menu.Item>
                </SubMenu>
                {/* <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item> */}
            </Menu>
        </Header>
    )
}



export default MenuBar;