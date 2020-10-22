import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, Typography, Table } from 'antd';
import { LogoutContext } from '../Contexts';
import ReactHtmlParser from 'react-html-parser';
import { EditTwoTone } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

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
        title: <Text strong>Ghi chú</Text>,
        dataIndex: 'ghichu',
        align: 'center'
    }
]

const getHdtdgData = (truong) => {
    let { nhoms_with_users } = truong;
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

const getNtkData = (truong) => {
    let { nhoms_with_users } = truong;
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

const getNhomData = (truong) => {
    let { nhoms_with_users } = truong;
    if (nhoms_with_users && nhoms_with_users.filter(i => i.loainhom == 0).length > 0) {
        let nhoms = nhoms_with_users.filter(i => i.loainhom == 0);
        let totalUsers = [];
        nhoms.forEach(i => {
            let { users } = i;
            users = users.map(u => ({
                tennhom: i.tennhom,
                hoten: u.hoten,
                chucvu: u.chucvu,
                ghichu: i.ghichu
            }));
            totalUsers = [...totalUsers, ...users];
        })
        return totalUsers;
    }
}


const Plan = ({ truongId }) => {
    const [values, setValues] = useState(['Demo1', 'Demo2', 'Demo3']);
    const [data, setData] = useState(null);
    const { doLogout } = useContext(LogoutContext);
    const [isLoading, setIsLoading] = useState(true);
    // const [kehoach, setKehoach] = useState(null);
    const [truong, setTruong] = useState(null)

    useEffect(() => {
        fetch('/api/kehoachtdg/' + truongId, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { truong } = resData;
            setTruong(truong);
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

    // const data = values.map((i, index) => ({ [index] : [index, i]}));
    return (
        <div style={{ fontSize: 16, fontFamily: "'Times New Roman', Times, serif", maxHeight: '600px', overflow: 'auto' }}>
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
                            <div style={{ marginRight: '5px', display: 'inline-block' }}>{truong && truong.kehoach.so}</div>
                            <span><EditTwoTone onClick={() => {
                                console.log('click');
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
                            <div style={{ marginRight: '5px', display: 'inline-block', fontStyle: 'italic' }}>{truong && truong.kehoach.ngaythang}</div>
                            <span><EditTwoTone onClick={() => {
                                console.log('click');
                            }} /></span>
                        </Col>
                    </Row>
                    <div style={{ paddingLeft: '10px' }}><Text strong>I. Mục đích tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{truong && truong.kehoach && ReactHtmlParser(truong.kehoach.mucdich)}</div>
                    <span><EditTwoTone onClick={() => {
                        console.log('click');
                    }} /></span>
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>I. Mục đích tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{truong && truong.kehoach && ReactHtmlParser(truong.kehoach.mucdich)}</div>
                    <span><EditTwoTone onClick={() => {
                        console.log('click');
                    }} /></span>
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>II. Phạm vi tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{truong && truong.kehoach && ReactHtmlParser(truong.kehoach.phamvi)}</div>
                    <span><EditTwoTone onClick={() => {
                        console.log('click');
                    }} /></span>
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>III. Công cụ tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{truong && truong.kehoach && ReactHtmlParser(truong.kehoach.congcu)}</div>
                    <span><EditTwoTone onClick={() => {
                        console.log('click');
                    }} /></span>
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>IV. Hội đồng tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px' }}>1. Thành phần Hội đồng tự đánh giá</div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{truong && truong.kehoach && ReactHtmlParser(truong.kehoach.hoidong)}</div>
                    <span><EditTwoTone onClick={() => {
                        console.log('click');
                    }} /></span>
                    <div style={{ paddingLeft: '10px' }}>{`Hội đồng gồm có ${truong && truong['nhoms_with_users'].filter(i => i.loainhom == 1)[0].users.length} thành viên (Danh sách kèm theo).`}</div>
                    {truong && truong['nhoms_with_users'].filter(i => i.loainhom == 1)[0].users.length > 0 &&
                        <Table
                            pagination={false}
                            columns={hdtdgColumns}
                            dataSource={getHdtdgData(truong)}
                            bordered
                        ></Table>
                    }
                    <div style={{ paddingLeft: '10px' }}>2. Nhóm thư ký và các nhóm công tác (Danh sách kèm theo)</div>
                    <div style={{ paddingLeft: '10px' }}>a. Nhiệm vụ cụ thể cho nhóm thư ký</div>
                    {truong && truong['nhoms_with_users'].filter(i => i.loainhom == 2)[0].users.length > 0 &&
                        <Table
                            pagination={false}
                            columns={ntkColumns}
                            dataSource={getNtkData(truong)}
                            bordered
                        ></Table>
                    }
                    <div style={{ paddingLeft: '10px' }}>b. Nhiệm vụ cụ thể cho nhóm công tác</div>
                    {truong && truong['nhoms_with_users'].filter(i => i.loainhom == 0).length > 0 &&
                        <Table
                            pagination={false}
                            columns={nhomColumns}
                            dataSource={getNhomData(truong)}
                            bordered
                        ></Table>
                    }
                     <div style={{ paddingLeft: '10px' }}>3. Phân công thực hiện</div>
                </Col>
            </Row>
            <Row style={{ background: 'white' }}>
                <Col span={16} offset={4}>
                    <div style={{ paddingLeft: '10px' }}><Text strong>V. Tập huấn nghiệp vụ tự đánh giá</Text></div>
                    <div style={{ paddingLeft: '10px', marginRight: '5px', display: 'inline-block' }}>{truong && truong.kehoach && ReactHtmlParser(truong.kehoach.thoigian)}</div>
                </Col>
            </Row>



            {/* <div style={{ display: 'inline-block', marginRight: '5px' }}>{kehoach && ReactHtmlParser(kehoach.congcu)}</div>
            <span><EditTwoTone onClick={() => {

            }} /></span>

            <div style={{ display: 'inline-block', marginRight: '5px' }}>{kehoach && ReactHtmlParser(kehoach.hoidong)}</div>
            <span><EditTwoTone onClick={() => {

            }} /></span>

            <div style={{ display: 'inline-block', marginRight: '5px' }}>{kehoach && ReactHtmlParser(kehoach.taphuan)}</div>
            <span><EditTwoTone onClick={() => {

            }} /></span>

            <div style={{ display: 'inline-block', marginRight: '5px' }}>{kehoach && ReactHtmlParser(kehoach.thoigian)}</div>
            <span><EditTwoTone onClick={() => {

            }} /></span> */}

        </div>

    );
}

export default Plan;

