import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';
import { PrinterOutlined } from '@ant-design/icons';


const EvidenceList = ({ truongId }) => {
    const [isLoading, setIsLoading] = useState(true);

    const exportFile = () => {
        window.location.href = '/api/exportdmmc/' + truongId;
    }

    const handleOnLoad = () => {
        setIsLoading(false);
    }

    return (
        <React.Fragment>
            <Row>
                <Col span={24}>
                    <Button icon={<PrinterOutlined />} type="primary" onClick={exportFile}>In bảng danh mục minh chứng</Button>
                </Col>
            </Row>
            {isLoading &&
                <Row>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px', color: '#40a9ff' }}>
                        <Loading3QuartersOutlined spin style={{ fontSize: 40 }} />
                    </Col>
                </Row>}
            <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <iframe width="830" height="600" frameBorder="0" src={`https://docs.google.com/gview?url=https://vuonxanh.lihanet.com/api/exportdmmc/${truongId}&embedded=true`} onLoad={handleOnLoad}></iframe>
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default EvidenceList;
