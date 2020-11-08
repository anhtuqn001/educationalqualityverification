import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { LogoutContext } from '../../Contexts';
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


const TieuchiReport = ({ tieuchiId }) => {
    const [iframeTimeoutId, setIframeTimeoutId] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef(null);

    const exportFile = () => {
        window.location.href = '/api/exportpdgtcm4/' + tieuchiId;
    }

    useEffect(() => {
        const intervalId = setInterval(
            updateIframeSrc, 1000 * 3
        );
        setIframeTimeoutId(intervalId)
        setIsLoading(true);
    }, [tieuchiId])

    function getIframeLink() {
        console.log('load');
        return `https://docs.google.com/gview?url=https://vuonxanh.lihanet.com/api/exportpdgtcm4/${tieuchiId}&embedded=true`;
    }

    function updateIframeSrc() {
        if(iframeRef.current){
            iframeRef.current.src = getIframeLink();
        }
    }

    function iframeLoaded() {
        clearInterval(iframeTimeoutId);
        setIsLoading(false);
    }
    
    return (
        <React.Fragment>
            <Row style={{ backgroundColor: 'white' }}>
                <Col span={24}>
                    <Button icon={<PrinterOutlined />} type="primary" onClick={exportFile} style={{ margin: '5px' }}>In phiếu đánh giá tiêu chí</Button>
                </Col>
            </Row>
            {tieuchiId && <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    {isLoading && <Loading3QuartersOutlined spin style={{ fontSize: 40, color: '#69c0ff' }} />}
                </Col>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <iframe
                        src={getIframeLink()}
                        width="830"
                        height="550"
                        frameBorder="0"
                        onError={updateIframeSrc}
                        ref={iframeRef}
                        onLoad={iframeLoaded}
                    ></iframe>
                </Col>
            </Row>}
        </React.Fragment >
    );
}

export default TieuchiReport;
