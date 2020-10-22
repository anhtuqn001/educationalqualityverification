import React, { useEffect, useState, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Tag, Space, Button, Form, Input, message, Row, Col, Typography } from 'antd';
import { LogoutContext } from '../Contexts.js'

const EditableContext = React.createContext();
const { Title, Text } = Typography;

const styles = {
  toolBar: {
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'white',
    padding: 5
  }
}

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  dataIndex,
  children,
  record,
  handleSave,
  hasChild,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  // useEffect(() => {
  //   console.log('children', children);
  // }, [])

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values }, dataIndex);
      console.log('record', record);
      console.log('values', values);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  // let childNode = children;
  let sumNode = (<div style={{ textAlign: 'center', fontWeight: 'bold' }}>{children}</div>)

  // if (editable) {
  let childNode = editing ? (
    <Form.Item
      style={{
        margin: 0,
      }}
      name={dataIndex}
    >
      <Input style={{ textAlign: 'center', paddingTop: '0px', paddingBottom: '0px' }} ref={inputRef} onPressEnter={save} onBlur={save} />
    </Form.Item>
  ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 2,
          textAlign: 'center'
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  // }

  return <td {...restProps}>{hasChild ? sumNode : childNode}</td>;
};


const DetailsTable = ({ selectingChimuc }) => {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const { doLogout } = useContext(LogoutContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectingChimuc) {
      let { columns, chimuc_table_details } = selectingChimuc;
      setColumns(columns);
      setDataSource(chimuc_table_details);
    }
  }, [JSON.stringify(selectingChimuc)])

  const handleSave = (row, dataIndex) => {
    let { id, sumtype } = row;
    let itemIndex = dataSource.findIndex(i => i.id == id);
    if (itemIndex >= 0) {
      dataSource[itemIndex] = { ...row };
    }
    if (sumtype) {
      let sumtypeStr = sumtype;
      let parentStr = sumtypeStr.slice(0, -2);
      let siblingsStr = parentStr + '-' + '\\d';
      let siblingsRegEx = new RegExp(siblingsStr);
      let parentIndex = dataSource.findIndex(i => i.sumtype === parentStr);

      while (parentIndex >= 0) {
        let siblingsValueArr = dataSource.filter(i => siblingsRegEx.test(i.sumtype) && i.sumtype.length == sumtypeStr.length).map(i => i[dataIndex]);
        let sum = 0;
        siblingsValueArr.forEach(i => {
          sum += +i;
        })
        if(!isNaN(sum)){
          dataSource[parentIndex][dataIndex] = sum;
        } else {
          dataSource[parentIndex][dataIndex] = ' ';
        }
        sumtypeStr = parentStr;
        parentStr = sumtypeStr.slice(0, -2);
        siblingsStr = parentStr + '-' + '\\d';
        siblingsRegEx = new RegExp(siblingsStr);
        parentIndex = dataSource.findIndex(i => i.sumtype === parentStr);
      }
    }
    // console.log('sumtypeStr', sumtypeStr);
    // console.log('parentStr', parentStr);
    // let ChildIndexArr = dataSource.filter(i => (i.sumtype != 'sum')).map(i => i[dataIndex]);
    // let sum = 0;
    // ChildIndexArr.forEach(i => {
    //   sum += +i;
    // })
    // let sumIndex = dataSource.findIndex(i => i.sumtype == 'sum');
    // if (sumIndex >= 0) {
    //   dataSource[sumIndex][dataIndex] = sum;
    // }
    // console.log(sum);
    setDataSource([...dataSource]);
  }

  const fullColumns = columns.map(col => {
    let { title } = col;
    let widthStr = 'auto';
    if (title == "TT") {
      widthStr = "7%";
    }
    return {
      ...col,
      align: 'center',
      width: widthStr,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        hasChild: hasChild(record, dataSource)
      })
    }
  })

  const hasChild = (row, dataSource) => {
    let { sumtype } = row;
    if (!sumtype) return false;
    let childStr = sumtype + '-' + '\\d';
    let childRegex = new RegExp(childStr);
    let parentIndex = dataSource.findIndex(i => childRegex.test(i.sumtype));
    if (parentIndex >= 0) return true;
    return false
  }

  const handleSaveSubmit = () => {
    setIsLoading(true);
    let data = {
      chimuc_table_details: dataSource,
      _method: 'PUT'
    }
    // console.log(data);
    fetch('/api/updatechimuctabledetails', {
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
        message.success('Lưu thành công!');
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
          <Button type="primary" onClick={handleSaveSubmit} disabled={isLoading}>Lưu</Button>
        </Col>
      </Row>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell
          }
        }}
        tableLayout="fixed"
        rowClassName={() => 'editable-row'}
        bordered
        pagination={false}
        columns={fullColumns}
        dataSource={dataSource}
      />
    </React.Fragment>
  )
}

export default DetailsTable;