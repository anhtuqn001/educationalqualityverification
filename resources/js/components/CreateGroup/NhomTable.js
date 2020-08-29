import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from 'antd';
// import './NhomTable.css';


const columns = [
    { title: 'Mã nhóm', dataIndex: 'manhom' },
    { title: 'Tên nhóm', dataIndex: 'tennhom' },
    { title: 'Ghi chú', dataIndex: 'ghichu' },
];

const userColumns = [
    { title: 'Mã số', dataIndex: 'name' },
    { title: 'Họ tên', dataIndex: 'hoten' },
    { title: 'Giới tính', dataIndex: 'isMale' },
    { title: 'Chức vụ', dataIndex: 'chucvu' },
    { title: 'Nhiệm vụ', dataIndex: 'nhiemvu' },
];

function UserTable({ record, selectedRowKey, selectUserRow, removeNhomSelection, removeUserSelection }) {

    return (
        <Table
            columns={userColumns}
            dataSource={record.users.map((item, index) => {
                return {
                    ...item,
                    key: index,
                    isMale: item.isMale ? 'Nam' : 'Nữ',
                }
            })}
            bordered={true}
            pagination={false}
            // loading={isLoading}
            // style={{ flexGrow: 8 }}
            rowSelection={{
                selectedRowKeys: selectedRowKey == null ? [] : [selectedRowKey],
                type: 'radio',
                onSelect: function (userRecord) {
                    selectUserRow(record.key, userRecord);
                },
                // columnWidth: '80px'
            }}
            onRow={(userRecord) => ({
                onClick: () => {
                    selectUserRow(record.key, userRecord);
                },
                onContextMenu: (e) => {
                    e.preventDefault();
                    removeNhomSelection();
                    removeUserSelection();
                }
            })}
        />
    )
}

function NhomTable({ nhoms, isLoading, setCurrentNhomFunc, setCurrentUserFunc, removeCurrentNhom, removeCurrentUser }) {
    const [selectedNhomRowKey, setSelectedNhomRowKey] = useState([]);
    const [selectedRowKeyArr, setSelectedRowKeyArr] = useState([null, null]);

    function selectUserRow(nhomKey, userRecord) {
        setSelectedRowKeyArr([nhomKey, userRecord.key]);
        removeNhomSelection();
        setCurrentUserFunc(userRecord);
    }

    function selectNhomRow(record) {
        setSelectedNhomRowKey([record.key]);
        removeUserSelection();
        setCurrentNhomFunc(record);
    }

    function removeNhomSelection(){
        setSelectedNhomRowKey([]);
        removeCurrentNhom();
    }

    function removeUserSelection() {
        setSelectedRowKeyArr([null, null])
        removeCurrentUser();
    }


    return (
        <React.Fragment>
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: record => <UserTable record={record} removeNhomSelection={removeNhomSelection} removeUserSelection={removeUserSelection} selectedRowKey={record.key == selectedRowKeyArr[0] ? selectedRowKeyArr[1] : null} selectUserRow={selectUserRow} />,
                rowExpandable: record => record.users.length > 0,
                indentSize: 30
            }}
            dataSource={nhoms.length > 0 ? nhoms.map((item, index) => {
                return {
                    key: index,
                    ...item
                }
            }) : null}
            bordered={true}
            pagination={false}
            loading={isLoading}
            style={{ flexGrow: 8 }}
            rowSelection={{
                selectedRowKeys: selectedNhomRowKey,
                type: 'radio',
                onSelect: function (record) {
                    selectNhomRow(record);
                }
            }}
            onRow={(record) => ({
                onClick: () => {
                    selectNhomRow(record);
                },
                onContextMenu: (e) => {
                    e.preventDefault();
                    removeNhomSelection();
                    removeUserSelection()
                }
            })}
            style={{marginTop: '5px'}}
        />
        </React.Fragment>
    )
}

export default NhomTable;