import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, Modal } from 'antd';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { PrinterOutlined } from '@ant-design/icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfiguration = {
    // plugins: [ Essentials, Bold, Italic, Paragraph ],
    toolbar: ['bold', 'italic']
};

const EditModal = ({ isOpen, hideModal, editingTarget, updateTarget }) => {
    const [value, setValue] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    let { doLogout } = useContext(LogoutContext);

    // useEffect(() => {
    //     if (chibao && dataIndex) {
    //         setValue(chibao[dataIndex]);
    //     }
    // }, [chibao])

    useEffect(() => {   
       if(editingTarget && editingTarget.value) {
            setValue(editingTarget.value);
            console.log('editingTarget', editingTarget);
       } 
    }, [editingTarget])

    // useEffect(() => {
    //     if (chibao && dataIndex) {
    //         setValue(chibao[dataIndex]);
    //     }
    // }, [dataIndex])

    // const handleEditorChange = (event, editor) => {
    //     let data = editor.getData();
    //     setValue(data);
    //     console.log(data);
    // }
 
    const handleClose = () => {
        hideModal();
        setValue(null);
    }

    const handleEditorChange = (event, editor) => {
        let data = editor.getData();
        setValue(data);
    }

    const handleSubmit = () => {
        setIsSubmitting(true);
        let data = {
            id: editingTarget.id,
            index: editingTarget.index,
            value,
            type: editingTarget.type,
            _method: 'PUT'
        }
        fetch('/api/kehoachtdg', {
            method: 'post',
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
                let { target } = result;
                if(target){
                    updateTarget(target, editingTarget.index, editingTarget.type);
                }
                hideModal();
                setValue(null);
            })
            .catch((error) => {
                if (error.status == 401) {
                    if (localStorage.getItem("token") !== null) {
                        localStorage.removeItem("token");
                    }
                    doLogout();
                } else {
                    console.log(error);
                    message.error("Lỗi hệ thống");
                }
            }).then(() => { setIsSubmitting(false); });
    }



    return (
        <Modal
            title="Chỉnh sửa nội dung"
            visible={isOpen}
            onCancel={handleClose}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    loading={isSubmitting}
                    style={{ background: "#096dd9", borderColor: "#096dd9" }}
                    onClick={handleSubmit}
                >
                    Lưu
                </Button>,
                <Button
                    key="back"
                    onClick={handleClose}
                >
                    Hủy
                </Button>,
            ]}
        >
            <CKEditor
                editor={ClassicEditor}
                data={value ? value : ''}
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                    // console.log(Array.from(editor.ui.componentFactory.names()));
                }}
                config={editorConfiguration}
                onChange={handleEditorChange}
            />
        </Modal>
    );
}

export default EditModal;