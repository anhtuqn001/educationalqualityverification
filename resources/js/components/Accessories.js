import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../../node_modules/antd/dist/antd.css';
// import './index.css';
import { Form, Input, Button, Modal } from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, PlusCircleFilled } from '@ant-design/icons';

const layout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 17,
    },
};

const success = () => {
    
  };
  
  const error = () => {
    message.error('This is an error message');
  };
  
  const warning = () => {
    message.warning('This is a warning message');
  };

const Accessories = ({ isOpen, handleCloseCreateNhomModal }) => {
     
    return (
        <div></div>
    );
}

export default Accessories;