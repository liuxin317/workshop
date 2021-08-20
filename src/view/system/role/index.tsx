import {useState} from 'react';
import { Button, Table, Popconfirm } from 'antd';
import columns, { x } from './columns';
import AddEdit from './component/addEdit';
import Authority from './component/authority';
import './style.scss';

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];

export default function Index () {
    const [loading, setLoading] = useState<boolean>(false);
    const [addEditVisible, setAddEditVisible] = useState<boolean>(false);
    const [authorityVisible, setAuthorityVisible] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [sorter, setSorter] = useState<any>('');
    const [rowData, setRowData] = useState<any>('');

    const tableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        setSize(pagination.pageSize);
        setSorter(sorter.order ? sorter : '');
    };

    const openAddEdit = (data?) => {
        setRowData(data);
        setAddEditVisible(true);
    };

    const openAuthority = (data?) => {
        setRowData(data);
        setAuthorityVisible(true);
    };

    const operateElm = function (record) {
        const handleOk = (e) => {
            console.log(e)
        };

        return (
            <div className="a-group">
                <a onClick={() => openAddEdit(record)}>编辑</a>
                <a onClick={() => openAuthority(record)}>权限</a>
                <Popconfirm
                    title="您确定要删除此任务吗?"
                    onConfirm={handleOk}
                    // okButtonProps={{ loading: confirmLoading }}
                >
                    <a>删除</a>
                </Popconfirm>
            </div>
        )
    };

    return (
        <section className="role-box">
            <div className="btns-row">
                <Button onClick={openAddEdit.bind(null, '')} type="primary">新增</Button>
                <Button>管理关系</Button>
            </div>

            <div className="table-box">
                <Table 
                    bordered
                    loading={loading}
                    dataSource={dataSource} 
                    columns={columns(operateElm)} 
                    scroll={{ x }}
                    onChange={tableChange}
                    pagination={{
                        current: page,
                        pageSize: size,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        total,
                        showTotal(total) {
                            return `共 ${total} 条记录`;
                        },
                    }}
                />
            </div>

            {/* 新增/编辑 */}
            <AddEdit 
                visible={addEditVisible}
                rowData={rowData}
                handleCancel={() => setAddEditVisible(false)}
            />

            {/* 权限 */}
            <Authority 
                visible={authorityVisible}
                rowData={rowData}
                handleCancel={() => setAuthorityVisible(false)}
            />
        </section>
    )
};