import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, Typography, Table } from 'antd';
import { LogoutContext } from '../Contexts';
import ReactHtmlParser from 'react-html-parser';
import { EditTwoTone } from '@ant-design/icons';
import EditModal from './EditModal.js';

const { Paragraph, Text } = Typography;



const getHdtdgData = (nienkhoa) => {
    let { nhoms_with_users } = nienkhoa;
    if (nhoms_with_users && nhoms_with_users.filter(i => i.loainhom == 1).length > 0) {
        let { users } = nhoms_with_users.filter(i => i.loainhom == 1)[0];
        if (users.length > 0) {
            return users.map((item, index) => ({
                index: index + 1,
                hoten: item.hoten,
                chucvu: item.chucvu,
                nhiemvu: item.nhiemvu
            }))
        }
        return [];
    }
}

const getNtkData = (nienkhoa) => {
    let { nhoms_with_users } = nienkhoa;
    if (nhoms_with_users && nhoms_with_users.filter(i => i.loainhom == 2).length > 0) {
        let { users } = nhoms_with_users.filter(i => i.loainhom == 2)[0];
        if (users.length > 0) {
            return users.map((item, index) => ({
                index: index + 1,
                hoten: item.hoten,
                chucvu: item.chucvu,
                nhiemvu: item.nhiemvu
            }))
        }
        return [];
    }
}

const getNhomData = (nienkhoa) => {
    let { nhoms_with_users } = nienkhoa;
    if (nhoms_with_users && nhoms_with_users.filter(i => i.loainhom == 0).length > 0) {
        let nhoms = nhoms_with_users.filter(i => i.loainhom == 0);
        let totalUsers = [];
        nhoms.forEach(i => {
            let { users } = i;
            users = users.map((u, index) => ({
                tennhom: i.tennhom,
                hoten: u.hoten,
                chucvu: u.chucvu,
                ghichu: i.ghichu,
                rowSpan: index == 0 ? users.length : 0
            }));
            totalUsers = [...totalUsers, ...users];
        })
        return totalUsers;
    }
}

const getPhancongData = (nienkhoa) => {
    let { tieuchuans_with_chibaos: tieuchuans } = nienkhoa;
    let totalTieuchis = [];
    if (tieuchuans && tieuchuans.length > 0) {
        let indexCounter = 1;
        tieuchuans.forEach(i => {
            let { tieuchis } = i;
            if (tieuchis && tieuchis.length > 0) {
                tieuchis = tieuchis.map(j => ({
                    id: j.id,
                    index: indexCounter++,
                    tenchimuc: j.tenchimuc,
                    users: j.users,
                    ghichu2: j.ghichu2
                }));
                totalTieuchis = [...totalTieuchis, ...tieuchis]
            }
        })
    }
    return totalTieuchis;
}

const getNguonLucData = (nienkhoa) => {
    let { tieuchuans_with_chibaos: tieuchuans } = nienkhoa;
    let totalTieuchis = [];
    if (tieuchuans && tieuchuans.length > 0) {
        tieuchuans.forEach((i, tieuchuanIndex) => {
            let { tieuchis } = i;
            tieuchis = tieuchis.map((t, tieuchiIndex) => (
                {
                    ...t,
                    rowSpan: tieuchiIndex == 0 ? tieuchis.length : 0,
                    tieuchuan: tieuchuanIndex  + 1 
                })
            )
            if (tieuchis && tieuchis.length > 0) {
                totalTieuchis = [...totalTieuchis, ...tieuchis];
            }
        })
    }
    return totalTieuchis.map((item, index) => {
        return {
            id : item.id,
            tieuchuan: item.tieuchuan,
            tieuchi: item,
            nguonluc: item.nguonluc,
            thoidiem: item.thoidiem,
            ghichu: item.ghichu, 
            rowSpan: item.rowSpan
        };
    })
}

const getThoigianHoatdongData = (nienkhoa) => {
    let { thoigianhoatdongs } = nienkhoa;
    return thoigianhoatdongs.map(i => ({
        id: i.id,
        thoigian: i.thoigian,
        hoatdong: i.hoatdong
    }))
}




