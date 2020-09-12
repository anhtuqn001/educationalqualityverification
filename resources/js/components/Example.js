import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';
import '../../../node_modules/antd/dist/antd.css';
import LoginPage from './LoginPage.js';
import MainPage from './MainPage.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter,
    useHistory
} from "react-router-dom";
import CreateGroup from './CreateGroup/index.js';
import Assignments from './Assignments/index.js';
function Example() {
    return (
        <Router>
            <MainPage />
        </Router>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}

