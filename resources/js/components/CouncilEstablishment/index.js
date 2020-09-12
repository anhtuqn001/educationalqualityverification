// import React, { Component } from 'react'
// import { render, Document, Text } from 'redocx'

// class App extends Component {
//   render() {
//     return (
//       <Document>
//         <Text>Hello World</Text>
//       </Document>
//     )
//   }
// }

// render(<App />, `${__dirname}/example.docx`)

import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { generateTree, handleChimucResult, reformatUserChiMucData } from '../utils.js';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';
import { PrinterOutlined } from '@ant-design/icons';


const CouncilEstablishment = () => {
    const exportFile = () => {
        window.location.href = '/api/exportqdtlhdtdg';
    }
    return (
        <React.Fragment>
            <Row>
                <Col span={24}>
                    <Button icon={<PrinterOutlined />} type="primary" onClick={exportFile}>In</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{display:'flex', justifyContent:'center'}}>
                    <iframe width="830" height="400" frameBorder="0" src={`https://docs.google.com/gview?url=/docs/TestWordFile2.docx&embedded=true`}></iframe>
                </Col>
            </Row>

        </React.Fragment >
    );
}

export default CouncilEstablishment;
