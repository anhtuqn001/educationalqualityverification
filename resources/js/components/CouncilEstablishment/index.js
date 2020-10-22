

import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { generateTree, handleChimucResult, reformatUserChiMucData } from '../utils.js';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, PrinterOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';

const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
}

const CouncilEstablishment = ({ truongId }) => {
    const [iframeTimeoutId, setIframeTimeoutId] = useState(undefined);
    const [isUpdating, setIsUpdating] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef(null);

    const exportFile = () => {
        window.location.href = '/api/exportqdtlhdtdg/' + truongId ;
    }

    useEffect(()=>{
        const intervalId = setInterval(
            updateIframeSrc, 1000 * 3
        );
        setIframeTimeoutId(intervalId)
        fetch('/api/createqdtlhdtdg/' + truongId, {
            method: 'get',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
                if (!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then((result) => {
                let { success } = result;
                if(success) {
                    console.log('success');   
                    setIsUpdating(false);
                } else {
                    message.error("Lỗi hệ thống");
                }
            })
            .catch((error) => {
                if (error.status == 401) {
                    if (localStorage.getItem("token") !== null) {
                        localStorage.removeItem("token");
                    }
                    doLogout();
                } else {
                    message.error("Lỗi hệ thống");
                }
            });
    },[]);

    function iframeLoaded() {
        clearInterval(iframeTimeoutId);
        setIsLoading(false);
    }
    function getIframeLink() {
        console.log('load');
        return `https://docs.google.com/gview?url=https://vuonxanh.lihanet.com/api/exportqdtlhdtdg/${truongId}&embedded=true`;
    }

    function updateIframeSrc() {
        if(iframeRef.current){
            iframeRef.current.src = getIframeLink();
        }
    }

    const showError = (e) => {
        console.log(e);
        console.log('error');
    }

    if(isUpdating) {
        return <div style={styles.container}>
                    <Spin size="large" />
                </div>
    }
    return (
        <React.Fragment>
            <Row>
                <Col span={24}>
                    <Button icon={<PrinterOutlined />} type="primary"
                    onClick={exportFile}
                    >Xuất dữ liệu</Button>
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

export default CouncilEstablishment;