import React, { useState, useEffect, useContext } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Row, Col, message, Form, Select, Switch, Radio } from 'antd';
import { LogoutContext } from '../Contexts.js'
import './index.css';
const styles = {
    toolBar: {
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: 'white',
        padding: 5
    },
    colContent: {
        marginBottom: '3px',
        marginTop: '3px',
    }
}

const { Option } = Select;


function TieuchiComponent({ selectingChimuc }) {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { doLogout } = useContext(LogoutContext);
    const [selectingChimucChild, setSelectingChimucChild] = useState(null)
    const [chibaos, setChibaos] = useState([]);
    const [currentChibao, setCurrentChibao] = useState(null);
    const [selectedChimuc, setSelectedChimuc] = useState(null);

    useEffect(() => {
        // let { content } = selectingChimuc;
        // setValue(content);
        setSelectingChimucChild(selectingChimuc);
        // if (selectingChimuc != null) {
        //     let { chibaos } = selectingChimuc;
        //     setChibaos(chibaos);
        // }
        setSelectedChimuc(selectingChimuc);
    }, [selectingChimuc])

    const handleEditorChange = (val) => {
        setValue(val);
    }

    const handleSaveSubmit = () => {
        setIsLoading(true);
        // let { id } = selectingChimuc;
        // let data = {
        //     chimucId: id,
        //     content: value,
        //     _method: 'PUT'
        // }
        // // console.log(data);
        // fetch('/api/updatechimuccontent', {
        //     method: 'POST',
        //     headers: {
        //         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        //         'Authorization': 'Bearer ' + localStorage.getItem("token"),
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then((response) => {
        //         if (!response.ok) return Promise.reject(response);
        //         return response.json();
        //     })
        //     .then((result) => {
        //         console.log(result);
        //         let { chimuc } = result;
        //         let { id, content } = chimuc
        //         updateChimucContent(id, content);
        //         message.success('Lưu thành công');
        //     })
        //     .catch((error) => {
        //         if (error.status == 401) {
        //             if (localStorage.getItem("token") !== null) {
        //                 localStorage.removeItem("token");
        //             }
        //             doLogout();
        //         } else {
        //             message.error("Lỗi hệ thống");
        //         }
        //     }).then(() => {
        //         setIsLoading(false);
        //     });
    }

    const handleSelectChibaoChange = (val) => {
        let { chibaos } = selectedChimuc;
        let chibao = chibaos.find(i => i.id == val);
        if (chibao != null) {
            setCurrentChibao(chibao);
        }

    }

    const handleDanhgiaTieuchiChange = (val) => {
        let { chibaos } = selectedChimuc;
        selectedChimuc.thuocmuc = val;
        chibaos.forEach((item, index) => {
            if (item.loai == 2) {
                if (item.thuocmuc <= val) {
                    chibaos[index].isOk = 1;
                } else {
                    chibaos[index].isOk = 0;
                }
            }
        })
        setSelectedChimuc({ ...selectedChimuc });
        console.log('selectedChimuc', selectedChimuc);
    }

    const handleDanhgiaChibaoChange = (e) => {
        //    let chibaoIndex = chibaos.findIndex(i => i.id == currentChibao.id);
        //    if(chibaoIndex >= 0) {
        //         chibaos[chibaoIndex].isOk = e.target.value; 
        //    }
        //    setChibaos([...chibaos]);
        currentChibao.isOk = e.target.value;
        setCurrentChibao({...currentChibao})
    }

    return (
        <React.Fragment>
            <Row style={styles.toolBar} gutter={12}>
                {/* <Col span={22} style={{ alignItems: 'center', display: 'flex' }}>
                    {!selectingChimuc ? '' : selectingChimuc.tenchimuc}
                </Col> */}
                <Col span={5} style={{ display: 'flex', alignItems: 'flex-end' }}>
                    Nội dung chi tiết
                </Col>
                <Col span={5} offset={2} style={{ display: 'flex', alignItems: 'center' }}><Switch checkedChildren="Hoàn thành" unCheckedChildren="Hoàn thành" /></Col>
                <Col span={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>Đánh giá tiêu chí</Col>
                <Col span={5} style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Select
                        // onChange={handleSelectChibaoChange}
                        style={{ width: '100%' }}
                        value={selectedChimuc && selectedChimuc.thuocmuc}
                        onChange={handleDanhgiaTieuchiChange}
                    // dropdownMatchSelectWidth={false}
                    >
                        {/* {selectingChimuc.chibaos.map(i =>
                            <Option value={i.id} disabled={i.loai == 0} >
                                <div style={{ whiteSpace: 'normal', height: 'auto' }}>
                                    {i.tieude}
                                </div>
                            </Option>)} */}
                        <Option value={0}>Không đạt</Option>
                        <Option value={1}>Đạt mức 1</Option>
                        <Option value={2}>Đạt mức 2</Option>
                        <Option value={3}>Đạt mức 3</Option>
                    </Select>
                </Col>
                <Col span={2}>
                    <Button
                        type="primary"
                        disabled={isLoading}
                        onClick={handleSaveSubmit}
                    >Lưu</Button>
                </Col>
            </Row>
            {/* <Row style={styles.toolBar} gutter={12}>
                <Col span={24} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>{!selectingChimuc ? '' : selectingChimuc.tenchimuc}</div>
                    {selectingChimuc.chibaos.map(i => {
                        return (<div>{i.tieude}</div>)
                    })}
                </Col>
            </Row> */}
            <Row style={styles.toolBar} gutter={[12, 12]}>
                <Col span={24}>
                    {/* <Form.Item
                        label="Nội dung chi tiết"
                        name="noidung"
                        style={styles.colContent}
                    > */}
                    <Select
                        onChange={handleSelectChibaoChange}
                        style={{ width: '100%' }}
                        placeholder="Vui lòng chọn nội dung cần làm"
                    // dropdownMatchSelectWidth={false}
                    >
                        {selectingChimuc.chibaos.map(i =>
                            <Option value={i.id} disabled={i.loai == 0} >
                                <div style={{ whiteSpace: 'normal', height: 'auto' }}>
                                    {i.tieude}
                                </div>
                            </Option>)}
                    </Select>
                    {/* </Form.Item> */}
                </Col>
                {currentChibao && currentChibao.loai == 2 &&
                    <React.Fragment>
                        <Col span={7}>
                            Chỉ báo này có đạt mức {currentChibao.thuocmuc} ?
                        </Col>
                        <Col span={10}>
                            <Radio.Group value={currentChibao.isOk} onChange={handleDanhgiaChibaoChange}>
                                <Radio value={0}>Không</Radio>
                                <Radio value={1}>Có</Radio>
                            </Radio.Group>
                        </Col>
                    </React.Fragment>
                }
            </Row>
            {currentChibao && <ReactQuill
                theme="snow"
                value={value}
                onChange={handleEditorChange}
                style={{ backgroundColor: 'white' }}
            />}
        </React.Fragment>
    );
}

export default TieuchiComponent;