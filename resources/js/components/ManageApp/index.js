import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button } from 'antd';
import { LogoutContext } from '../Contexts';
import CreateSchool from './CreateSchool.js';
import CreateNienkhoa from './CreateNienkhoa.js';
import CreateLocation from './CreateLocation.js';

const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
}

const ManageApp = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [truongs, setTruongs] = useState(null);
    const [khuvucs, setKhuvucs] = useState(null);
    const { doLogout } = useContext(LogoutContext);

    useEffect(() => {
        fetch('/api/truong', {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
                if (!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then((resData) => {
                let { truongs, khuvucs } = resData;
                if(truongs && truongs.length > 0) {
                    setTruongs(truongs);
                }
                if(khuvucs && khuvucs.length > 0) {
                    setKhuvucs(khuvucs);
                }

            })
            .catch((error) => {
                if (error.status == 401) {
                    if (localStorage.getItem("token") !== null) {
                        localStorage.removeItem("token");
                    }
                    doLogout();
                } else {
                    setErrorMessage('Lỗi hệ thống');
                }
                
            });
    }, [])
    
    return (
        <React.Fragment>
            <Row>
                <Col span={8}>
                    <CreateSchool khuvucs={khuvucs}/>
                </Col>
                <Col span={8}>
                    <CreateNienkhoa truongs={truongs}/>
                </Col>
                <Col span={8}>
                    <CreateLocation />
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default ManageApp;
