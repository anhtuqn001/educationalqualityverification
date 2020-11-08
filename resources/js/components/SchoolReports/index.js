import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, Menu, Typography } from 'antd';
import { LogoutContext } from '../Contexts';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';
import { PrinterOutlined } from '@ant-design/icons';
import {
    useParams
} from "react-router-dom";
import SubEndReport from './SubEndReport/index.js';
import SubPlanReport from './SubPlanReport/index.js';
import SubConnotationNote from './SubConnotationNote/index.js'
import SubLv4ConnotationNote from './SubLv4ConnotationNote/index.js';
import SubEvidenceList from './SubEvidenceList/index.js';
import SubTieuchiEvaluation from './SubTieuchiEvaluation/index.js';
import SubLv4TieuchiEvaluation from './SubLv4TieuchiEvaluation/index.js';
import SubCouncilEstablishment from './SubCouncilEstablishment/index.js';
import PreviewMinhchung from '../PreviewMinhChung/index.js';
const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
}

const { SubMenu } = Menu;
const { Text } = Typography;

const SchoolReports = () => {
    const [currentType, setCurrentType] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tenTruong, setTenTruong] = useState(null);
    const { doLogout } = useContext(LogoutContext);

    let { id } = useParams();
    useEffect(() => {
        fetch('/api/tentruong/' + id, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { tentruong } = resData;
            setTenTruong(tentruong);
        }).catch((error) => {
            if (error.status == 401) {
                if (localStorage.getItem("token") !== null) {
                    localStorage.removeItem("token");
                }
                doLogout();
            } else {
                message.error("Lỗi hệ thống");
            }
        }).then(() => {
            setIsLoading(false);
        });
    }, [])

    const handleMenuItemClick = (type) => {
        setCurrentType(type);
    }

    const getAppropiateReport = (type) => {
        switch (type) {
            case 1:
                return <SubEndReport nienkhoaId={id} />
            case 2:
                return <SubPlanReport nienkhoaId={id} />
            case 3:
                return <SubConnotationNote nienkhoaId={id} />
            case 4:
                return <SubLv4ConnotationNote nienkhoaId={id} />
            case 5:
                return <SubEvidenceList nienkhoaId={id} />
            case 6:
                return <SubTieuchiEvaluation nienkhoaId={id} />
            case 7:
                return <SubLv4TieuchiEvaluation nienkhoaId={id} />
            case 8:
                return <SubCouncilEstablishment nienkhoaId={id} />
            case 9: 
                return <PreviewMinhchung nienkhoaId={id} />
            default:
                break;
        }
    }

    if (isLoading) {
        return <div style={styles.container}>
            <Spin
                size="large"
            />
        </div>
    }

    return (
        <React.Fragment>
            <Row style={{ background: 'white' }}>
                <Col span={12}>
                    <Menu mode="horizontal">
                        <Menu.Item onClick={() => { handleMenuItemClick(8) }} key="qltlhd" icon={<AppstoreOutlined />}>
                            Quyết định thành lập Hội đồng
                        </Menu.Item>
                        <Menu.Item onClick={() => { handleMenuItemClick(9) }} key="minhchung" icon={<MailOutlined />}>
                            Minh Chứng
                        </Menu.Item>
                        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Báo cáo">
                            <Menu.ItemGroup>
                                <Menu.Item onClick={() => { handleMenuItemClick(1) }} key="setting:1">Báo cáo tự đánh giá</Menu.Item>
                                <Menu.Item onClick={() => { handleMenuItemClick(2) }} key="setting:2">Phụ lục 1 - Kế hoạch tự đánh giá</Menu.Item>
                                <Menu.Item onClick={() => { handleMenuItemClick(3) }} key="setting:3">Phụ lục 2 - Phiếu xác định nội hàm</Menu.Item>
                                <Menu.Item onClick={() => { handleMenuItemClick(4) }} key="setting:4">Phụ lục 3 - Phiếu xác định nội hàm Mức 4</Menu.Item>
                                <Menu.Item onClick={() => { handleMenuItemClick(5) }} key="setting:5">Phụ lục 4 - Bảng danh mục mã minh chứng</Menu.Item>
                                <Menu.Item onClick={() => { handleMenuItemClick(6) }} key="setting:6">Phụ lục 5a - Phiếu đánh giá tiêu chí</Menu.Item>
                                <Menu.Item onClick={() => { handleMenuItemClick(7) }} key="setting:7">Phụ lục 5b - Phiếu đánh giá tiêu chí Mức 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                    </Menu>
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <div style={{ marginRight: '5px' }}>
                        <Text strong>{tenTruong}</Text>
                    </div>
                </Col>
            </Row>
            <div style={{ marginTop: '10px' }}>
                {getAppropiateReport(currentType)}
            </div>
        </React.Fragment>
    );
}

export default SchoolReports;
