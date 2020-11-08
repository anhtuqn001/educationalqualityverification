import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';
import { PrinterOutlined } from '@ant-design/icons';


const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
}

const PlanReport = ({ nienkhoaId }) => {
    const [iframeTimeoutId, setIframeTimeoutId] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef(null);

    const exportFile = () => {
        window.location.href = '/api/createkhtdg/' + nienkhoaId ;
    }

    useEffect(()=>{
        const intervalId = setInterval(
            updateIframeSrc, 1000 * 4
        );
        setIframeTimeoutId(intervalId)
    },[]);

    function iframeLoaded() {
        clearInterval(iframeTimeoutId);
        setIsLoading(false);
    }

    function getIframeLink() {
        console.log('load');
        return `https://docs.google.com/gview?url=https://vuonxanh.lihanet.com/api/createkhtdg/${nienkhoaId}&embedded=true`;
    }

    function updateIframeSrc() {
        if(iframeRef.current){
            iframeRef.current.src = getIframeLink();
        }
    }

    return (
        <React.Fragment>
            <Row>
                <Col span={24}>
                    <Button icon={<PrinterOutlined />} type="primary"
                    onClick={exportFile}
                    >In kế hoạch tự đánh giá</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center'}}>
                    {isLoading && <Loading3QuartersOutlined spin style={{ fontSize: 40, color: '#69c0ff' }}/>}
                </Col>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <iframe 
                    src={getIframeLink()}
                    width="830"
                    height="600"
                    frameBorder="0"
                    onError={updateIframeSrc}
                    ref={iframeRef}
                    onLoad={iframeLoaded}
                    ></iframe>
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default PlanReport;
