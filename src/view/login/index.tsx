
import React, { useState, useCallback } from 'react';
import { Form, Input, Button, message, } from 'antd';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import md5 from '@util/md5';
import fetch from '@util/fetch';
import logo from '@img/logo_black.png';
import gs_logo from '@img/gs_logo.png';
import './index.scss';

let password = null;

interface LoginForm {
    accountName: string,
    password: string,
    remember: boolean,
    code?: string | number,
    mills?: string | number,
}

interface Pop {changeCount?:Object | any}

function Index(props: Pop) {
    const cacheUsername = localStorage.getItem('cacheUsername');
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const remember = (values: LoginForm) => {
        if (values.remember) return localStorage.setItem('cacheUsername', values.accountName);
        localStorage.removeItem('cacheUsername')
    }
    const onFinish = useCallback(async (values: LoginForm) => {
        setLoading(true);
        password = values.password
        values.mills = Date.now();
        values.password = md5(values.accountName + values.mills + values.password);
        // const res = await fetch.post('/login', values).finally(() => {
        //     setLoading(false);
        // });

        setTimeout(() => {
            setLoading(false);
            message.success('登录成功！');
            remember(values);
            navigate('/');
        }, 1000);
    }, []);
 
    return (
        <div className='login-wrapper'>
            <figure className="login-logo">
                <img src={gs_logo} alt="" />
            </figure>
            <Form
                name="login"
                className="login-form"
                initialValues={{
                    remember: Boolean(cacheUsername),
                    accountName: cacheUsername,
                }}
                onFinish={onFinish}
            >
                <article>
                    <h1>
                        <img style={{width: 110}} src={logo} />
                        {process.env.REACT_APP_NAME}
                    </h1>
                    <Form.Item
                        name="accountName"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined />}
                            placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            size="large"
                            autoComplete='h5-password'
                            placeholder="密码"
                        />
                    </Form.Item>
                    {
                        // openGoogle &&
                        // <Form.Item
                        //     name="code"
                        //     rules={[{ required: true, message: '请输入谷歌动态口令' }]}
                        // >
                        //     <Input
                        //         prefix={<SafetyCertificateOutlined />}
                        //         size="large"
                        //         placeholder="请输入谷歌动态口令"
                        //     />
                        // </Form.Item>
                    }
                    {/* <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle>
                            <Checkbox>记住用户</Checkbox>
                        </Form.Item>
                    </Form.Item> */}

                    <Form.Item>
                        <Button type="primary"
                            htmlType="submit"
                            size="large"
                            loading={loading}
                            className="login-form-button">
                            登录
                    </Button>
                    </Form.Item>
                </article>
            </Form>
        </div>
    );
}

// const mapDispatch:Object = ({ count: { increment }}) => ({
//     changeCount: () => {
//         increment(1)
//     }
// });

export default Index;