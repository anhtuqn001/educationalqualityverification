import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Progress, Spin, Space, message } from 'antd';
import CustomHeader from './Header.js';
import MenuBar from './MenuBar.js';
import CreateGroup from './CreateGroup/index.js';
import Assignments from './Assignments/index.js';
import { ChromeOutlined } from '@ant-design/icons';
import { Route, useRouteMatch, Switch } from "react-router-dom";


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
            user: null
        }
    }

    componentDidMount() {
        let { history } = this.props;
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
                    }
                    console.log(result)
                })
                .catch((err) => {
                    if (err.status == 401) {
                        this.setState({
                            auth: true
                        })
                        localStorage.removeItem("token");
                        history.push('/dangnhap');
                    }
                    if (err.status == 500) {

                    }
                })
                .then(() => this.setState({
                    isTokenValidated: true
                }));
        } else {
            history.push('/dangnhap');
        }
    }


    render() {
        let { isTokenValidated, user } = this.state;
        let { match } = this.props;
        if (!isTokenValidated) {
            return (
                <div style={styles.container}>
                    <Spin size="large" indicator={antIcon} />
                </div>
            );
        }
        return (
            <Layout className="layout">
                <CustomHeader tendangnhap={user.name} />
                <MenuBar />
                <Content style={{ padding: '10px 50px' }}>
                    {/* <div className="site-layout-content">Content</div> */}
                    <Switch>
        <               Route path={`${match.path}creategroup`} render={() => <CreateGroup />} />
                        <Route path={`${match.path}assignments`} render={() => <Assignments />} />
                    </Switch>
                    {/* { this.props.children } */}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    };
};

// function MainPage() {
//     const [auth, setAuth] = useState(false);
//     const [isTokenValidated, setIsTokenValidated] = useState(false);
//     const [tendangnhap, setTendangnhap] = useState('');
//     const [idTaikhoan, setIdTaikhoan] = useState('');
//     let history = useHistory();

//     useEffect(() => {
//         let token = localStorage.getItem("token");
//         if (token) {
//             fetch("/api/user", {
//                 method: "GET",
//                 headers: {
//                     'Accept': 'application/json',
//                     'Authorization': 'Bearer ' + token
//                 }
//             })
//                 .then((res) => {
//                     if (!res.ok) return Promise.reject(res);
//                     return res.json();
//                 })
//                 .then((result) => {
//                     if (result.success) {
//                         setAuth(true);
//                         setTendangnhap(result.user.name);
//                         setIdTaikhoan(result.user.id);
//                     }
//                 })
//                 .catch((err) => {
//                     if (err.status == 401) {
//                         setAuth(false);
//                         localStorage.removeItem("token");
//                         history.push('/dangnhap');
//                     }
//                 })
//                 .then(() => setIsTokenValidated(true));
//         } else {
//             history.push('/dangnhap');
//         }
//     }, [])



//     return (
//         <div>
//             <NavigationBar tendangnhap={tendangnhap} idTaikhoan={idTaikhoan}/>
//             <MainContent history={history} />
//         </div>
//     );
// }

export default withRouter(MainPage);