import React, { useState, useEffect, useContext } from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Row, Col, message } from 'antd';
import { LogoutContext } from '../Contexts.js'
const styles = {
    toolBar: {
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: 'white',
        padding: 5
    }
}

const editorConfiguration = {
    // plugins: [ Essentials, Bold, Italic, Paragraph ],
    toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList' , 'link']
};

function TextEditor1({ selectingChimuc }) {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { doLogout } = useContext(LogoutContext);

    useEffect(() => {
        let { content } = selectingChimuc;
        setValue(content);
        console.log(content);
    }, [selectingChimuc])

    const handleEditorChange = (val) => {
        selectingChimuc.content = val;
        setValue(selectingChimuc.content);
        console.log('content', val);
    }

    const handleEditorChange1 = (event, editor) => {
        let data = editor.getData();;
        selectingChimuc.content = data;
        setValue(selectingChimuc.content);
        console.log('content', data);
        console.log(Array.from( editor.ui.componentFactory.names() ));
    }


    const handleSaveSubmit = () => {
        setIsLoading(true);
        let { id } = selectingChimuc;
        let data = {
            chimucId: id,
            content: value,
            _method: 'PUT'
        }
        // console.log(data);
        fetch('/api/updatechimuccontent', {
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
                let { id, content } = chimuc
                // updateChimucContent(id, content);
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
            {/* <ReactQuill
                theme="snow"
                value={value}
                // value='<p class="ql-align-justify">Nhà trường tiến hành thiếu và đề ra phương hướng hoạt động phù hợp hơn trong thời gian tới</p><p class="ql-align-justify">Trong quá trình TĐG, nhà trường tham mưu lãnh đạo GDĐT đầu tư trang thiết bị dạy học, xây dựng và sửa chữa cơ sở vật chất, cảnh quan nhà trường. Do đó điều kiện cơ sở vật chất đáp ứng đủ yêu cầu cho công tác giảng dạy của nhà trường, cảnh quan nhà trường ngày càng thêm xanh - sạch - đẹp.</p><p class="ql-align-justify">Sau khi xây dựng kế hoạch, Hội đồng TĐG đã triển khai thu thập thông tin và thống kê số liệu: Lập danh mục và phân công tìm minh chứng cho phù hợp với đối tượng và điều kiện. Thông qua các minh chứng đã gợi ý cho từng tiêu chí đã được liệt kê trong bản hướng dẫn TĐG, lập danh sách minh chứng và phân công tìm minh chứng cho các thành viên phụ trách các tiêu chuẩn để có trách nhiệm thực hiện.</p><p class="ql-align-justify">Xử lý, phân tích các thông tin và minh chứng thu được. Mô tả và phân tích các hoạt động của trường liên quan đến tiêu chí. So sánh với mặt bằng chung trên địa bàn huyện, với nhà trường trong những năm trước hay với các quy định của Nhà nước để thấy được hiện trạng của nhà trường. Đưa ra những nhận định về điểm mạnh và những yếu tố cần phát huy, chỉ ra&nbsp;những tồn tại, giải thích nguyên nhân.</p><p>Xác định những vấn đề cần cải tiến và đề ra những biện pháp để cải tiến những vấn đề đó. Xác định tiêu chí đạt hay không đạt yêu cầu. Viết báo cáo các tiêu chuẩn. Hoàn thiện báo cáo TĐG.</p>'
                onChange={handleEditorChange}
                style={{ backgroundColor: 'white' }}
            /> */}
            <CKEditor
                editor={ClassicEditor}
                data={value ? value : ''}
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                    console.log(Array.from( editor.ui.componentFactory.names()));
                }}
                config={editorConfiguration}
                onChange={handleEditorChange1}
            />
        </React.Fragment>
    );
}

export default TextEditor1;