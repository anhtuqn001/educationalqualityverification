import React, { useState, useEffect, useContext } from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

const { Text } = Typography;

const editorConfiguration = {
    // plugins: [ Essentials, Bold, Italic, Paragraph ],
    toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'link']
};

function KetLuanComponent({ selectingChimuc }) {
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { doLogout } = useContext(LogoutContext);

    useEffect(() => {
        let { content, content2 } = selectingChimuc;
        setValue(content);
        setValue2(content2);
    }, [selectingChimuc])


    const handleEditorChange = (event, editor) => {
        let data = editor.getData();;
        selectingChimuc.content = data;
        setValue(selectingChimuc.content);
    }

    const handleEditor2Change = (event, editor) => {
        let data = editor.getData();;
        selectingChimuc.content2 = data;
        setValue2(selectingChimuc.content2);
    }

    useEffect(() => {
        console.log('value', value)
    }, [value])

    useEffect(() => {
        console.log('value2', value2)
    }, [value2])

    const handleSaveSubmit = () => {
        setIsLoading(true);
        let { id } = selectingChimuc;
        let data = {
            chimucId: id,
            content: value,
            content2: value2,
            _method: 'PUT'
        }
        console.log(data);
        fetch('/api/updateketluanContent', {
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
                console.log(result);
                let { chimuc } = result;
                let { id, content, content2 } = chimuc;
                // updateKetluanContent(id, content, content2);
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



    return (
        <React.Fragment>
            <Row style={styles.toolBar} gutter={12}>
                <Col span={22} style={{ alignItems: 'center', display: 'flex' }}>
                    {!selectingChimuc ? '' : selectingChimuc.tenchimuc}
                </Col>
                <Col span={2}>
                    <Button
                        type="primary"
                        disabled={isLoading}
                        onClick={handleSaveSubmit}
                    >Lưu</Button>
                </Col>
            </Row>
            <div style={{paddingTop: '5px', paddingBottom: '5px'}}>
                <b>1. Những điểm mạnh nổi bật</b>
            </div>
            <CKEditor
                editor={ClassicEditor}
                data={value ? value : ''}

                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                config={editorConfiguration}
                onChange={handleEditorChange}
            />            
            <div style={{paddingTop: '5px', paddingBottom: '5px'}}>
                <b>2. Những điểm yếu cơ bản</b>
            </div>
            <CKEditor
                editor={ClassicEditor}
                data={value2 ? value2 : ''}
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                config={editorConfiguration}
                onChange={handleEditor2Change}
            />
        </React.Fragment>
    );
}




export default KetLuanComponent;