import React from 'react';
import { Button, Table } from 'antd';
import columns, { x } from './columns';
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
    console.log(x);

    return (
        <section className="role-box">
            <div className="btns-row">
                <Button type="primary">新增</Button>
                <Button>管理关系</Button>
            </div>

            <div className="table-box">
                <Table 
                    bordered
                    dataSource={dataSource} 
                    columns={columns()} 
                    scroll={{ x }}
                />
            </div>
        </section>
    )
};