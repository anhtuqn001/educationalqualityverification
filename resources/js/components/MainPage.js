import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Progress, Spin, Space, message } from 'antd';
import CustomHeader from './Header.js';
import MenuBar from './MenuBar.js';
import CreateGroup from './CreateGroup/index.js';
import Assignments from './Assignments/index.js';
import { ChromeOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, useRouteMatch, Switch, Link, useHistory, withRouter } from "react-router-dom";
import LoginPage from "./LoginPage.js";
import { LogoutContext } from "./Contexts.js";
import ManageTasks from './ManageTasks/index.js';
import CouncilEstablishment from './CouncilEstablishment/index.js';
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
        paddingTop: '250px'
    },
    menuBar: {
        backgroundColor: '#1890ff'
    },
    img: {
        maxHeight: '100%',
        width: 'auto'
    }
}

const { Header, Content, Footer } = Layout;

const antIcon = <ChromeOutlined style={{ fontSize: 50 }} spin />;

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            isTokenValidated: false,
            user: null,
            isLoaded: false
        }
        this.setAuthFalse = this.setAuthFalse.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    componentDidMount() {
        if (!(localStorage.getItem("token") === null)) {
            this.getUserInfo();
        } else {
            this.setState({
                isLoaded: true
            })
        }
    }

    getUserInfo() {
        let token = localStorage.getItem("token");
        if (!!token) {
            fetch("/api/user", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((res) => {
                    if (!res.ok) return Promise.reject(res);
                    return res.json();
                })
                .then((result) => {
                    if (result.success) {
                        this.setState({
                            auth: true,
                            user: result.user
                        })
                        console.log(result.user);
                    }
                })
                .catch((err) => {
                    if (err.status == 401) {
                        this.setState({
                            auth: false,
                            user: null
                        })
                        localStorage.removeItem("token");
                        // history.push('/dangnhap');
                    }
                    if (err.status == 500) {

                    }
                })
                .then(() => this.setState({
                    isLoaded: true
                }));
        } else {
            // history.push('/dangnhap');
        }
    }

    setAuthFalse() {
        this.setState({
            auth: false,
            user: null
        })
        this.props.history.push('/');
    }

    render() {
        let { user, auth, isLoaded } = this.state;
        if (auth) {
            return (
                <Switch>
                    <LogoutContext.Provider value={{ doLogout: this.setAuthFalse }}>
                        <Layout className="layout">
                            <CustomHeader tendangnhap={user.name} />
                            <MenuBar role={user.role} />
                            <Content style={{ padding: '10px 50px' }}>
                                {/* <div className="site-layout-content">Content</div> */}
                                <Route exact path="/">
                                    <div style={{display:'flex', justifyContent:'center'}}>
                                        <img src="/images/intro7.png" alt="introduction" style={{ width: '80%', height: 'auto' }} />
                                    </div>
                                </Route>
                                <Route path="/creategroup">
                                    <CreateGroup setAuthFalse={this.setAuthFalse} />
                                </Route>
                                <Route path="/assignments">
                                    <Assignments setAuthFalse={this.setAuthFalse} />
                                </Route>
                                <Route path="/managetasks">
                                    <ManageTasks userId={user.id} />
                                </Route>
                                <Route path="/councilestablishment">
                                    <CouncilEstablishment />
                                </Route>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>Bản quyền Lihanet - 2020</Footer>
                        </Layout>
                    </LogoutContext.Provider>
                </Switch>
            )
        } else if (isLoaded) {
            return (
                <LoginPage getUserInfo={this.getUserInfo} />
            );
        } else {
            return (
                <div style={styles.container}>
                    <Spin size="large" indicator={antIcon} />
                </div>
            )
        }

    };
};

export default withRouter(MainPage);