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

const Lv4ConnotationNote = ({ truongId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tieuchis, setTieuchis] = useState(null);
    const [currentTieuchi, setCurrentTieuchi] = useState(null);
    const { doLogout } = useContext(LogoutContext);
    // const exportFile = () => {
    //     window.location.href = '/api/exportbctdg/' + truongId;
    // }

    useEffect(() => {
        fetch('/api/gettieuchimuc4/' + truongId, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { tieuchis } = resData;
            console.log('tieuchis', tieuchis);
            setTieuchis(tieuchis);
            // let tieuchisArr = [];
            // console.log('tieuchuans', tieuchuans);
            // tieuchuans.forEach(i => {
            //     let { tieuchis } = i;
            //     if(tieuchis && tieuchis.length > 0) {
            //         tieuchisArr = [...tieuchisArr, ...tieuchis];
            //     }
            // })
            // setTieuchuans(tieuchuans);
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
       let tieuchi = tieuchis.find(i => i.id == id);
       if(tieuchi) {
           setCurrentTieuchi(tieuchi);
       }
    }

    useEffect(() => {
        console.log('currentTieuchi', currentTieuchi);
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
                        treeData={generateTieuChisTreeData(tieuchis)}
                        height={600}
                        onSelect={(selectedKeys, { selected, selectedNodes, node }) => { handleTieuchiSelect(node.id) }}
                    />
                </Col>
                <Col span={18}>
                    <TieuchiDetails tieuchi={currentTieuchi}/>
                </Col>
            </Row>
        </React.Fragment >
    );
}

const generateTieuChisTreeData = (tieuchis) => {
    if(!tieuchis || tieuchis.length == 0) return null;
    return tieuchis.map(i => {
        let { tenchimuc, id } = i;
        return {
            id,
            title: tenchimuc.split(':')[0],
            key: '0-' + id
        } 
    })
}

export default Lv4ConnotationNote;
