interface columnItem {
    title: string,
    dataIndex: string | number,
    key: string | number,
    width?: string | number,
    render?: any
};

export const x = columns().reduce((a, b:any) => {
    return a + parseInt(b.width);
}, 0);

export default function columns(): columnItem[] {
    let column =  [
        {
            title: '序号',
            dataIndex: 'name',
            key: 'name',
            width: 100
        },
        {
            title: '角色名称',
            dataIndex: 'age',
            key: 'age',
            width: 150
        },
        {
            title: '角色描述',
            dataIndex: 'address',
            key: 'address',
            width: 200
        },
        {
            title: '更新时间',
            dataIndex: 'address1',
            key: 'address1',
            width: 200
        },
        {
            title: '更新人',
            dataIndex: 'address2',
            key: 'address2',
            width: 100
        },
        {
            title: '操作',
            dataIndex: 'address3',
            key: 'address3',
            width: 200
        },
    ];

    column.forEach((item:columnItem) => {
        if (!item.render) {
            item.render = text => text ? text : '--';
        }
    });

    return column;
};