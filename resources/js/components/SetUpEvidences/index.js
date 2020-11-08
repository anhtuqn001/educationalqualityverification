import React, { Component, useState, useEffect, useContext } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { handleMinhchungRawData, assignMinhchungToTieuchiAndUser, generateMinhChungsTreeData, handleMinhchungRawDataToExportData } from '../utils.js';
import { LogoutContext } from '../Contexts.js';
import { message, Spin, Upload, Row, Col, Tree, Button, Table } from 'antd';
import { Loading3QuartersOutlined, InboxOutlined, StopOutlined } from '@ant-design/icons';


const { Dragger } = Upload;

const styles = {
  container: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center'
  }
}

const minhchungColumns = [
  {
    title: 'Tiêu chí',
    dataIndex: 'tentieuchi',
    width: '10%'
  },
  {
    title: 'Mã minh chứng',
    dataIndex: 'maminhchung',
    width: '10%'
  },
  {
    title: 'Tên minh chứng',
    dataIndex: 'tenminhchung',
    width: '30%',
    render: item => <span style={{ whiteSpace: 'pre-line' }}>{item}</span>
  },
  {
    title: 'Số, ngày ban hành, hoặc thời điểm khảo sát, điều tra, phỏng vấn, quan sát',
    dataIndex: 'songaybanhanh',
    width: '15%',
    render: item => <span style={{ whiteSpace: 'pre-line' }}>{item}</span>
  },
  {
    title: 'Nơi ban hành hoặc nhóm, cá nhân thực hiện',
    dataIndex: 'noibanhanh',
    width: '10%',
    render: item => <span style={{ whiteSpace: 'pre-line' }}>{item}</span>
  },
  {
    title: 'Ghi chú',
    dataIndex: 'ghichu',
    width: '10%',
    render: item => <span style={{ whiteSpace: 'pre-line' }}>{item}</span>
  },
  {
    title: 'Tiêu chí tham chiếu',
    dataIndex: 'tieuchis',
    width: '15%',
    render: tieuchis => tieuchis.map(i => <div>{`- ${i.tenchimuc.split(':')[0]}`}</div>)
  },
]

const SetUpEvidences = ({ nienkhoaId }) => {
  const [cols, setCols] = useState(null);
  const [rows, setRows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const { doLogout } = useContext(LogoutContext);
  const [tieuchis, setTieuchis] = useState(null);
  const [minhchungs, setMinhchungs] = useState(null);
  const [currentMinhchung, setCurrentMinhchung] = useState(null);

  useEffect(() => {
    fetch('/api/gettieuchi/' + nienkhoaId, {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) return Promise.reject(response);
      return response.json();
    }).then((resData) => {
      let { tieuchis } = resData;
      let appliedMaTieuchis = tieuchis.map((i) => ({
        ...i,
        matieuchi: i.tenchimuc.split(':')[0].split(' ')[i.tenchimuc.split(':')[0].split(' ').length - 1]
      }));
      let totalMinhchungs = [];
      tieuchis.forEach(i => {
        let { minhchungs } = i;
        minhchungs = minhchungs.map(m => ({
          ...m,
          tentieuchi: i.tenchimuc.split(':')[0]
        }))
        totalMinhchungs = [...totalMinhchungs, ...minhchungs];
      })
      console.log(appliedMaTieuchis);
      setTieuchis(appliedMaTieuchis);
      setMinhchungs(totalMinhchungs);
    }).catch((error) => {
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
  }, [])


  const DraggerProps = {
    name: 'file',
    beforeUpload: fileObj => {
      setIsImporting(true);
      ExcelRenderer(fileObj, (err, resp) => {
        if (err) {
          console.log(err);
        }
        else {
          setCols(resp.cols);
          setRows(resp.rows);
          let minhchungRawDatas = resp.rows;
          minhchungRawDatas.shift();
          let exportMinhchungData = handleMinhchungRawDataToExportData([...minhchungRawDatas], tieuchis)
          let minhchungHandledDatas = handleMinhchungRawData(minhchungRawDatas);
          minhchungHandledDatas = assignMinhchungToTieuchiAndUser(tieuchis, minhchungHandledDatas);
          let data = {
            minhchungs: minhchungHandledDatas,
            exportMinhchungs : exportMinhchungData,
            nienkhoaId
          };
          fetch('/api/minhchung', {
            method: 'post',
            headers: {
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
          }).then((resData) => {
            let { tieuchis } = resData;
            let appliedMaTieuchis = tieuchis.map((i) => ({
              ...i,
              matieuchi: i.tenchimuc.split(':')[0].split(' ')[i.tenchimuc.split(':')[0].split(' ').length - 1]
            }));
            let totalMinhchungs = [];
            tieuchis.forEach(i => {
              let { minhchungs } = i;
              minhchungs = minhchungs.map(m => ({
                ...m,
                tentieuchi: i.tenchimuc.split(':')[0]
              }))
              totalMinhchungs = [...totalMinhchungs, ...minhchungs];
            })
            setTieuchis(appliedMaTieuchis);
            setMinhchungs(totalMinhchungs);
            setCurrentMinhchung(null);
            message.success('Tạo các minh chứng thành công');
          }).catch((error) => {
            if (error.status == 401) {
              if (localStorage.getItem("token") !== null) {
                localStorage.removeItem("token");
              }
              doLogout();
            } else {
              message.error("Lỗi hệ thống");
            }
          }).then(() => {
            setIsImporting(false);
          });
        }
      });
      return false;
    }
  };

  const handleMinhchungSelect = (minhchungId) => {
    let minhchung = minhchungs.find(i => i.id == minhchungId);
    if (minhchung) {
      setCurrentMinhchung([minhchung]);
    }
  }

  if (isLoading) {
    return <div style={styles.container}>
      <Spin
        size="large"
      />
    </div>
  }

  return (
    <React.Fragment>
      {/* <input type="file" onChange={fileHandler} style={{ "padding": "10px" }} /> */}
      <Dragger {...DraggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Nhấp hoặc kéo thả file minh chứng để tải lên</p>
      </Dragger>
      {isImporting && <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Loading3QuartersOutlined spin />
      </Row>}
      {/* {!isImporting && cols && rows && <OutTable data={rows} columns={cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />} */}
      <Row style={{ marginTop: '10px' }} gutter={16}>
        <Col span={6}>
          <Tree
            blockNode
            treeData={generateMinhChungsTreeData(tieuchis)}
            height={500}
            onSelect={(selectedKeys, { selected, selectedNodes, node }) => { handleMinhchungSelect(node.id) }}
          />
        </Col>
        <Col span={18}>
          <Table
            columns={minhchungColumns}
            dataSource={currentMinhchung}
            bordered
            pagination={false}
            locale={{emptyText: <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '23px', paddingBottom: '23px'}}><StopOutlined style={{ fontSize: 30, marginRight: '10px'}}/>Chưa có thông tin</div>}}
          ></Table>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default SetUpEvidences;