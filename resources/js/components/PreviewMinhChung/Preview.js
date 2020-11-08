import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, Typography } from 'antd';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';
import { PrinterOutlined } from '@ant-design/icons';


const { Text } = Typography

const imageExtensions = ['png', 'jpg', 'jpeg'];

const WordExcelExtensions = ['doc', 'docx', 'xls', 'xlsx'];

const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
}

const Preview = ({ src }) => {
    const [type, setType] = useState(null);
    useEffect(() => {
       let extension = getExtension(src);
       if(extension == 'pdf') {
           setType(1);
       } else if (imageExtensions.includes(extension)) {
           setType(2);
       } else if(WordExcelExtensions.includes(extension)) {
           setType(3);
       } else {
           setType(null);
       }
    }, [src])


    const getExtension = (src) => {
        return src.split('.').pop();
    }

    const getAppopiatePreview = (type) => {
        switch (type) {
            case 1:
                return <iframe src={"/files/" + src} height="600" width="100%"/>
            case 2:
                return <img src={"/files/" + src}  height="600"/>
            case 3:
                return <PreviewWordExcel src={src}/>
            default:
                return <div><Text type="danger">File không hợp lệ</Text></div>
        }
    }

    return (
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            {getAppopiatePreview(type)}
        </Col>
    );
}


const PreviewWordExcel = (src) => {
    return (
        <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=https://vuonxanh.lihanet.com/api/downloadminhchungfile/${src}`} width='99%' height='600px' frameborder='0'> </iframe>
    )
}


export default Preview;
