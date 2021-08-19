import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useNavigate, Link, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dropdown, Layout, Menu, Space, Skeleton } from 'antd';
import {
    SkinOutlined,
    DownloadOutlined,
    UserOutlined,
    ExportOutlined,
    IdcardOutlined,
    MailOutlined,
    CaretLeftOutlined
} from '@ant-design/icons';
import Logo from '@img/logo.png';
import util from '@util';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

export default function Index() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [visible, setVisible] = useState(false);
    const menu = util.menu;
    const pathname = location.pathname;
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [title, setTitle] = useState<string>('');
    // const state = useSelector((state: any) => state);
    
    useEffect(() => {
        if (false) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        selectOpenKeys(menu);
    }, [pathname]);

    const selectOpenKeys = (data) => {
        data.forEach(item => {
            if (item.path === pathname) {
                setTitle(item.title);
                setOpenKeys([String(typeof item.id !== 'number' ? item.id.substr(0, 1) : item.id)]);
            } else {
                if (item.children?.length) {
                    selectOpenKeys(item.children);
                }
            }
        })
    };

    const onToggle = useCallback(() => {
        setCollapsed(!collapsed);
    }, [collapsed]);

    const person: React.ReactElement = (
        <Menu
            className='head-menu'
        >
            <Menu.Item
                key="0"
                onClick={() => setVisible(true)}>
                <Space><IdcardOutlined />个人中心</Space>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
                <Link to='/login'><Space><ExportOutlined />退出登录</Space></Link>
            </Menu.Item>
        </Menu>
    );

    const recursionMenus:any =  (data:any) => {
        return (
            <>
            {
                data.map(item => {
                    if (item.children?.length) {
                        return (
                            <SubMenu key={item.id} icon={<MailOutlined />} title={item.path ? <Link to={item.path}>{item.title}</Link> : item.title}>
                                {
                                    recursionMenus(item.children)
                                }
                            </SubMenu>
                        )
                    } else {
                        return (
                            <Menu.Item key={item.path}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </Menu.Item>
                        )
                    }
                })
            }
            </>
        )
    };

    return (
        <Layout className='view-wrapper'>
            <Header className="header">
                <h1 className='view-logo'>
                    <img src={Logo} />
                    成都卷烟厂制丝车间智能管理系统
                </h1>
                <div className='view-header-auto' />
                <div className='view-header-user'>
                    <figure><SkinOutlined /></figure>
                    <figure className='header-download'>
                        <DownloadOutlined />
                    </figure>
                    <figure className="header-user"><Dropdown overlay={person}><UserOutlined /></Dropdown></figure>
                    {/* <Avatar style={{ backgroundColor: 'var(--main)' }} icon={} /> */}
                </div>
            </Header>
            <Layout>
                <Sider
                    collapsed={collapsed}
                    className="site-layout-background"
                    width={220} 
                >
                    <span className="close-up" onClick={onToggle}><CaretLeftOutlined /></span>
                    <Menu
                        className='view-menus'
                        mode="inline"
                        defaultSelectedKeys={[pathname]}
                        openKeys={openKeys}
                        theme="dark"
                        onOpenChange={(openKeys:any[]) => setOpenKeys(openKeys)}
                    >
                        {
                            recursionMenus(menu)
                        }
                    </Menu>
                </Sider>

                <Content className='content-wrapper'  style={{ marginLeft: collapsed ? 80 : 220 }}>
                    <h4 className='view-title'>{title}</h4>
                    <div className='content-main'>
                        <Suspense fallback={<Skeleton loading={true} active avatar />}>
                            <Outlet />
                        </Suspense>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}
