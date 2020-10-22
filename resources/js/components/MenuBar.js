import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Typography } from 'antd';
import { ProfileOutlined, PaperClipOutlined, UsergroupAddOutlined, ApartmentOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
 
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
    },
    menuItem: {
        color: 'rgba(0, 0, 0, 0.85)'
    }
}

const MenuBar = ({ role }) => {
    if(role == 2)
    return (
        <Header
        style={styles.header}
        >
            <Menu theme="light" mode="horizontal" style={styles.menu}>
                <SubMenu 
                icon={<UsergroupAddOutlined/>} 
                title="Hội Đồng Tự Đánh Giá"
                >
                        <Menu.Item key="setting:1" style={styles.menuItem}><Link to="/creategroup">Tạo nhóm thực hiện nhiệm vụ</Link></Menu.Item>
                        <Menu.Item key="setting:2" style={styles.menuItem}><Link to="/councilestablishment">In quyết định thành lập hội đồng</Link></Menu.Item>
                </SubMenu>
                <SubMenu 
                icon={<ApartmentOutlined/>} 
                title="Phân công đánh giá">
                        <Menu.Item key="setting:3" style={styles.menuItem}><Link to="/assignments">Phân công giao việc</Link></Menu.Item>
                        <Menu.Item key="setting:4" style={styles.menuItem}><Link to="/workinguserslist">In bản phân công</Link></Menu.Item>
                </SubMenu>
                <Menu.Item
                icon={<CalendarOutlined/>}
                key="setting:5"><Link to="/plan">Kế hoạch tự đánh giá</Link></Menu.Item>
                <SubMenu icon={<PaperClipOutlined/>} title="Minh chứng">
                        <Menu.Item key="setting:6" style={styles.menuItem}><Link to="/setupevidences">Thiết lập minh chứng</Link></Menu.Item>
                        <Menu.Item key="setting:7" style={styles.menuItem}><Link to="/evidencereview">Minh chứng đã phân công</Link></Menu.Item>
                        <Menu.Item key="setting:8" style={styles.menuItem}><Link to="/evidenceassignment">Minh chứng chưa phân công</Link></Menu.Item>
                        {/* <Menu.Item key="setting:9" style={styles.menuItem}><Link to="/evidencelist">Bảng danh mục mã minh chứng</Link></Menu.Item> */}
                </SubMenu>
                <SubMenu icon={<ProfileOutlined/>} title="Báo cáo">
                        {/* <Menu.Item key="setting:9" style={styles.menuItem}>Mục lục</Menu.Item>
                        <Menu.Item key="setting:10" style={styles.menuItem}>Cơ sở dữ liệu</Menu.Item>
                        <Menu.Item key="setting:11" style={styles.menuItem}>Kế hoạch tự đánh giá</Menu.Item>
                        <Menu.Item key="setting:12" style={styles.menuItem}>Tổng hợp kết quả tự đánh giá</Menu.Item> */}
                        <Menu.Item key="setting:10" style={styles.menuItem}><Link to="/endreport">Báo cáo tự đánh giá</Link></Menu.Item>
                        <Menu.Item key="setting:13" style={styles.menuItem}>Phụ lục 1</Menu.Item>
                        <Menu.Item key="setting:14" style={styles.menuItem}><Link to="/connotationnote">Phụ lục 2 - Phiếu xác định nội hàm</Link></Menu.Item>
                        <Menu.Item key="setting:15" style={styles.menuItem}>Phụ lục 3</Menu.Item>
                        <Menu.Item key="setting:16" style={styles.menuItem}><Link to="/evidencelist">Phụ lục 4 - Bảng danh mục mã minh chứng</Link></Menu.Item>
                        <Menu.Item key="setting:17" style={styles.menuItem}><Link to="/tieuchievaluation">Phụ lục 5a - Phiếu đánh giá tiêu chí</Link></Menu.Item>
                </SubMenu>
                {/* <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item> */}
            </Menu>
        </Header>
    )

    if(role == 3) {
        return (
            <Header style={styles.header}>
                <Menu theme="light" mode="horizontal" style={styles.menu}>
                <Menu.Item
                    icon={<CalendarOutlined/>}
                    key="setting:1"><Link to="/managetasks">Quản lý công việc</Link></Menu.Item>
                </Menu>
            </Header>
        )
    }
}



export default MenuBar;