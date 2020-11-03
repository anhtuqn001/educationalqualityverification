import React, { useState, useEffect, useContext } from 'react';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { generatekhuvucsTreeData } from '../utils.js';
import ExportBaoCao from './exportBaoCao';
import { LogoutContext } from '../Contexts';



const PhongGiaoDuc = ({ khuvucId }) => {
    const [truongs, settruongs] = useState(null);
    const [currentKey, setCurrentKey] = useState(null);
    const [splitedKey, setSplitedKey] = useState(null);
    const { doLogout } = useContext(LogoutContext);
 
    useEffect(() => {
        fetch('/api/getlisttruong/' + khuvucId, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { truongs } = resData;
            settruongs(truongs);
        }).catch((error) => {
            if (error.status == 401) {
                if (localStorage.getItem("token") !== null) {
                    localStorage.removeItem("token");
                }
                doLogout();
            } else {
                message.error("Lỗi hệ thống");
            }
        })

        
    }, [])

    const handleTieuchiSelect = (key) => {
        console.log('keyArr', key);
        setCurrentKey(key);
        // setSplitedKey(null);
        // let splitedKey = key.split('-');
        // setSplitedKey(splitedKey);
    }

    useEffect(() => {
        console.log('currentKey', currentKey);
    }, [currentKey])

    return (
        <React.Fragment>
            <Row gutter={16}>
                <Col span={6}>
                    <Tree
                        blockNode
                        treeData={generatekhuvucsTreeData(truongs)}
                        height={600}
                        defaultExpand
                        onSelect={(selectedKeys, { selected, selectedNodes, node }) => { handleTieuchiSelect(node.key) }}
                    />
                </Col>
                <Col span={18}>
                    {currentKey && <ExportBaoCao currentKey={currentKey} />}
                </Col>
            </Row>
        </React.Fragment >
        
    );
}

export default PhongGiaoDuc;