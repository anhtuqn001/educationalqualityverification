import React, { useState, useEffect, useContext } from "react";
import { Button, Row, Col, message, Form, Select, Switch, Radio } from 'antd';
import { LogoutContext } from '../Contexts.js'
import './index.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

const editorConfiguration = {
    toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'link']
};

const { Option } = Select;


function Tieuchi4Component({ selectingChimuc }) {
    const [isLoading, setIsLoading] = useState(false);
    const { doLogout } = useContext(LogoutContext);
    const [currentChibao, setCurrentChibao] = useState(null);
    const [selectedChimuc, setSelectedChimuc] = useState(null);
    const [editor, setEditor] = useState(null);
    useEffect(() => {
        console.log(selectingChimuc);
    }, [])

    useEffect(() => {
        setSelectedChimuc(selectingChimuc);
        console.log('selectingChimuc', selectingChimuc);
        setCurrentChibao(null);
    }, [selectingChimuc])

    const handleEditorChange = (event, editor) => {
        if(editor.model.document.selection.getFirstPosition().path[0] == 0 && editor.model.document.selection.getFirstPosition().path[1] == 0) {
            console.log('true');
        } else {
        console.log(editor.model.document.selection.getFirstPosition().path);
        let data = editor.getData();
        if (data.length > 0) {
            let chibaoIndex = selectingChimuc.chibaos.findIndex(i => i.id == currentChibao.id);

            let { chibaos } = selectingChimuc;
            if (chibaoIndex >= 0) {
                chibaos[chibaoIndex].noidung = data;
            }
            setSelectedChimuc({ ...selectingChimuc });
        }
        }
    }


    const handleSaveSubmit = () => {
        // setIsLoading(true);
        let { id, chibaos, isOk, thuocmuc } = selectedChimuc;
        let data = {
            chimucId: id,
            chibaos,
            isOk,
            thuocmuc,
            _method: 'PUT'
        }
        console.log('data', data);
        // console.log(data);
        fetch('/api/updatechimucchibaos', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then((result) => {
                console.log('result', result);
                let { success } = result;
                if(success) {
                    message.success('Lưu thành công');
                }
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
    }

    const handleSelectChibaoChange = (val) => {
        if (selectedChimuc == null) {
            return null;
        } else {
            let currentChibao = selectedChimuc && selectedChimuc.chibaos && selectedChimuc.chibaos.find(i => i.id == val);
            if (currentChibao) {
                setCurrentChibao(currentChibao);
            }
        }
    }

    const handleSelectMinhchung = (val) => {
        // console.log('val', val);
        editor.model.change( writer => {
            writer.insertText( val, editor.model.document.selection.getFirstPosition() );
        } );
    }

    useEffect(() => {
        console.log('selectingChimuc', selectingChimuc);
    }, [selectingChimuc])

    const handleDanhgiaTieuchiChange = (e) => {
        // let { chibaos } = selectingChimuc;
        // selectingChimuc.thuocmuc = val;
        // chibaos.forEach((item, index) => {
        //     if (item.loai == 2) {
        //         if (item.thuocmuc <= val) {
        //             chibaos[index].isOk = 1;
        //         } else {
        //             chibaos[index].isOk = 0;
        //         }
        //     }
        // })
        // setSelectedChimuc({ ...selectingChimuc });
        // console.log('selectingChimuc', selectingChimuc);
        selectingChimuc.thuocmuc = e.target.value;
        setSelectedChimuc({ ...selectingChimuc });
    }

    // const handleDanhgiaChibaoChange = (e) => {
    //     let chibaoIndex = selectingChimuc.chibaos.findIndex(i => i.id == currentChibao.id);
    //     let { chibaos } = selectingChimuc;
    //     chibaos[chibaoIndex].isOk = e.target.value;
    //     selectingChimuc.thuocmuc = adjustChimucMucdo(selectingChimuc);
    //     setSelectedChimuc({ ...selectingChimuc });
    //     console.log('selectingChimuc', selectingChimuc)
    // }

    // const adjustChimucMucdo = (chimuc) => {
    //     if (chimuc == null) return;
    //     let { chibaos } = chimuc;
    //     let isMuc1 = false;
    //     let isMuc2 = false;
    //     let isMuc3 = false;
    //     let chibaoMuc1 = chibaos.filter(i => i.thuocmuc == 1);
    //     isMuc1 = chibaoMuc1.every(i => i.isOk == 1);
    //     if (!isMuc1) {
    //         // chimuc.thuocmuc = 0;
    //         return 0;
    //     }
    //     let chibaoMuc2 = chibaos.filter(i => i.thuocmuc == 2);
    //     isMuc2 = chibaoMuc2.every(i => i.isOk == 1);
    //     if (!isMuc2) {
    //         // chimuc.thuocmuc = 1;
    //         return 1;
    //     }
    //     let chibaoMuc3 = chibaos.filter(i => i.thuocmuc == 3);
    //     if (chibaoMuc3.length > 0) {
    //         isMuc3 = chibaoMuc3.every(i => i.isOk == 1);
    //         if (!isMuc3) {
    //             // chimuc.thuocmuc = 2;
    //             return 2;
    //         }
    //         // chimuc.thuocmuc = 3;
    //         return 3;
    //     } else {
    //         // chimuc.thuocmuc = 2;
    //         return 2;
    //     }
    // }

    const handleHoanthanhSwitchChange = (val) => {
        if (val) {
            selectingChimuc.isOk = 1;
        } else {
            selectingChimuc.isOk = 0;
        }
        setSelectedChimuc({ ...selectingChimuc });
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
                <Col span={5} offset={2} style={{ display: 'flex', alignItems: 'center' }}><Switch checkedChildren="Hoàn thành" unCheckedChildren="Hoàn thành" onChange={handleHoanthanhSwitchChange} checked={selectedChimuc && selectedChimuc.isOk} /></Col>
                {/* <Col span={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>Đánh giá tiêu chí</Col>
                <Col span={5} style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Select
                        // onChange={handleSelectChibaoChange}
                        style={{ width: '100%' }}
                        value={selectedChimuc && selectedChimuc.thuocmuc}
                        onChange={handleDanhgiaTieuchiChange}
                    // dropdownMatchSelectWidth={false}
                    >
                        {selectedChimuc && getOptions(selectedChimuc.maxDatmuc)}
                    </Select>
                </Col> */}
                {selectedChimuc && 
                <Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                    Tiêu chí có đạt?
                    <Radio.Group 
                    style={{ marginLeft: '10px'}}
                    value={selectedChimuc.thuocmuc}
                    onChange={handleDanhgiaTieuchiChange}
                    >
                                <Radio value={0}>Không</Radio>
                                <Radio value={4}>Có</Radio>
                    </Radio.Group>
                </Col>}
                <Col span={2}>
                    <Button
                        type="primary"
                        disabled={isLoading}
                        onClick={handleSaveSubmit}
                    >Lưu</Button>
                </Col>
            </Row>
            <Row style={styles.toolBar} gutter={[12, 12]}>
                <Col span={24}>
                    <Select
                        onChange={handleSelectChibaoChange}
                        style={{ width: '100%' }}
                        placeholder="Vui lòng chọn nội dung cần làm"
                        value={currentChibao && currentChibao.id}
                    >
                        {selectingChimuc.chibaos.map(i =>
                            <Option value={i.id} disabled={i.loai == 0} >
                                <div style={{ whiteSpace: 'normal', height: 'auto' }}>
                                    {i.tieude}
                                </div>
                            </Option>)}
                    </Select>
                </Col>
                {/* {currentChibao && currentChibao.loai == 2 &&
                    <React.Fragment>
                        <Col span={7}>
                            Chỉ báo này có đạt mức {currentChibao.thuocmuc} ?
                        </Col>
                        <Col span={7}>
                            <Radio.Group value={currentChibao.isOk} onChange={handleDanhgiaChibaoChange}>
                                <Radio value={0}>Không</Radio>
                                <Radio value={1}>Có</Radio>
                            </Radio.Group>
                        </Col>
                        <Col span={8} offset={2}>
                        <Form.Item label="Minh chứng" style={{ marginBottom: '0px', paddingBottom: '0px'}}>
                            <Select
                                // onChange={handleSelectMinhchung}
                                onSelect={handleSelectMinhchung}
                                style={{ width: 130 }}
                                placeholder="Chọn mã"
                            >
                                {[...selectingChimuc.minhchungs, ...selectingChimuc.minhchungthamkhaos].map(i =>
                                    <Option value={i.maminhchung}>
                                        {i.maminhchung}
                                    </Option>
                                    )}
                            </Select>
                        </Form.Item>
                        </Col>
                    </React.Fragment>
                } */}
            </Row>
            {currentChibao &&
                <CKEditor
                    editor={ClassicEditor}
                    data={currentChibao.noidung ? currentChibao.noidung : ''}
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                        setEditor(editor);
                    }}
                    config={editorConfiguration}
                    onChange={handleEditorChange}
                />
            }
        </React.Fragment>
    );
}

export default Tieuchi4Component;