import React, { Component, useState, useEffect, useContext } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { handleMinhchungRawData, assignMinhchungToTieuchiAndUser, handleMinhchungRawDataToExportData } from '../utils.js';
import { LogoutContext } from '../Contexts.js';
import { message, Spin, Upload, Row, Col, Tree, Button, Table, Typography, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Preview from './Preview.js';

const { Link } = Typography;
const { Dragger } = Upload;

const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
    deleteButton: {
        color: 'white',
        backgroundColor: '#f5222d',
        borderColor: '#f5222d'
    }
}

const PreviewMinhchung = ({ nienkhoaId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { doLogout } = useContext(LogoutContext);
    const [tieuchis, setTieuchis] = useState(null);
    const [minhchungs, setMinhchungs] = useState(null);
    const [currentMinhchung, setCurrentMinhchung] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [src, setSrc] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetch('/api/gettieuchiwithminhchungfiles/' + nienkhoaId, {
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
            let totalMinhchungs = [];
            tieuchis.forEach(i => {
                let { minhchungs } = i;
                totalMinhchungs = [...totalMinhchungs, ...minhchungs];
            });
            setTieuchis(tieuchis);
            setMinhchungs(totalMinhchungs);
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

    useEffect(() => {
        setSrc(null);
    }, [currentMinhchung])


    const handleMinhchungSelect = (minhchungId) => {
        let minhchung = minhchungs.find(i => i.id == minhchungId);
        if (minhchung) {
            setCurrentMinhchung([minhchung]);
        }
    }

    const updateCreatedMinhChungFile = (minhchungId, minhchungFile) => {
        let minhchungIndex = minhchungs.findIndex(i => i.id == parseInt(minhchungId));
        if (minhchungIndex >= 0) {
            minhchungs[minhchungIndex].files = [...minhchungs[minhchungIndex].files, minhchungFile];
        }
        setMinhchungs([...minhchungs]);
    }

    const showUploadModal = () => {
        setIsUploadModalOpen(true);
    }

    const hideUploadModal = () => {
        setIsUploadModalOpen(false);
    }

    const handleFileClicked = (fileName) => {
        setSrc(fileName);
    }

    const removeMinhChungFile = (fileId) => {
        setIsDeleting(true);
        let data = {
            id: fileId,
            _method: "DELETE"
        }
        fetch('/api/removeminhchungfile', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { success } = resData;
            if (success) {
                removeMinhChungFileOnClient(fileId);
                message.success("Xóa tập tin minh chứng thành công");
            }
        }).catch((error) => {
            if (error.status == 401) {
                if (localStorage.getItem("token") !== null) {
                    localStorage.removeItem("token");
                }
                doLogout();
            } else {
                console.log(error);
                message.error("Lỗi hệ thống");
            }
        }).then(() => {
            setIsDeleting(false);
        });
    }

    const removeMinhChungFileOnClient = (fileId) => {
        let [minhchung] = currentMinhchung;
        if (minhchung) {
            let { id } = minhchung;
            let minhchungIndex = minhchungs.findIndex(i => i.id == id);
            if (minhchungIndex >= 0) {
                minhchungs[minhchungIndex].files = [...minhchungs[minhchungIndex].files.filter(i => i.id !== fileId)];
            }
            setCurrentMinhchung([{ ...minhchungs[minhchungIndex] }])
        }
    }

    const minhchungColumns = [
        {
            title: 'Mã minh chứng',
            dataIndex: 'maminhchung',
            width: '10%'
        },
        {
            title: 'Tên minh chứng',
            dataIndex: 'tenminhchung',
            width: '30%',
            render: item => <span style={{ whiteSpace: 'pre-line' }}>{item}</span>
        },
        {
            title: 'Số, ngày ban hành, hoặc thời điểm khảo sát, điều tra, phỏng vấn, quan sát',
            dataIndex: 'songaybanhanh',
            width: '15%',
            render: item => <span style={{ whiteSpace: 'pre-line' }}>{item}</span>
        },
        {
            title: 'Nơi ban hành hoặc nhóm, cá nhân thực hiện',
            dataIndex: 'noibanhanh',
            width: '10%',
            render: item => <span style={{ whiteSpace: 'pre-line' }}>{item}</span>
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghichu',
            width: '10%',
            render: item => <span style={{ whiteSpace: 'pre-line' }}>{item}</span>
        },
        {
            title: <div style={{ justifyContent: 'center' }}>Tập tin</div>,
            dataIndex: 'files',
            width: '35%',
            render: files => files.map(i =>
                <div>
                    <Link onClick={() => { handleFileClicked(i.tenluutru) }}>
                        - {i.ten}
                    </Link>
                </div>)
        }
    ]

    if (isLoading) {
        return <div style={styles.container}>
            <Spin
                size="large"
            />
        </div>
    }

    return (
        <React.Fragment>
            <Row style={{ marginTop: '10px' }} gutter={16}>
                <Col span={6}>
                    <Tree
                        blockNode
                        treeData={generateMinhChungsTreeData(tieuchis)}
                        height={600}
                        onSelect={(selectedKeys, { selected, selectedNodes, node }) => { handleMinhchungSelect(node.id) }}
                        expandedKeys={getTieuchiExpandedKeys(tieuchis)}
                    />
                </Col>
                <Col span={18}>
                    {currentMinhchung &&
                        <React.Fragment>
                            <Table
                                columns={minhchungColumns}
                                dataSource={currentMinhchung}
                                bordered
                                pagination={false}
                            ></Table>
                            <Row style={{ background: 'white', paddingTop: '10px' }}>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                                    {src && <Preview src={src} />}
                                </Col>
                            </Row>
                        </React.Fragment>
                    }
                </Col>
            </Row>
        </React.Fragment>
    );
}


const handleMinhchungData = (minhchungs) => {
    // if (!user || !user.minhchungs || user.minhchungs.length == 0) return [];
    // let { minhchungs } = user;
    if (!minhchungs || minhchungs.length == 0) return []
    let tieuchiArr = [...new Set(minhchungs.map(i => i.tieuchi.tenchimuc))];
    let handledMinhchung = tieuchiArr.map((i, index) => {
        let belongedMinhChungs = [...minhchungs.filter(j => j.tieuchi.tenchimuc == i)
            .map(j => ({
                id: j.id,
                key: j.id,
                title: j.maminhchung,
                tenminhchung: j.tenminhchung,
            }))
        ];
        return {
            key: '0-' + index,
            title: i,
            children: belongedMinhChungs
        }
    })
    return handledMinhchung;
}

const getTieuchiExpandedKeys = (tieuchis) => {
    if (!tieuchis || tieuchis.length == 0) return [];
    return tieuchis.map((i, index) => {
        return '0-' + i.id;
    })
}

const generateMinhChungsTreeData = (tieuchis) => {
    if (!tieuchis || tieuchis.length == 0) return null;
    return tieuchis.map(i => {
        let { tenchimuc, id: tieuchiId, minhchungs, minhchungthamkhaos } = i
        let totalMinhChungs = [...minhchungs, ...minhchungthamkhaos];
        return {
            title: tenchimuc,
            key: '0-' + tieuchiId,
            selectable: false,
            children: minhchungs.length > 0 && totalMinhChungs.map(m => {
                let { id, maminhchung } = m;
                return {
                    id,
                    title: maminhchung,
                    key: '0-' + tieuchiId + '-' + id
                }
            })
        }
    });
}

export default PreviewMinhchung;