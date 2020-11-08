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

const Lv4TieuchiEvaluation = ({ nienkhoaId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tieuchis, setTieuchis] = useState(null);
    // const [tieuchis, setTieuchis] = useState(null);
    const [currentTieuchiId, setCurrentTieuchiId] = useState(null);
    const { doLogout } = useContext(LogoutContext);

    // const exportFile = () => {
    //     window.location.href = '/api/exportbctdg/' + truongId;
    // }

    useEffect(() => {
        fetch('/api/gettieuchimuc4/' + nienkhoaId, {
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

    useEffect(() => {
        console.log(currentTieuchiId);
    }, [currentTieuchiId])


    return (
        <React.Fragment>
            <Row>
                <Col span={6}>
                    <Tree
                        blockNode
                        treeData={generateTieuChisTreeData(tieuchis)}
                        height={600}
                        // expandedKeys={getTieuchuanExpandedKeys(tieuchuans)}
                        onSelect={(selectedKeys, { selected, selectedNodes, node }) => { handleTieuchiSelect(node.id) }}
                    />
                </Col>
                <Col span={18}>
                    {currentTieuchiId && <TieuchiReport tieuchiId={currentTieuchiId} />}
                </Col>
            </Row>
            {/* <div>Đánh giá tiêu chí mức 4</div> */}
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

// export const generateTieuChuansTreeData = (tieuchuans) => {
//     if(!tieuchuans || tieuchuans.length == 0) return null;
//     return tieuchuans.map(i => {
//         let { tenchimuc, id : tieuchuanId, tieuchis } = i;
//         return {
//             title: tenchimuc,
//             key: '0-' + tieuchuanId,
//             selectable: false,
//             children: tieuchis.length > 0 && tieuchis.map(t => {
//                 let { id : tieuchiId , tenchimuc : tenTieuchi } = t;
//                 return {
//                     id : tieuchiId,
//                     title: tenTieuchi.split(':')[0],
//                     key: '0-' + tieuchuanId + '-' + tieuchiId
//                 }
//             })
//         }
//     })
// }

export default Lv4TieuchiEvaluation;
