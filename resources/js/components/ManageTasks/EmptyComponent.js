import React, { useState, useEffect, useContext } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Row, Col, message, Typography } from 'antd';
import { LogoutContext } from '../Contexts.js'
const styles = {
    toolBar: {
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: 'white',
        padding: 5
    }
}

const { Title } = Typography;
function EmptyComponent({ selectingChimuc }) {
    // const [value, setValue] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    // const { doLogout } = useContext(LogoutContext);

    // useEffect(() => {
    //     let { content } = selectingChimuc;
    //     setValue(content);
    // }, [selectingChimuc])

    // const handleEditorChange = (val) => {
    //     setValue(val);
    // }


    // const handleSaveSubmit = () => {
    //     setIsLoading(true);
    //     let { id } = selectingChimuc;
    //     let data = {
    //         chimucId: id,
    //         content: value,
    //         _method: 'PUT'
    //     }
    // console.log(data);
    //     fetch('/api/updatechimuccontent', {
    //         method: 'POST',
    //         headers: {
    //             'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    //             'Authorization': 'Bearer ' + localStorage.getItem("token"),
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then((response) => {
    //             if (!response.ok) return Promise.reject(response);
    //             return response.json();
    //         })
    //         .then((result) => {
    //             console.log(result);
    //             let { chimuc } = result;
    //             let { id, content } = chimuc
    //             updateChimucContent(id, content);
    //             message.success('Lưu thành công');
    //         })
    //         .catch((error) => {
    //             if (error.status == 401) {
    //                 if (localStorage.getItem("token") !== null) {
    //                     localStorage.removeItem("token");
    //                 }
    //                 doLogout();
    //             } else {
    //                 message.error("Lỗi hệ thống");
    //             }
    //         }).then(() => {
    //             setIsLoading(false);
    //         });
    // }


    return (
        <React.Fragment>
            <Row style={styles.toolBar} gutter={12}>
                <Col span={22} style={{ alignItems: 'center', display: 'flex' }}>
                    {!selectingChimuc ? '' : selectingChimuc.tenchimuc}
                </Col>
                {/* <Col span={2}>
                    <Button 
                    type="primary"
                    disabled={isLoading}
                    onClick={handleSaveSubmit}
                    >Lưu</Button>
                </Col> */}
            </Row>
            {/* <ReactQuill
                theme="snow"
                readOnly
                // value={value}
                // onChange={handleEditorChange}
                style={{ backgroundColor: 'white' }}
            /> */}
            <Row style={{ marginTop: '20px' }}>
                <Col span={20} offset={4}>
                    <Title type="danger" level={3}>Công việc này không cần điền nội dung</Title>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default EmptyComponent;