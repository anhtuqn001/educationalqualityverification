

import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { generateTree, handleChimucResult, reformatUserChiMucData } from '../utils.js';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, PrinterOutlined, Loading3QuartersOutlined  } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';



const CouncilEstablishment = ({ truongId }) => {

    const [isLoading, setIsLoading] = useState(true);
    const exportFile = () => {
        window.location.href = '/api/exportqdtlhdtdg/' + truongId;
    }

    const handleOnLoad = () => {
        setIsLoading(false);
        console.log('loaded');
    }
    return (
        <React.Fragment>
            <Row>
                <Col span={24}>
                    <Button icon={<PrinterOutlined />} type="primary" onClick={exportFile}>Xuất dữ liệu</Button>
                </Col>
            </Row>
            {isLoading &&
                <Row>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center', paddingTop : '100px', color: '#40a9ff'}}>
                        <Loading3QuartersOutlined spin style={{ fontSize: 40 }}/>
                    </Col>
                </Row>}
            <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <iframe width="830" height="700" frameBorder="0" src={`https://docs.google.com/gview?url=https://vuonxanh.lihanet.com/api/exportqdtlhdtdg/${truongId}&embedded=true`} onLoad={handleOnLoad}></iframe>
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default CouncilEstablishment;