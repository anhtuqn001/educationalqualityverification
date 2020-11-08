import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Progress, Spin, Space, message } from 'antd';
import CustomHeader from './Header.js';
import MenuBar from './MenuBar.js';
import NienKhoaModal from './NienKhoaModal.js';
import CreateGroup from './CreateGroup/index.js';
import Assignments from './Assignments/index.js';
import { ChromeOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, useRouteMatch, Switch, Link, useHistory, withRouter } from "react-router-dom";
import LoginPage from "./LoginPage.js";
import { LogoutContext } from "./Contexts.js";
import ManageTasks from './ManageTasks/index.js';
import CouncilEstablishment from './CouncilEstablishment/index.js';
import EndReport from './EndReport/index.js';
import WorkingUsersList from './WorkingUsersList/index.js';
import SetUpEvidences from './SetUpEvidences/index.js';
import EvidenceReview from './EvidenceReview/index.js';
import EvidenceAssignment from './EvidenceAssignment/index.js';
import EvidenceList from './EvidenceList/index.js';
import Plan from './Plan/index.js';
import TieuchiEvaluation from './TieuchiEvaluation/index.js';
import ConnotationNote from './ConnotationNote/index.js';
import PlanReport from './PlanReport/index.js';
import PhongGiaoDuc from './PhongGiaoDuc/index.js';
import Lv4TieuchiEvaluation from './Lv4TieuchiEvaluation/index.js';
import Lv4ConnotationNote from './Lv4ConnotationNote/index.js';
import ManageApp from './ManageApp/index.js';
import ManageSchools from './ManageSchools/index.js';
import SchoolReports from './SchoolReports/index.js';
import ManageMinhchungs from './ManageMinhchungs/index.js';
import PreviewMinhChung from './PreviewMinhChung/index.js';

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
            truongId: null,
            isLoaded: false,
            nienkhoaId: null,
            tennienkhoa: null,
            isNienkhoaModalOpen: false,
            nienkhoas: null,
            khuvucId: null
        }
        this.setAuthFalse = this.setAuthFalse.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.showNienkhoaModal = this.showNienkhoaModal.bind(this);
        this.hideNienkhoaModal = this.hideNienkhoaModal.bind(this);
        this.getNienkhoaId = this.getNienkhoaId.bind(this);
        this.handleUserData = this.handleUserData.bind(this);
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

    showNienkhoaModal() {
        this.setState({
            isNienkhoaModalOpen: true
        })
    }

    hideNienkhoaModal() {
        this.setState({
            isNienkhoaModalOpen: false
        })
    }

    getUserInfo() {
        console.log('getting user info');
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
                        let { user } = result;
                        this.handleUserData(user);
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

    handleUserData(user) {
        let { role } = user;
        switch (role) {
            case 0: {
                this.setState({
                    auth: true,
                    user
                })
                break;
            }
            case 1: {
                let { khuvuc } = user;
                this.setState({
                    auth: true,
                    user,
                    khuvucId: khuvuc.id
                })
                break;
            }
            case 2: {
                let { truong } = user;
                let { nienkhoas, id: truongId } = truong;
                let nam = localStorage.getItem("nam");
                if (nam !== null) {
                    this.getNienkhoaId(truongId, nam);
                    this.setState({
                        truongId,
                        auth: true,
                        user,
                        nienkhoas
                    })
                } else {
                    this.setState({
                        truongId,
                        isNienkhoaModalOpen: true,
                        auth: true,
                        user,
                        nienkhoas
                    })
                }
                break;
            }
            case 3: {
                let { truong } = user;
                let { nienkhoas, truongId } = truong;
                this.setState({
                    truongId,
                    auth: true,
                    user,
                    nienkhoas,
                })
                break;
            }
            default:
                break;
        }
    }

    getNienkhoaId(truongid, nam) {
        if (!!nam) {
            let data = {
                truongid,
                nam
            }
            fetch("/api/getnienkhoa", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) => {
                    if (!res.ok) return Promise.reject(res);
                    return res.json();
                })
                .then((result) => {
                    if (result.success) {
                        let { nienkhoa } = result;
                        let { id: nienkhoaId, nam, tennienkhoa } = nienkhoa;
                        // console.log('nienkhoaId', nienkhoaId);
                        this.setState({
                            nienkhoaId,
                            tennienkhoa,
                            isNienkhoaModalOpen: false
                        })
                        localStorage.setItem("nam", nam);
                    }
                })
                .catch((err) => {
                    console.log('err', err);
                    message.error('Lỗi hệ thống');
                });
        } else {
        }
    }


    setAuthFalse() {
        this.setState({
            auth: false,
            user: null,
            truongId: 0,
            nienkhoaId: null,
            tennienkhoa: null,
            nienkhoas: null,
            khuvucId: null
        })
        this.props.history.push('/');
    }

    render() {
        let { user, auth, isLoaded, truongId, nienkhoaId, isNienkhoaModalOpen, nienkhoas, khuvucId, tennienkhoa } = this.state;
        if (auth) {
            return (
                <Switch>
                    <LogoutContext.Provider value={{ doLogout: this.setAuthFalse }}>
                        <Layout className="layout">
                            <NienKhoaModal isOpen={isNienkhoaModalOpen} truongId={truongId} getNienkhoaId={this.getNienkhoaId} nienkhoas={nienkhoas} nienkhoaId={nienkhoaId}/>
                            <CustomHeader tendangnhap={user.name} tennienkhoa={tennienkhoa} showModal={this.showNienkhoaModal}/>
                            <MenuBar role={user.role} />
                            <Content style={{ padding: '10px 50px' }}>
                                {/* <div className="site-layout-content">Content</div> */}
                                <Route exact path="/">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src="/public/images/intro7.png" alt="introduction" style={{ width: '80%', height: 'auto' }} />
                                    </div>
                                </Route>
                                <Route path="/manageapp">
                                    <ManageApp />
                                </Route>
                                {nienkhoaId && user && user.role == 2 &&
                                    <React.Fragment>
                                        <Route path="/creategroup">
                                            <CreateGroup nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/assignments">
                                            <Assignments nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/councilestablishment">
                                            <CouncilEstablishment nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/endreport">
                                            <EndReport nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/workinguserslist">
                                            <WorkingUsersList nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/setupevidences">
                                            <SetUpEvidences nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/evidencereview">
                                            <EvidenceReview nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/evidenceassignment">
                                            <EvidenceAssignment nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/evidencelist">
                                            <EvidenceList nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/plan">
                                            <Plan nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/tieuchievaluation">
                                            <TieuchiEvaluation nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/connotationnote">
                                            <ConnotationNote nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/planreport">
                                            <PlanReport nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/lv4tieuchievaluation">
                                            <Lv4TieuchiEvaluation nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/lv4connotationnote">
                                            <Lv4ConnotationNote nienkhoaId={nienkhoaId} />
                                        </Route>
                                        <Route path="/previewminhchung">
                                            <PreviewMinhChung nienkhoaId={nienkhoaId}/>
                                        </Route>
                                    </React.Fragment>
                                }
                                {
                                    user && user.role == 3 &&
                                    <React.Fragment>
                                        <Route path="/managetasks">
                                            <ManageTasks userId={user.id} />
                                        </Route>
                                        <Route path="/manageminhchungs">
                                            <ManageMinhchungs userId={user.id} />
                                        </Route>
                                    </React.Fragment>
                                }
                                {
                                    user && user.role == 1 && khuvucId &&
                                    <React.Fragment>
                                        <Route path="/manageschools">
                                            <ManageSchools khuvucId={khuvucId} />
                                        </Route>
                                        <Route path="/schoolreports/:id" >
                                            <SchoolReports />
                                        </Route>
                                    </React.Fragment>

                                }
                                <Route path="/phonggiaoduc">
                                    <PhongGiaoDuc khuvucId={1} />
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