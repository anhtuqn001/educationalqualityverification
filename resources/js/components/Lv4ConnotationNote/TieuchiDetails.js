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

const TieuchiDetails = ({ tieuchi }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTieuchi, setSelectedTieuchi] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentChibao, setCurrentChibao] = useState(null);
    const [currentDataIndex, setCurrentDataIndex] = useState(null);
    const { doLogout } = useContext(LogoutContext);

    useEffect(() => {
        setSelectedTieuchi(tieuchi);
        console.log('tieuchi', tieuchi);
    }, [tieuchi])

    const getTableData = (tieuchi) => {
        return [{...tieuchi}].map(i => ({
            id: i.id,
            tenchimuc: i.tenchimuc.split(':')[0],
            noiham: i.noiham,
            cauhoi: i.cauhoi,
            canthuthap: i.canthuthap,
            noithuthap: i.noithuthap,
            ghichu3: i.ghichu3
        }));
    }

    const columns = [
        {
            title: 'Tiêu chí',
            dataIndex: 'tenchimuc',
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
            dataIndex: 'ghichu3',
            width: '10%'
        }
    ]

    const fullColums = columns.map(i => {
        let { children } = i
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
        if (dataIndex == 'tenchimuc')
            return (
                <td>
                    <div style={{ display: 'inline-block', marginRight: '5px' }}>{ReactHtmlParser(record[dataIndex])}</div>
                </td>
            )
        return (
            <td>
                <div style={{ display: 'inline-block', marginRight: '5px' }}>{record && ReactHtmlParser(record[dataIndex])}</div>
                <span><EditTwoTone onClick={() => {
                    setCurrentDataIndex(dataIndex);
                    showModal();
                }} /></span>
            </td>);
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const hideModal = () => {
        setIsModalOpen(false);
    }

    const updateTieuchi = (updatedTieuchi, index) => {
        tieuchi[index] = updatedTieuchi[index];
        setSelectedTieuchi({...tieuchi})
    }
    
    const exportFile = () => {
        window.location.href = '/api/createpxdnhm4/' + tieuchi.id;
    }

    if (tieuchi) {
        return (
            <div style={{ maxHeight: '600px', overflow: 'auto' }}>
                <Row style={{ background: 'white', padding: '5px' }}>
                    <Button icon={<PrinterOutlined />} type="primary" onClick={exportFile}>In phiếu xác định nội hàm</Button>
                </Row>
                <Row style={{ background: 'white', padding: '5px' }} >
                    <Col span={24} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div><Title level={4}>Phụ lục 3</Title></div>
                        <div><Title level={4}>Phiếu xác định nội hàm, phân tích tiêu chí tìm minh chứng tiêu chí</Title></div>
                        <div><Title level={4}>thuộc Mức 4</Title></div>
                    </Col>
                    <Col span={24}>
                        <div>Nhóm công tác hoặc cá nhân: </div>
                        <div>{tieuchi.tenchimuc}</div>
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
                        <EditModal
                            isOpen={isModalOpen}
                            hideModal={hideModal}
                            tieuchi={selectedTieuchi}
                            dataIndex={currentDataIndex}
                            updateTieuchi={updateTieuchi}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
    return null;
}



export default TieuchiDetails;