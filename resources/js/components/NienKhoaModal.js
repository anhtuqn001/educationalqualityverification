import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, Modal, Form, Input, Select } from 'antd';
import { LogoutContext } from './Contexts';
import { WindowsOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { PrinterOutlined } from '@ant-design/icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfiguration = {
    // plugins: [ Essentials, Bold, Italic, Paragraph ],
    toolbar: ['bold', 'italic']
};

const NienKhoaModal = ({ isOpen, truongId, getNienkhoaId, nienkhoas, nienkhoaId }) => {
    const [nienkhoa, setNienkhoa] = useState(null);
    let { doLogout } = useContext(LogoutContext);

    
    const handleClose = () => {
        hideModal();
    }

    const handleSubmit = () => {
        getNienkhoaId(truongId, nienkhoa.nam);
    }

    const handleNienkhoaChange = (value) => {
        let nienkhoa = nienkhoas.find(i => i.id == value);
        setNienkhoa(nienkhoa);
    }

    useEffect(() => {
        if(nienkhoaId) {
            let nienkhoa = nienkhoas.find(i => i.id == nienkhoaId);
            setNienkhoa(nienkhoa);
        }
    },[nienkhoaId])

    return (
        <Modal
            title="Chọn niên khóa"
            visible={isOpen}
            // onCancel={handleClose}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    style={{ background: "#096dd9", borderColor: "#096dd9" }}
                    onClick={handleSubmit}
                >
                    Chọn
                </Button>,
                // <Button
                //     key="back"
                //     onClick={handleClose}
                // >
                //     Hủy
                // </Button>,
            ]}
        >
            <Form>
                <Form.Item>
                    <Select
                        label="Chọn niên khóa"
                        value={nienkhoa ? nienkhoa.id : null}
                        onChange={handleNienkhoaChange}
                        >
                        {nienkhoas && nienkhoas.map(i => <Option value={i.id}>{i.tennienkhoa}</Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default NienKhoaModal;