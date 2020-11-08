import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';
import { PrinterOutlined } from '@ant-design/icons';
import { generateTieuChuansTreeData } from '../utils.js';
import TieuchiDetails from './TieuchiDetails.js';

const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
}

const ConnotationNote = ({ nienkhoaId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tieuchuans, setTieuchuans] = useState(null);
    const [tieuchis, setTieuchis] = useState(null);
    const [currentTieuchuan, setCurrentTieuchuan] = useState(null);
    const [currentTieuchi, setCurrentTieuchi] = useState(null);
    // const exportFile = () => {
    //     window.location.href = '/api/exportbctdg/' + truongId;
    // }

    useEffect(() => {
        fetch('/api/gettieuchuanwithchibao/' + nienkhoaId, {
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
            let tieuchisArr = [];
            console.log('tieuchuans', tieuchuans);
            tieuchuans.forEach(i => {
                let { tieuchis } = i;
                if(tieuchis && tieuchis.length > 0) {
                    tieuchisArr = [...tieuchisArr, ...tieuchis];
                }
            })
            setTieuchuans(tieuchuans);
            setTieuchis(tieuchisArr);  
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
       let tieuchi = tieuchis.find(i => i.id == id);
       let tieuchuan = tieuchuans.find(i => i.id == tieuchi.chimucchaid)
       if(tieuchi) {
           setCurrentTieuchi(tieuchi);
       }
       
       if(tieuchuan) {
           setCurrentTieuchuan(tieuchuan.tenchimuc);
       }
       
    }

    useEffect(() => {
        console.log(currentTieuchi);
    }, [currentTieuchi])

    if (isLoading) {
        return <div style={styles.container}>
            <Spin
                size="large"
            />
        </div>
    }

    return (
        <React.Fragment>
            <Row gutter={16}>
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
                    {/* {currentTieuchiId && <TieuchiReport tieuchiId={currentTieuchiId} />} */}
                    <TieuchiDetails tieuchi={currentTieuchi} tieuchuan={currentTieuchuan}/>
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default ConnotationNote;
