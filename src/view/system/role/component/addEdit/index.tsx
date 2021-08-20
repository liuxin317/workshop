import React, {useState} from 'react';
import { Modal, Form, Input, Button } from 'antd';

export default function Index (props) {
    const { visible, handleCancel, rowData } = props;
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const onFinish = (values: any) => {
        setConfirmLoading(true);

        setTimeout(() => {
            setConfirmLoading(false);
            handleCancel();
            console.log('Success:', values);
        }, 2000);
    };

    return (
        <Modal
            className="add-eidt__box"
            title={rowData ? '编辑' : '新增'}
            visible={visible}
            onCancel={handleCancel}
            width={450}
            destroyOnClose={true}
            maskClosable={false}
            footer={null}
        >
            <Form
                name="add-edit"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{  }}
                onFinish={onFinish}
                preserve={false}
            >
                <Form.Item
                    label="角色名称"
                    name="username"
                    rules={[{ required: true, message: '请输入角色名称' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="角色描述"
                    name="desc"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button loading={confirmLoading} type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button onClick={handleCancel} style={{marginLeft: 10}}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
};