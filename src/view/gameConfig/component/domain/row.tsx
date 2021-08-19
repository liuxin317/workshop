import { useState, useCallback, useEffect } from "react";
import { Input, message } from 'antd';
import fetch from "@fetch";
import { LoadingOutlined } from "@ant-design/icons";

export default function Index(props:{name: string, url: string, keyName: string, update: () => any}) {
    const { name, url, keyName, update } = props;
    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [val, setVal] = useState<string>('');

    useEffect(() => {
        if (url) {
            setVal(url);
        }
    }, [url]);

    const setDomain = useCallback(async () => {
        if (!val.trim()) {
            message.error("不能为空");
            return;
        };

        setLoading(true);
        const res = await fetch
            .post("config/set/domain", {
                [keyName]: val.trim(),
            })
            // .catch (err => {
            //     console.log(err);
            // })
            .finally(() => {
                setLoading(false);
            });

        if (res.code === 0) {
            message.success("保存成功");
            setEdit(false);
            update();
        };
    }, [val]);

    return (
        <div className="row-box">
            <div className="name-group">
                <h6>{name}</h6>
                <div className="input">
                    {edit ? (
                        <Input
                            style={{ width: 310 }}
                            placeholder="请输入地址"
                            defaultValue={url}
                            onChange={(e) => setVal(e.target.value)}
                        />
                    ) : (
                        <span>{url}</span>
                    )}
                </div>
            </div>
            <div className="eidt-group">
                {edit ? (
                    <>
                        <a onClick={setDomain}>
                            {loading && (
                                <LoadingOutlined style={{ marginRight: 10 }} />
                            )}
                            保存
                        </a>
                        <a onClick={() => {
                            setVal(url);
                            setEdit(false);
                        }}>取消</a>
                    </>
                ) : (
                    <a onClick={() => setEdit(true)}>编辑</a>
                )}
            </div>
        </div>
    );
}
