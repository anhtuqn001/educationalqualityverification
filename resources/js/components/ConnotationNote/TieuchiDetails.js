import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, Typography, Table } from 'antd';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, Loading3QuartersOutlined, PrinterOutlined, EditOutlined, EditTwoTone } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';
import EditModal from './EditModal.js';
const { Text, Title } = Typography;
import ReactHtmlParser from 'react-html-parser';

const TieuchiDetails = ({ tieuchi, tieuchuan }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTieuchi, setSelectedTieuchi] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentChibao, setCurrentChibao] = useState(null);
    const [currentDataIndex, setCurrentDataIndex] = useState(null);

    useEffect(() => {
        setSelectedTieuchi(tieuchi);
        console.log('tieuchi', tieuchi);
    }, [tieuchi])

    const chibaoMuc1 = tieuchi && tieuchi.chibaos.filter(i => i.thuocmuc == 1).map(i => i.tieude).map(i => <div>{i}</div>);
    const chibaoMuc2 = tieuchi && tieuchi.chibaos.filter(i => i.thuocmuc == 2).map(i => i.tieude).map(i => <div>{i}</div>);
    const chibaoMuc3 = tieuchi && tieuchi.chibaos.filter(i => i.thuocmuc == 3).map(i => i.tieude).map(i => <div>{i}</div>);

    const getTableData = (tieuchi) => {
        let titleRow = ['Mức 1:', 'Mức 2:', 'Mức 3:'];
        let { chibaos } = tieuchi;
        let filteredChibaos = chibaos.filter(i => i.loai == 2 || titleRow.includes(i.tieude));
        return filteredChibaos.map(i => {
            let tieude;
            if (i.loai == 0) {
                tieude = i.tieude
            }
            if (i.loai == 2) {
                if (filteredChibaos.filter(j => j.thuocmuc == i.thuocmuc).length > 1) {
                    tieude = i.tieude.split(' ')[0];
                } else {
                    tieude = ''
                }
            }
            return {
                id: i.id,
                loai: i.loai,
                tieude,
                noiham: i.noiham,
                cauhoi: i.cauhoi,
                canthuthap: i.canthuthap,
                noithuthap: i.noithuthap,
                ghichu: i.ghichu
            }
        })
    }

    const columns = [
        {
            title: 'Mức/Chỉ báo',
            dataIndex: 'tieude',
            width: '10%'
        },
        {
            title: 'Nội hàm',
            dataIndex: 'noiham',
            width: '25%'
        },
        {
            title: 'Các câu hỏi đặt ra (ứng với mỗi nội hàm)',
            dataIndex: 'cauhoi',
            width: '25%'
        },
        {
            title: 'Minh chứng',
            children: [
                {
                    title: 'Cần thu thập',
                    dataIndex: 'canthuthap',
                    width: '20%'
                },
                {
                    title: 'Nơi thu thập',
                    dataIndex: 'noithuthap',
                    width: '10%'
                }
            ]
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghichu',
            width: '10%'
        }
    ]

    const fullColums = columns.map(i => {
        let { children } = i;
        return {
            ...i,
            children: children ? children.map(j => ({
                ...j,
                onCell: record => ({
                    record,
                    dataIndex: j.dataIndex
                })
            })) : undefined,
            onCell: record => ({
                record,
                dataIndex: i.dataIndex
            })
        }
    })

    const CustomRow = ({ index, ...props }) => {
        return (
            <tr {...props} />
        );
    };

    const CustomCell = ({
        record,
        dataIndex
    }) => {
        if (dataIndex == 'tieude' || (record && record.loai != 2))
            return (
                <td>
                    <div style={{ display: 'inline-block', marginRight: '5px' }}>{ReactHtmlParser(record[dataIndex])}</div>
                </td>
            )
        return (
            <td>
                <div style={{ display: 'inline-block', marginRight: '5px' }}>{record && ReactHtmlParser(record[dataIndex])}</div>
                <span><EditTwoTone onClick={() => {
                    setCurrentChibao(record);
                    setCurrentDataIndex(dataIndex);
                    showModal();
                    console.log(record);
                }} /></span>
            </td>);
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const hideModal = () => {
        setIsModalOpen(false);
    }

    const updateChibao = (updatedChibao) => {
        let chibaoIndex = tieuchi.chibaos.findIndex(i => i.id == updatedChibao.id);
        if (chibaoIndex >= 0) {
            tieuchi.chibaos[chibaoIndex] = { ...updatedChibao }
        }
        setSelectedTieuchi({ ...tieuchi });
        setCurrentChibao({ ...updatedChibao });
    }
    
    const exportFile = () => {
        window.location.href = '/api/createpxdnh/' + tieuchi.id;
    }

    if (tieuchi) {
        return (
            <div style={{ maxHeight: '600px', overflow: 'auto' }}>
                <Row style={{ background: 'white', padding: '5px' }}>
                    <Button icon={<PrinterOutlined />} type="primary" onClick={exportFile}>In phiếu xác định nội hàm</Button>
                </Row>
                <Row style={{ background: 'white', padding: '5px' }} >
                    <Col span={24} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div><Title level={4}>Phụ lục 2</Title></div>
                        <div><Title level={4}>Phiếu xác định nội hàm, phân tích tiêu chí tìm minh chứng tiêu chí</Title></div>
                        <div><Title level={4}>thuộc Mức 1, 2 và 3</Title></div>
                    </Col>
                    <Col span={24}>
                        <div>Nhóm công tác hoặc cá nhân: </div>
                        <div>{tieuchuan}</div>
                        <div>{tieuchi.tenchimuc}</div>
                        {chibaoMuc1.length > 0 &&
                            <React.Fragment>
                                <div>Mức 1</div>
                                <div>{chibaoMuc1}</div>
                            </React.Fragment>}
                        {chibaoMuc2.length > 0 &&
                            <React.Fragment>
                                <div>Mức 2</div>
                                <div>{chibaoMuc2}</div>
                            </React.Fragment>}
                        {chibaoMuc3.length > 0 &&
                            <React.Fragment>
                                <div>Mức 3</div>
                                <div>{chibaoMuc3}</div>
                            </React.Fragment>}
                    </Col>
                    <Col span={24}>
                        <Table
                            bordered
                            columns={fullColums}
                            dataSource={selectedTieuchi ? getTableData(selectedTieuchi) : null}
                            pagination={false}
                            components={{
                                body: {
                                    row: CustomRow,
                                    cell: CustomCell
                                }
                            }}
                            tableLayout="fixed"
                        ></Table>
                        <EditModal isOpen={isModalOpen} hideModal={hideModal} chibao={currentChibao} dataIndex={currentDataIndex} updateChibao={updateChibao} />
                    </Col>
                </Row>
            </div>
        );
    }
    return null;
}



export default TieuchiDetails;