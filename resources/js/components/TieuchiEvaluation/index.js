import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';
import { PrinterOutlined } from '@ant-design/icons';
import { generateTieuChuansTreeData } from '../utils.js';
import TieuchiReport from './TieuchiReport.js'; 

const TieuchiEvaluation = ({ nienkhoaId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tieuchuans, setTieuchuans] = useState(null);
    // const [tieuchis, setTieuchis] = useState(null);
    const [currentTieuchiId, setCurrentTieuchiId] = useState(null);
    // const exportFile = () => {
    //     window.location.href = '/api/exportbctdg/' + truongId;
    // }

    useEffect(() => {
        fetch('/api/gettieuchuan/' + nienkhoaId, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { tieuchuans } = resData;
            // tieuchuans.forEach(i => {
            //     let { tieuchis } = i;
            //     if(tieuchis && tieuchis.length > 0) {
            //         tieuchisArr = [...tieuchisArr, ...tieuchis];
            //     }
            // })
            setTieuchuans(tieuchuans);
            // setTieuchis(tieuchisArr);  
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

    const handleOnLoad = () => {
        setIsLoading(false);
    }

    const getTieuchuanExpandedKeys = (tieuchuans) => {
        if(!tieuchuans || tieuchuans.length == 0) return null;
        return tieuchuans.map(i => '0-' + i.id);
    }

    const handleTieuchiSelect = (id) => {
       setCurrentTieuchiId(id);
    }


    return (
        <React.Fragment>
            <Row>
                <Col span={6}>
                    <Tree
                        blockNode
                        treeData={generateTieuChuansTreeData(tieuchuans)}
                        height={600}
                        expandedKeys={getTieuchuanExpandedKeys(tieuchuans)}
                        onSelect={(selectedKeys, { selected, selectedNodes, node }) => { handleTieuchiSelect(node.id) }}
                    />
                </Col>
                <Col span={18}>
                    {currentTieuchiId && <TieuchiReport tieuchiId={currentTieuchiId} />}
                </Col>
            </Row>
            {/* <Row>
                <Col span={24}>
                    <Button icon={<PrinterOutlined />} type="primary" onClick={exportFile}>In báo cáo tự đánh giá</Button>
                </Col>
            </Row>''
            {isLoading &&
                <Row>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px', color: '#40a9ff' }}>
                        <Loading3QuartersOutlined spin style={{ fontSize: 40 }} />
                    </Col>
                </Row>}
            <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <iframe width="830" height="600" frameBorder="0" src={`https://docs.google.com/gview?url=https://vuonxanh.lihanet.com/api/exportbctdg/${truongId}&embedded=true`} onLoad={handleOnLoad}></iframe>
                </Col>
            </Row> */}
        </React.Fragment >
    );
}

export default TieuchiEvaluation;
