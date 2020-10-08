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
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  // let childNode = children;

  // if (editable) {
  let childNode = editing ? (
    <Form.Item
      style={{
        margin: 0,
      }}
      name={dataIndex}
    // rules={[
    //   {
    //     required: true,
    //     message: `Không được trống`,
    //   },
    // ]}
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

  return <td {...restProps}>{childNode}</td>;
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

  const handleSave = (row) => {
    let { id } = row;
    let itemIndex = dataSource.findIndex(i => i.id == id);
    if (itemIndex >= 0) {
      dataSource[itemIndex] = { ...row };
    }
    setDataSource([...dataSource]);
  }

  const fullColumns = columns.map(col => {
    return {
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })

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
        console.log(result);
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