import React, {useState, useCallback, useEffect} from 'react';
import { Menu, Spin } from "antd";
import Domain from './component/domain';
import fetch from "@fetch";
import './style.scss';

interface Domains {
    feedbackUrl: string,
    gameUrl: string,
    shareUrl: string,
    wsUrl: string
}

const Index: React.FC = () => {
    const handleClick = (e:Object):void => {
        console.log("click ", e);
    };
    const [loading, setLoading] = useState<boolean>(true);
    const [update, setUpdate] = useState<boolean>(true);
    const [domains, setDomains] = useState<Domains>({
        feedbackUrl: '',
        gameUrl: '',
        shareUrl: '',
        wsUrl: '',
    });

    useEffect(() => {
        if (update) {
            getDomain();
            setUpdate(false);
        }
    }, [update]);

    const getDomain = useCallback(async () => {
        setLoading(true);

        const res = await fetch.post("config/get/domain").finally(() => {
            setLoading(false);
        });
        setDomains(res.data);
    }, []);

    return (
        <section className="game-config__box">
            {/* 菜单 */}
            <Menu
                onClick={handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={["1"]}
                mode="inline"
            >
                <Menu.Item key="1">域名配置</Menu.Item>
            </Menu>

            {/* content */}
            <div className="content">
                <Spin spinning={loading}>
                    <Domain data={domains} update={() => setUpdate(true)} />
                </Spin>
            </div>
        </section>
    );
};

export default Index;