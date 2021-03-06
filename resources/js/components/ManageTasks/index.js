import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { generateTree, handleChimucResult, reformatUserChiMucData } from '../utils.js';
import DetailsTable from './Table.js';
import { applyKeyPropertyForArrItem } from '../utils';
import { LogoutContext } from '../Contexts';
import TextEditor from './TextEditor';
import TextEditor1 from './TextEditor1';
import TieuchiComponent from './TieuchiComponent.js';
import TieuchuanComponent from './TieuchuanComponent.js';
import KetLuanComponent from './KetluanComponent.js';
import EmptyComponent from './EmptyComponent.js';
import Tieuchi4Component from './Tieuchi4Component.js';
import './index.css';
const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
}

const ManageTasks = ({ userId }) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [chimucs, setChimucs] = useState([]);
    const [userChimucs, setUserChimucs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [currentColumns, setCurrentColumns] = useState([]);
    // const [currentDataSource, setcurrentDataSource] = useState([]);
    const [selectingChimuc, setSelectingChimuc] = useState(null);
    const { doLogout } = useContext(LogoutContext);
    useEffect(() => {
        console.log('getting data');
        fetch('/api/getchimucfromuser/' + userId, {
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
                console.log('result.userChimucs', result.userchimucs);
                let handledChimucResult = [...handleChimucResult(result.chimucs, '0-')];
                setChimucs(handledChimucResult);
                onExpandAll(handledChimucResult);
                setUserChimucs(result.userchimucs);
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
            }).then(() => {
                setIsLoading(false);
            });
    }, [])

    useEffect(() => {
        handleUserChimucs(reformatUserChiMucData(userChimucs));
    }, [chimucs, userChimucs]);

    function handleUserChimucs(userChimucs) {
        if(!userChimucs || userChimucs.length == 0 ) return;
        let targetKeys = [];
        let selectedKeys = [];
        let userChimucsId = userChimucs.map(i => i.id);
        let selectedUserChimucsId = userChimucs.filter(i => !i.isHalf).map(i => i.id);
        const loopThroughChiMucsSource = (chimucsArr) => {
            chimucsArr.forEach(i => {
                if (userChimucsId.includes(i.id)) {
                    targetKeys.push(i.key);
                }
                if (selectedUserChimucsId.includes(i.id)) {
                    selectedKeys.push(i.key);
                }
                if (i.children) {
                    loopThroughChiMucsSource(i.children);
                }
            })
        }
        loopThroughChiMucsSource(chimucs);
        setTargetKeys([...targetKeys]);
        setSelectedKeys([...selectedKeys]);
    }

    const onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

    const onExpandAll = (chimucs) => {
        console.log('set expanded keys');
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
        setExpandedKeys(expandedKeys);
      };

    const onSelect = (selectedKeys, info) => {
        let { node: { id } } = info;
        let selectingChimuc = userChimucs.find(i => i.id == id);
        if(selectingChimuc) {
            setSelectingChimuc(selectingChimuc);
        }
        console.log('selectingChimuc', selectingChimuc);
    };

    const updateChimucContent = (chimucId, content) => {
        let chimucIndex = userChimucs.findIndex(i => i.id == chimucId);
        userChimucs[chimucIndex].content = content;
        setUserChimucs([...userChimucs]);
    }

    const updateKetluanContent = (chimucId, content, content2) => {
        let chimucIndex = userChimucs.findIndex(i => i.id == chimucId);
        userChimucs[chimucIndex].content = content;
        userChimucs[chimucIndex].content2 = content2;
        setUserChimucs([...userChimucs]);
    }


    if(isLoading) {
        return <div style={styles.container}>
                    <Spin size="large" />
                </div>
    }

    const getCorrespondingComponent = (loaichimuc) => {
        if(loaichimuc == 6 && selectingChimuc.columns.length > 0) {
            return <DetailsTable selectingChimuc={selectingChimuc} />;
        }
        switch(loaichimuc) {
            case 0:
                return <EmptyComponent selectingChimuc={selectingChimuc}/>;
            case 1:
                return <TextEditor1 selectingChimuc={selectingChimuc} updateChimucContent={updateChimucContent}/>;
            case 2:
                return <DetailsTable selectingChimuc={selectingChimuc} />;
            case 3:
                return <EmptyComponent selectingChimuc={selectingChimuc}/>;
            case 4:
                return <TieuchiComponent selectingChimuc={selectingChimuc}/>;
            case 5:
                return <KetLuanComponent selectingChimuc={selectingChimuc}/>;
            case 6: 
                return <EmptyComponent selectingChimuc={selectingChimuc}/>;
            case 7: 
                return <Tieuchi4Component selectingChimuc={selectingChimuc}/>;
        }
    }
    return (
        <Row gutter={8}>
            <Col span={10}>
                <Tree
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onSelect={onSelect}
                    treeData={generateTree(chimucs, true, targetKeys, selectedKeys)}
                    blockNode={true}
                    height={600}
                />
            </Col>
            <Col span={14}>
            {/* <Button type="primary" onClick={test}>Test Button</Button> */}
            {/* {selectingChimuc && selectingChimuc.loaichimuc == 1 ? 
            <TextEditor selectingChimuc={selectingChimuc} updateChimucContent={updateChimucContent}/> : <DetailsTable selectingChimuc={selectingChimuc} />} */}
            {getCorrespondingComponent(selectingChimuc && selectingChimuc.loaichimuc)}
            </Col>
        </Row>
    );
};

export default ManageTasks;
