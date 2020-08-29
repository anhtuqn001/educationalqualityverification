import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Transfer, Tree, message, Typography, Button } from 'antd';
import { reformatChiMucKeysData, generateTree } from './utils.js';
const { Title, Text } = Typography;

const TreeTransfer = ({ chimucs, tenUser, targetsKeys, selectedsKeys, userId, changeCurrentUserChiMucs }) => {
    const [leftCheckedKeys, setLeftCheckedKeys] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [halfKeys, setHalfKeys] = useState([]);
    const [expandRightKeys, setExpandRightKeys] = useState([]);
    const [rightCheckedKeys, setRightCheckedKeys] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        onExpandAll();
    }, []);


    const onChange = (keys, direction ) => {
        if (direction == 'right') {
            // setTargetKeys([...halfKeys, ...leftCheckedKeys]);
            if(userId) {
                let data = {
                    chimucs : reformatChiMucKeysData(chimucs, leftCheckedKeys, halfKeys),
                    userid : userId
                }
                fetch('/api/applychimuc', {
                    method: 'post',
                    headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        if(!response.ok) return Promise.reject(response);
                        return response.json();
                    })
                    .then((result) => {
                        console.log(result);
                        changeCurrentUserChiMucs(result.chimucs);
                    })
                    .catch((error) => {
                    if(error.status == 401) {
                        if(localStorage.getItem("token") !== null){
                        localStorage.removeItem("token");
                        }
                        history.push('/dangnhap');
                    } else {
                        console.log(error);
                        message.error("Lỗi hệ thống");
                    }
                });
            } else {
                message.warning('Vui lòng chọn thành viên');
            }
        }
        if (direction == 'left') {
            // let newTargetKeys = targetKeys.filter(val => !rightCheckedKeys.includes(val));
            // setTargetKeys(newTargetKeys);
            let data = {
                chimucs : reformatChiMucKeysData(chimucs, rightCheckedKeys).map(i => i.id),
                userid : userId
            }
            fetch('/api/removechimuc', {
                    method: 'post',
                    headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        if(!response.ok) return Promise.reject(response);
                        return response.json();
                    })
                    .then((result) => {
                        console.log(result);
                        changeCurrentUserChiMucs(result.chimucs);
                    })
                    .catch((error) => {
                    if(error.status == 401) {
                        if(localStorage.getItem("token") !== null){
                        localStorage.removeItem("token");
                        }
                        history.push('/dangnhap');
                    } else {
                        console.log(error);
                        message.error("Lỗi hệ thống");
                    }
                });
        }
    }

    const handleExpand = expandedKeys => {
        console.log("onExpand", expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandRightKeys(expandedKeys)
    };

    const onExpandAll = () => {
        const expandedKeys = [];
        const expandMethod = arr => {
          arr.forEach(data => {
            expandedKeys.push(data.key);
            if (data.children) {
              expandMethod(data.children);
            }
          });
        };
        expandMethod(chimucs);  
        setExpandRightKeys(expandedKeys);
      };
    
    const test = () => {
        setLeftCheckedKeys(['0-0-2'])
    }

    return (
        <React.Fragment>
            <Button type="primary" onClick={test}>Test</Button>
            <Transfer
                onChange={onChange}
                titles={[, <Text strong>{tenUser}</Text>]}
                className="tree-transfer"
                render={item => item.title}
                showSelectAll={false}
                disabled={isDisabled}
            >
                {({ direction, onItemSelect, selectedKeys }) => {
                    if (direction === 'left') {
                        return (
                            <Tree
                                blockNode
                                checkable
                                defaultExpandAll
                                checkedKeys={leftCheckedKeys}
                                treeData={generateTree(chimucs, false)}
                                onCheck={(selectedKeys, info) => {
                                    setLeftCheckedKeys(selectedKeys);
                                    setHalfKeys(info.halfCheckedKeys);
                                    let keyEventTarget = info.node.key;
                                    onItemSelect(keyEventTarget, selectedKeys.includes(keyEventTarget));
                                }}
                                height={500}
                            />
                        );
                    } else {
                        return (
                            <Tree
                                blockNode
                                checkable
                                // defaultExpandAll
                                // autoExpandParent
                                treeData={generateTree(chimucs, true, targetsKeys, selectedsKeys)}
                                height={500}
                                expandedKeys={expandRightKeys}
                                onExpand={handleExpand}
                                onCheck={(selectedKeys, info) => {
                                    setRightCheckedKeys(selectedKeys);
                                    let keyEventTarget = info.node.key;
                                    onItemSelect(keyEventTarget, selectedKeys.includes(keyEventTarget));
                                }}

                            />
                        );
                    }
                }}
            </Transfer>
        </React.Fragment>
    );
};

export default TreeTransfer;