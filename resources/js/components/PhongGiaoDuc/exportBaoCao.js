
import React, { useState, useEffect, useContext, useRef } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, message, Spin, Button } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { PrinterOutlined } from '@ant-design/icons';


const ExportBaoCao = ({ currentKey }) => {

    const [src, setSrc] = useState(null);
    const [iframeTimeoutId, setIframeTimeoutId] = useState(undefined);
    const [isUpdating, setIsUpdating] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef(null);

    const exportFile = () => {
        window.location.href = src;
    }

    useEffect(() => {

        // console.log('split key changed',splitKey);
        // if(splitKey.length == 3){
        //     if(splitKey[2]=='0'){
        //         setSrc('/api/exportbctdg/' + splitKey[1]);
        //     }
        //     if(splitKey[2]=='4'){
        //         setSrc('/api/exportdmmc/' + splitKey[1]);
        //     }
        // }
        // if(splitKey.length == 5){

        //     if(splitKey[2]=='2'){
        //         setSrc('/api/exportpxdnh/' + splitKey[4]);
        //     }
        //     if(splitKey[2]=='5'){
        //         setSrc('/api/exportpdgtc/' + splitKey[4]);
        //     }
        // }
        let splitedKey = currentKey.split('-');
        let type = splitedKey && splitedKey[2];
        let truongId = splitedKey && splitedKey[1];
        let tieuchiId = splitedKey && splitedKey.length < 5 ? null : splitedKey[4];
        switch (type) {
            case '0':
                setSrc('/api/exportbctdg/' + truongId);
                break;
            case '4':
                setSrc('/api/exportdmmc/' + truongId);
                break;
            case '2':
                setSrc('/api/exportpxdnh/' + tieuchiId);
                break;
            case '5':
                setSrc('/api/exportpdgtc/' + tieuchiId);
                break;
            default:
                break;
        }
    }, [currentKey])

    useEffect(() => {
        setIsLoading(true);
        console.log('src', src);
        clearInterval(iframeTimeoutId);
        const intervalId = setInterval(updateIframeSrc, 1000 * 3);
        setIframeTimeoutId(intervalId);
    }, [src])

    function iframeLoaded() {
        clearInterval(iframeTimeoutId);
        setIsLoading(false);
    }
    function getIframeLink() {
        console.log('load');
        return 'https://docs.google.com/gview?url=https://vuonxanh.lihanet.com' + src + '&embedded=true';
    }

    function updateIframeSrc() {
        if (iframeRef.current) {
            iframeRef.current.src = getIframeLink();
        }
    }

    return (
        <React.Fragment>
            {/* <Row>
                <Col span={24} style={{ display: 'flex', alignItems: 'center' }}>
                    <Button icon={<PrinterOutlined />} type="primary" onClick={exportFile} style={{ margin: '5px' }}>In báo cáo </Button>
                    {isLoading && <Loading3QuartersOutlined spin style={{ fontSize: 27, color: '#69c0ff', marginLeft: '20px' }} />}
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
            </Row> */}
            <Row>
                <Col span={4} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Button icon={<PrinterOutlined />} type="primary" onClick={exportFile} style={{ margin: '5px' }}>In báo cáo </Button>
                    {isLoading && <Loading3QuartersOutlined spin style={{ fontSize: 27, color: '#69c0ff', margin: '10px' }} />}
                </Col>
                <Col span={20} style={{ display: 'flex', justifyContent: 'center' }}>
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
        </React.Fragment>
    );
}

export default ExportBaoCao;