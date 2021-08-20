import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Tree } from 'antd';
import menu from '@config/menu';

let allMenuKeys:(number | string)[] = [];

export default function Index(props) {
    const { visible, handleCancel, rowData } = props;
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [checkedKeys, setCheckedKeys] = useState<Array<string | number>>([]);
    const [treeMenuData, setTreeMenuData] = useState<any[]>([]);

    useEffect(() => {
        setCheckedKeys(allMenuKeys);
        handleMenuData();
    }, [])

    const onCheck = (checkedKeys, info) => {
        console.log(checkedKeys, info, 111);
        setCheckedKeys(checkedKeys);
    };

    const handleMenuData = () => {
        let deepMenu = [...menu];
        dg(deepMenu);
        setTreeMenuData(deepMenu);
    };

    const dg = (data) => {
        data.forEach(item => {
            item.key = item.id;
            allMenuKeys.push(item.id);
            if (item.children?.length) {
                dg(item.children)
            }
        });
    };

    const onSubmit = useCallback(
        () => {
            setConfirmLoading(true);
            setTimeout(() => {
                setConfirmLoading(false);
                handleCancel();
            }, 2000)
        },
        [],
    );

    return (
        <Modal
            className="authority-box"
            title="权限"
            visible={visible}
            onOk={onSubmit}
            onCancel={handleCancel}
            width={450}
            destroyOnClose={true}
            maskClosable={false}
            confirmLoading={confirmLoading}
        >
            <Tree
                checkable
                // defaultExpandAll
                selectable={false}
                checkedKeys={checkedKeys}
                onCheck={onCheck}
                treeData={treeMenuData}
            />
        </Modal>
    )
};