const Plan = ({ nienkhoaId }) => {
    const [values, setValues] = useState(['Demo1', 'Demo2', 'Demo3']);
    const [data, setData] = useState(null);
    const { doLogout } = useContext(LogoutContext);
    const [isLoading, setIsLoading] = useState(true);
    const [nienkhoa, setNienkhoa] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTarget, setEditingTarget] = useState(null);
    const [truong, setTruong] = useState(null);

    const hdtdgColumns = [
        {
            title: <Text strong>TT</Text>,
            dataIndex: 'index',
            align: 'center'
        },
        {
            title: <Text strong>Họ và tên</Text>,
            dataIndex: 'hoten',
            align: 'center'
        },
        {
            title: <Text strong>Chức vụ</Text>,
            dataIndex: 'chucvu',
            align: 'center'
        },
        {
            title: <Text strong>Nhiệm vụ</Text>,
            dataIndex: 'nhiemvu',
            align: 'center'
        }
    ]
    
    const ntkColumns = [
        {
            title: <Text strong>TT</Text>,
            dataIndex: 'index',
            align: 'center'
        },
        {
            title: <Text strong>Họ và tên</Text>,
            dataIndex: 'hoten',
            align: 'center'
        },
        {
            title: <Text strong>Chức danh, Chức vụ</Text>,
            dataIndex: 'chucvu',
            align: 'center'
        },
        {
            title: <Text strong>Nhiệm vụ</Text>,
            dataIndex: 'nhiemvu',
            align: 'center'
        }
    ]
    
    const nhomColumns = [
        {
            title: <Text strong>TT</Text>,
            dataIndex: 'tennhom',
            align: 'center',
            render: (value, record, index) => {
                const obj = {
                    children:value,
                    props: {
                        rowSpan: record.rowSpan
                    }
                }
                return obj;
            }
        },
        {
            title: <Text strong>Họ và tên</Text>,
            dataIndex: 'hoten',
            align: 'center'
        },
        {
            title: <Text strong>Chức danh, Chức vụ</Text>,
            dataIndex: 'chucvu',
            align: 'center'
        },
        {
            title: <Text strong>Ghi chú</Text>,
            dataIndex: 'ghichu',
            align: 'center',
            render: (value, record, index) => {
                const obj = {
                    children:value,
                    props: {
                        rowSpan: record.rowSpan
                    }
                }
                return obj;
            }
        }
    ]
    
    const phancongColumns = [
        {
            title: <Text strong>TT</Text>,
            dataIndex: 'index'
        },
        {
            title: <Text strong>Tiêu chí</Text>,
            dataIndex: 'tenchimuc'
        },
        {
            title: <Text strong>Nhóm công tác, cá nhân chịu trách nhiệm</Text>,
            dataIndex: 'users',
            render: users => {
                if (users && users.length > 0) {
                    return users.map(i => <div>- {i.hoten}</div>)
                }
                return []
            }
        },
        {
            title: <Text strong>Ghi chú</Text>,
            dataIndex: 'ghichu2',
            render: (ghichu2, record) => {
                return <React.Fragment>
                    <div style={{ marginRight: '5px', display: 'inline-block' }}>{ReactHtmlParser(ghichu2)}</div><span><EditTwoTone onClick={() => {
                        setAppropiateTarget(record.id, 'ghichu2', ghichu2, 2);
                    }} /></span>
                </React.Fragment>
            }
        }
    ]

    // const getTransform = () => ({
    //     transform : function(node) {
    //         console.log('node', node);
    //         // do not render any <span> tags
    //         if (node.type === 'tag' && node.name === 'p') {
    //         return <p style={{ fontStyle: 'italic' }}>{node.data}</p>;
    //         }
    //       }
    // })
    
    const nguonlucColumns = [
        {
            title: <Text strong>Tiêu chuẩn</Text>,
            dataIndex: 'tieuchuan',
            align: 'center',
            render: (value, record, index) => {
                const obj = {
                    children:value,
                    props: {
                        rowSpan: record.rowSpan
                    }
                }
                return obj;
            }
        },
        {
            title: <Text strong>Tiêu chí</Text>,
            dataIndex: 'tieuchi',
            render: item => {
                let { tenchimuc, chibaos } = item;
                let includingChiBaos = ['Mức 1:', 'Mức 2:', 'Mức 3:'];
                chibaos = chibaos.filter(i => i.loai == 2 || includingChiBaos.includes(i.tieude)).map(i => <div>{i.tieude}</div>);
                return (
                    <React.Fragment>
                        <div>{tenchimuc}</div>
                        {chibaos}
                    </React.Fragment>
                )
            }
        },
        {
            title: <Text strong>Các nguồn lực cần được huy động / cung cấp</Text>,
            dataIndex: 'nguonluc',
            render: (nguonluc, record) => {
                return <React.Fragment>
                    <div style={{ marginRight: '5px', display: 'inline-block' }}>{ReactHtmlParser(nguonluc)}</div><span><EditTwoTone onClick={() => {
                        setAppropiateTarget(record.id, 'nguonluc', nguonluc, 3);
                    }} /></span>
                </React.Fragment>
            }
        },
        {
            title: <Text strong>Thời điểm huy động</Text>,
            dataIndex: 'thoidiem',
            render: (thoidiem, record) => {
                return <React.Fragment>
                    <div style={{ marginRight: '5px', display: 'inline-block' }}>{ReactHtmlParser(thoidiem)}</div><span><EditTwoTone onClick={() => {
                        setAppropiateTarget(record.id, 'thoidiem', thoidiem, 3);
                    }} /></span>
                </React.Fragment>
            }
        },
        {
            title: <Text strong>Ghi chú</Text>,
            dataIndex: 'ghichu',
            render: (ghichu, record) => {
                return <React.Fragment>
                    <div style={{ marginRight: '5px', display: 'inline-block' }}>{ReactHtmlParser(ghichu)}</div><span><EditTwoTone onClick={() => {
                        setAppropiateTarget(record.id, 'ghichu', ghichu, 3);
                    }} /></span>
                </React.Fragment>
            }
        }
    ]
    
    const thoigianhoatdongColumns = [
        {
            title: <Text strong>Thời gian</Text>,
            dataIndex: 'thoigian',
            render: (thoigian, record) => {
                return <React.Fragment>
                    <div style={{ marginRight: '5px', display: 'inline-block' }}>{ReactHtmlParser(thoigian)}</div><span><EditTwoTone onClick={() => {
                        setAppropiateTarget(record.id, 'thoigian', thoigian, 4)
                    }} /></span>
                </React.Fragment>
            }
        },
        {
            title: <Text strong>Hoạt động</Text>,
            dataIndex: 'hoatdong',
            render: (hoatdong, record) => {
                return <React.Fragment>
                    <div style={{ marginRight: '5px', display: 'inline-block' }}>{ReactHtmlParser(hoatdong)}</div><span><EditTwoTone onClick={() => {
                        setAppropiateTarget(record.id, 'hoatdong', hoatdong, 4)
                    }} /></span>
                </React.Fragment>
            }
        }
    ]

    useEffect(() => {
        fetch('/api/kehoachtdg/' + nienkhoaId, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { nienkhoa } = resData;
            let { truong } = nienkhoa;
            console.log(nienkhoa);
            setTruong(truong);
            setNienkhoa(nienkhoa);
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

    const hideModal = () => {
        setIsModalOpen(false);
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const setAppropiateTarget = (id, index, value, type) => {       
        let editingTarget = {
            id,
            index,
            value,
            type
        }
        setEditingTarget(editingTarget);
        showModal();
        return;
    }

    const updateTarget = (target, index, type) => {
        switch(type) {
            case 1:
                nienkhoa.kehoach[index] = target[index];
                setNienkhoa({...nienkhoa});
                break;
            case 2:
            case 3:
                let { chimucchaid, id : tieuchiId } = target;
                let tieuchuanIndex = nienkhoa.tieuchuans_with_chibaos.findIndex(i => i.id == chimucchaid);
                if(tieuchuanIndex >= 0) {
                    let tieuchiIndex = nienkhoa.tieuchuans_with_chibaos[tieuchuanIndex].tieuchis.findIndex(i => i.id == tieuchiId);
                    if(tieuchiId >= 0) {
                        nienkhoa.tieuchuans_with_chibaos[tieuchuanIndex].tieuchis[tieuchiIndex][index] = target[index];
                        setNienkhoa({...nienkhoa});
                    }
                }
                break;
            case 4:
               let thoigianhoatdongIndex = nienkhoa.thoigianhoatdongs.findIndex(i => i.id == target.id);
               if(thoigianhoatdongIndex >= 0){
                   nienkhoa.thoigianhoatdongs[thoigianhoatdongIndex][index] = target[index];
                   setNienkhoa({...nienkhoa});
               }
            break;
        }
    }
 
    // const data = values.map((i, index) => ({ [index] : [index, i]}));
    return (
        <div style={{ fontSize: 16, fontFamily: "'Times New Roman', Times, serif", maxHeight: '600px', overflow: 'auto' }}>
            <EditModal isOpen={isModalOpen} hideModal={hideModal} editingTarget={editingTarget} updateTarget={updateTarget}></EditModal>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <Row>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <div>{truong && truong.tentruong.toUpperCase()}</div>
                            <div><Text strong>HỘI ĐỒNG TỰ ĐÁNH GIÁ</Text></div>
                            <Row>
                                <Col span={12} offset={6}>
                                    <hr />
                                </Col>
                            </Row>
                            <div style={{ marginRight: '5px', display: 'inline-block' }}>{nienkhoa && nienkhoa.kehoach && ReactHtmlParser(nienkhoa.kehoach.so)}</div>
                            <span><EditTwoTone onClick={() => {
                                setAppropiateTarget(nienkhoa.kehoach.id, 'so', nienkhoa.kehoach.so, 1);
                            }} /></span>
                        </Col >
                        <Col span={18} style={{ textAlign: 'center' }}>
                            <div><Text strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text></div>
                            <div><Text strong>Độc lập - Tự do - Hạnh phúc</Text></div>
                            <Row>
                                <Col span={8} offset={8}>
                                    <hr />
                                </Col>
                            </Row>
                            <div style={{ marginRight: '5px', display: 'inline-block', fontStyle: 'italic' }}>{nienkhoa && nienkhoa.kehoach && ReactHtmlParser(nienkhoa.kehoach.ngaythang)}</div>
                            <span><EditTwoTone onClick={() => {
                                setAppropiateTarget(nienkhoa.kehoach.id, 'ngaythang', nienkhoa.kehoach.ngaythang, 1);
                            }} /></span>
                        </Col>
                    </Row>
                    <div style={{ paddingLeft: '10px' }}><Text strong>I. Mục đích tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{nienkhoa && nienkhoa.kehoach && ReactHtmlParser(nienkhoa.kehoach.mucdich)}</div>
                    <span><EditTwoTone onClick={() => {
                        setAppropiateTarget(nienkhoa.kehoach.id, 'mucdich', nienkhoa.kehoach.mucdich, 1);
                    }} /></span>
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>II. Phạm vi tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{nienkhoa && nienkhoa.kehoach && ReactHtmlParser(nienkhoa.kehoach.phamvi)}</div>
                    <span><EditTwoTone onClick={() => {
                        setAppropiateTarget(nienkhoa.kehoach.id, 'phamvi', nienkhoa.kehoach.phamvi, 1);
                    }} /></span>
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>III. Công cụ tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{nienkhoa && nienkhoa.kehoach && ReactHtmlParser(nienkhoa.kehoach.congcu)}</div>
                    <span><EditTwoTone onClick={() => {
                        setAppropiateTarget(nienkhoa.kehoach.id, 'congcu', nienkhoa.kehoach.congcu, 1);
                    }} /></span>
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>IV. Hội đồng tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px' }}>1. Thành phần Hội đồng tự đánh giá</div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{nienkhoa && nienkhoa.kehoach && ReactHtmlParser(nienkhoa.kehoach.hoidong)}</div>
                    <span><EditTwoTone onClick={() => {
                        setAppropiateTarget(nienkhoa.kehoach.id, 'hoidong', nienkhoa.kehoach.hoidong, 1);
                    }} /></span>
                    <div style={{ paddingLeft: '10px' }}>{`Hội đồng gồm có ${nienkhoa && nienkhoa['nhoms_with_users'].filter(i => i.loainhom == 1)[0].users.length} thành viên (Danh sách kèm theo).`}</div>
                    {nienkhoa && nienkhoa['nhoms_with_users'].filter(i => i.loainhom == 1)[0].users.length > 0 &&
                        <Table
                            pagination={false}
                            columns={hdtdgColumns}
                            dataSource={getHdtdgData(nienkhoa)}
                            bordered
                        ></Table>
                    }
                    <div style={{ paddingLeft: '10px' }}>2. Nhóm thư ký và các nhóm công tác (Danh sách kèm theo)</div>
                    <div style={{ paddingLeft: '10px' }}>a. Nhiệm vụ cụ thể cho nhóm thư ký</div>
                    {nienkhoa && nienkhoa['nhoms_with_users'].filter(i => i.loainhom == 2)[0].users.length > 0 &&
                        <Table
                            pagination={false}
                            columns={ntkColumns}
                            dataSource={getNtkData(nienkhoa)}
                            bordered
                        ></Table>
                    }
                    <div style={{ paddingLeft: '10px' }}>b. Nhiệm vụ cụ thể cho nhóm công tác</div>
                    {nienkhoa && nienkhoa['nhoms_with_users'].filter(i => i.loainhom == 0).length > 0 &&
                        <Table
                            pagination={false}
                            columns={nhomColumns}
                            dataSource={getNhomData(nienkhoa)}
                            bordered
                        ></Table>
                    }
                    <div style={{ paddingLeft: '10px' }}>3. Phân công thực hiện</div>
                    {nienkhoa &&
                        <Table
                            pagination={false}
                            columns={phancongColumns}
                            dataSource={getPhancongData(nienkhoa)}
                            bordered
                        ></Table>
                    }
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>V. Tập huấn nghiệp vụ tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{nienkhoa && nienkhoa.kehoach && ReactHtmlParser(nienkhoa.kehoach.thoigian)}</div><span><EditTwoTone onClick={() => {
                        setAppropiateTarget(nienkhoa.kehoach.id, 'thoigian', nienkhoa.kehoach.thoigian, 1);
                    }} /></span>
                    <div style={{ paddingLeft: '10px', marginRight: '5px' }}>2) Thành phần: Hội đồng tự đánh giá, nhóm thư ký, các nhóm công tác và các giáo viên, nhân viên có liên quan.</div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px' }}>3) Nội dung: Tập huấn nghiệp vụ tự đánh giá</div>
                </Col>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>VI. Dự kiến các nguồn lực và thời điểm cần huy động </Text></div>
                    {nienkhoa && <Table
                        columns={nguonlucColumns}
                        dataSource={getNguonLucData(nienkhoa)}
                        bordered
                        pagination={false}
                    />
                    }
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>VII. Dự kiến thuê chuyên gia tư vấn để giúp hội đồng triển khai TĐG:</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{nienkhoa && nienkhoa.kehoach && ReactHtmlParser(nienkhoa.kehoach.thuechuyengia)}</div><span><EditTwoTone onClick={() => {
                        setAppropiateTarget(nienkhoa.kehoach.id, 'thuechuyengia', nienkhoa.kehoach.thuechuyengia, 1);
                    }} /></span>
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>VIII. Lập bảng danh mục mã minh chứng:</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{nienkhoa && nienkhoa.kehoach && ReactHtmlParser(nienkhoa.kehoach.minhchung)}</div><span><EditTwoTone onClick={() => {
                        setAppropiateTarget(nienkhoa.kehoach.id, 'minhchung', nienkhoa.kehoach.minhchung, 1);
                    }} /></span>
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>IX. Thời gian và nội dung hoạt động:</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{nienkhoa && nienkhoa.kehoach && ReactHtmlParser(nienkhoa.kehoach.thoigian2)}</div><span><EditTwoTone onClick={() => {
                        setAppropiateTarget(nienkhoa.kehoach.id, 'thoigian2', nienkhoa.kehoach.thoigian2, 1);
                    }} /></span>
                </Col>
                <Col span={16} offset={4}>
                    {nienkhoa && <Table
                        pagination={false}
                        columns={thoigianhoatdongColumns}
                        dataSource={getThoigianHoatdongData(nienkhoa)}
                        bordered
                    ></Table>}
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={8} offset={4} style={{ fontSize: 14}}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>Nơi nhận:</Text></div>
                    <div style={{ paddingLeft: '10px', fontStyle: 'italic' }}>- Cơ quan chủ quản (để b/c)</div>
                    <div style={{ paddingLeft: '10px', fontStyle: 'italic' }}>- Hội đồng TĐG (để th/h)</div>
                    <div style={{ paddingLeft: '10px', fontStyle: 'italic' }}>- Cán bộ, giáo viên, nhân viên nhà trường (để th/h)</div>
                    <div style={{ paddingLeft: '10px', fontStyle: 'italic' }}>- Lưu: ...................</div>
                </Col>
                <Col span={8} style={{ textAlign: 'center'}}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>TM. HỘI ĐỒNG</Text></div>
                    <div style={{ paddingLeft: '10px' }}><Text strong>CHỦ TỊCH</Text></div>
                    <div style={{ marginTop: '30px', paddingLeft: '10px' }}><Text strong>..........(Tên hiệu trưởng)</Text></div>
                </Col>
            </Row>
            

        </div>

    );
}

export default Plan;

