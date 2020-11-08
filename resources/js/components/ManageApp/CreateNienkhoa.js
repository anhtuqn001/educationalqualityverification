import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
// import './index.css';
import { Form, Input, Button, Checkbox, Row, Col, Space, Alert, Radio, message, Select} from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, ChromeOutlined, VerifiedOutlined, MacCommandOutlined } from '@ant-design/icons';
import { getChiMucsData } from '../utils.js';
import { LogoutContext } from '../Contexts';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '50px'
    }
}
const { Option } = Select;

const CreateNienkhoa = ({ truongs }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    const [nam, setNam] = useState('');
    const [truong, setTruong] = useState(null);
    const { doLogout } = useContext(LogoutContext);

    const handleNamChange = (e) => {
        setNam(e.target.value);
    }

    const handleTruongChange = (value) => {
        let truong = truongs.find(i => i.id == value);
        setTruong(truong);
    }

    useEffect(() => {
        console.log('truong', truong);
    }, [truong]);

    const handleSubmit = () => {
        setIsSubmitting(true);
        let data = {
            nam,
            tennienkhoa : getTenNienkhoa(nam),
            truongid : truong.id,
            chimucs: getChiMucsData(truong.loaitruong)
        }
        console.log('data', data);
        fetch('/api/nienkhoa', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
                if (!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then((resData) => {
                let { success } = resData;
                if(success) {
                    message.success('Tạo niên khóa thành công!');
                }
            })
            .catch((error) => {
                if (error.status == 401) {
                    if (localStorage.getItem("token") !== null) {
                        localStorage.removeItem("token");
                    }
                    doLogout();
                } else {
                    setErrorMessage('Lỗi hệ thống')
                }
                
            }).then(() => {
                setIsSubmitting(false);
            });
    }

    return (
        <React.Fragment>
            <Row
                style={styles.container}
            >
                <Col span={18}>
                    {/* <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    > */}
                    <Form.Item
                        name="nam"
                        rules={[
                            {
                                required: true,
                                message: 'Năm không được bỏ trống!',
                            },
                        ]}
                        onChange={handleNamChange}
                    >
                        <Input prefix={<VerifiedOutlined className="site-form-item-icon" />} placeholder="Năm" />
                    </Form.Item>
                    {truongs && truongs.length > 0 && 
                    <Form.Item>
                        <Select
                        value={truong ? truong.id : null}
                        onChange={handleTruongChange}>
                            {truongs.map(i => <Option value={i.id}>{i.tentruong}</Option>)}
                        </Select>
                    </Form.Item>
                    }
                    {errorMessage && !!errorMessage.length && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: '10px' }} />}
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmit} block loading={isSubmitting}>
                            Tạo niên khóa
                        </Button>
                    </Form.Item>
                    {/* </Form> */}
                </Col>
            </Row>
        </React.Fragment>
    );
};

const getTenNienkhoa = (nam) => {
    let nextNam = parseInt(nam);
    nextNam++;
    nextNam = nextNam.toString();
    nam = nam + '-' + nextNam; 
    return nam;
}

export default CreateNienkhoa;