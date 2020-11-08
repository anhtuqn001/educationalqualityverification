import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
// import './index.css';
import { Form, Input, Button, Modal, message, Upload} from 'antd';
import { useHistory } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import { LogoutContext } from '../Contexts';

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
};

const UploadModal = ({ isOpen, hideModal, minhchungId, updateCreatedMinhChungFile }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ten, setTen] = useState('');
    const [file, setFile] = useState(null);
    const { doLogout } = useContext(LogoutContext);


    const handleClose = () => {
        hideModal();
        setTen('');
        setFile(null);
    }
    
    const normFile = e => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };

    const handleFileInputChange = e => {
        console.log('e', e);
        console.log('e.target.files', e.target.files[0]);
    }

    const handleTenChange = e => {
        setTen(e.target.value);
    }

    useEffect(() => {
        console.log('minhchungId', minhchungId);
    }, [minhchungId])

    function handleSubmit() {
        setIsLoading(true);
        let fd = new FormData();
        // let data = {
        //     ten,
        //     file,
        // }
        fd.append('minhchungid', minhchungId);
        fd.append('ten', ten);
        fd.append('file', file );
        for (var pair of fd.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        // $.ajax({
        //     headers: {
        //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        //     },
        //     type: 'POST',
        //     url: URLLINK + "/" + id,
        //     data : fd,
        //     contentType: false,
        //     processData: false,
        //     success: function(data) {
        //         if (!$.isEmptyObject(data.error)) {
        //             printErrorMsg(data.error, "print-error-msg-on-edit");
        //         } else {
        //             console.log(data.success);
        //             window.location.href = URLLINK;
        //         }
        //     },
        //     error: function(xhr, ajaxOptions, thrownError) {
        //         alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        //     }
        // });
        fetch('/api/fileminhchung', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
            body: fd
        })
            .then((response) => {
                if (!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then((result) => {
                let { minhchungfile } = result;
                let { minhchungid } = minhchungfile;
                message.success('Tải tập tin thành công');
                updateCreatedMinhChungFile(minhchungid, minhchungfile);
                handleClose();
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
                
            }).then(() => { setIsLoading(false); });
    }
    return (
        <Modal
            title="Tải file minh chứng"
            visible={isOpen}
            onCancel={handleClose}
            width={500}
            footer={[
                <Button key="submit" type="primary" loading={isLoading} onClick={handleSubmit}>
                    Tải
                </Button>,
                <Button
                key="back"
                onClick={handleClose}
                >
                    Hủy
                </Button>,
            ]}
            destroyOnClose={true}
        >
            <Form
                {...layout}
            >
                <Form.Item
                    label="Tên file"
                    name="ten"
                    rules={[
                        {
                            required: true,
                            message: 'Tên file không được để trống',
                        },
                    ]}
                    style={{ marginBottom: '5px' }}
                    onChange={handleTenChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="file"
                    label="Tải file"
                    valuePropName="fileList"
                    style={{marginTop: '10px'}}
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo"
                    // listType="picture"
                    beforeUpload={(file) => {
                        setFile(file);
                        console.log('file', file);
                        return false;
                    }}
                    onRemove={() => {
                        setFile(null);
                    }}
                    >
                        <Button icon={<UploadOutlined />}>Bấm để tải file</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UploadModal;