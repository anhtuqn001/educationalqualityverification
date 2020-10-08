import React, { useState, useEffect, useContext } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
    // plugins: [ Essentials, Bold, Italic, Paragraph ],
    toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'link']
};

const { Option } = Select;


function TieuchiComponent({ selectingChimuc }) {
    // const [textValue, setTextValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { doLogout } = useContext(LogoutContext);
    const [chibaos, setChibaos] = useState([]);
    // const [currentChibaoId, setCurrentChibaoId] = useState(null);
    const [currentChibao, setCurrentChibao] = useState(null);
    const [selectedChimuc, setSelectedChimuc] = useState(null);
    const [currentText, setCurrentText] = useState("");
    useEffect(() => {
        console.log(selectingChimuc);
    }, [])

    useEffect(() => {
        setSelectedChimuc(selectingChimuc);
        setCurrentChibao(null);
    }, [selectingChimuc])

    useEffect(() => {
    }, [selectedChimuc])


    // const handleEditorChange = (content, delta, source, editor) => {
    //     if (!!editor.getSelection() || content.length > 0) {
    //         let { chibaos } = selectingChimuc;
    //         let chibaoIndex = chibaos.findIndex(i => i.id == currentChibaoId);
    //         if (chibaoIndex >= 0) {
    //             chibaos[chibaoIndex].noidung = content;
    //         }
    //         setSelectedChimuc({ ...selectingChimuc });
    //     }
    //     // console.log('content', content);
    //     // console.log('editor.getSelection()',editor.getSelection());
    // }

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
            console.log('selectingChimuc', selectingChimuc);
            console.log('selectedChimuc', selectedChimuc);
            console.log('dâta', data);
        }
        }
    }


    const handleSaveSubmit = () => {
        setIsLoading(true);
        let { id, chibaos, isOk, thuocmuc } = selectedChimuc;
        let data = {
            chimucId: id,
            chibaos,
            isOk,
            thuocmuc,
            _method: 'PUT'
        }
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
                message.success('Lưu thành công');
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
        // setCurrentChibaoId(val);
        if (selectedChimuc == null) {
            return null;
        } else {
            let currentChibao = selectedChimuc && selectedChimuc.chibaos && selectedChimuc.chibaos.find(i => i.id == val);
            if (currentChibao) {
                setCurrentChibao(currentChibao);
            }
        }
    }

    // useEffect(() => {
    //     if (selectedChimuc != null) {
    //         let { chibaos } = selectedChimuc;
    //         let chibao = chibaos.findIndex(i => i.id == currentChibaoId);
    //         if (chibao != null) {
    //             setCurrentText(chibao.noidung);
    //         }

    //     }
    // }, [currentChibaoId])

    // const getAppropiateChibao = (chibaoId) => {
    //     if (selectedChimuc == null) {
    //         return null;
    //     } else {
    //         console.log('run');
    //         return selectedChimuc && selectedChimuc.chibaos && selectedChimuc.chibaos.find(i => i.id == chibaoId);
    //     }
    // }

    useEffect(() => {
        console.log('selectingChimuc', selectingChimuc);
    }, [selectingChimuc])

    const handleDanhgiaTieuchiChange = (val) => {
        let { chibaos } = selectingChimuc;
        selectingChimuc.thuocmuc = val;
        chibaos.forEach((item, index) => {
            if (item.loai == 2) {
                if (item.thuocmuc <= val) {
                    chibaos[index].isOk = 1;
                } else {
                    chibaos[index].isOk = 0;
                }
            }
        })
        setSelectedChimuc({ ...selectingChimuc });
        console.log('selectingChimuc', selectingChimuc);
    }

    const handleDanhgiaChibaoChange = (e) => {
        let chibaoIndex = selectingChimuc.chibaos.findIndex(i => i.id == currentChibao.id);
        let { chibaos } = selectingChimuc;
        chibaos[chibaoIndex].isOk = e.target.value;
        selectingChimuc.thuocmuc = adjustChimucMucdo(selectingChimuc);
        setSelectedChimuc({ ...selectingChimuc });
        console.log('selectingChimuc', selectingChimuc)
    }

    const adjustChimucMucdo = (chimuc) => {
        if (chimuc == null) return;
        let { chibaos } = chimuc;
        let isMuc1 = false;
        let isMuc2 = false;
        let isMuc3 = false;
        let chibaoMuc1 = chibaos.filter(i => i.thuocmuc == 1);
        isMuc1 = chibaoMuc1.every(i => i.isOk == 1);
        if (!isMuc1) {
            // chimuc.thuocmuc = 0;
            return 0;
        }
        let chibaoMuc2 = chibaos.filter(i => i.thuocmuc == 2);
        isMuc2 = chibaoMuc2.every(i => i.isOk == 1);
        if (!isMuc2) {
            // chimuc.thuocmuc = 1;
            return 1;
        }
        let chibaoMuc3 = chibaos.filter(i => i.thuocmuc == 3);
        if (chibaoMuc3.length > 0) {
            isMuc3 = chibaoMuc3.every(i => i.isOk == 1);
            if (!isMuc3) {
                // chimuc.thuocmuc = 2;
                return 2;
            }
            // chimuc.thuocmuc = 3;
            return 3;
        } else {
            // chimuc.thuocmuc = 2;
            return 2;
        }
    }

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
                <Col span={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>Đánh giá tiêu chí</Col>
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
                </Col>
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
                    {/* <Form.Item
                        label="Nội dung chi tiết"
                        name="noidung"
                        style={styles.colContent}
                    > */}
                    <Select
                        onChange={handleSelectChibaoChange}
                        style={{ width: '100%' }}
                        placeholder="Vui lòng chọn nội dung cần làm"
                        value={currentChibao && currentChibao.id}
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
            {currentChibao &&
                // <ReactQuill
                //     theme="snow"
                //     value={getAppropiateChibao(currentChibaoId).noidung}
                //     onChange={handleEditorChange}
                //     style={{ backgroundColor: 'white' }}
                // />
                <CKEditor
                    editor={ClassicEditor}
                    data={currentChibao.noidung ? currentChibao.noidung : ''}
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    config={editorConfiguration}
                    onChange={handleEditorChange}
                    // onChange={(event, editor) => {
                    //     console.log(event.source);
                    //     console.log(editor.model.document.selection.getFirstPosition());
                    // }}
                />
            }
        </React.Fragment>
    );
}


const getOptions = (maxDatmuc) => {
    if (maxDatmuc == 3) {
        return (
            < React.Fragment >
                <Option value={0}>Không đạt</Option>
                <Option value={1}>Đạt mức 1</Option>
                <Option value={2}>Đạt mức 2</Option>
                <Option value={3}>Đạt mức 3</Option>
            </React.Fragment >
        )
    }

    if (maxDatmuc == 2) {
        return (
            < React.Fragment >
                <Option value={0}>Không đạt</Option>
                <Option value={1}>Đạt mức 1</Option>
                <Option value={2}>Đạt mức 2</Option>
            </React.Fragment >
        )
    }
}
export default TieuchiComponent;