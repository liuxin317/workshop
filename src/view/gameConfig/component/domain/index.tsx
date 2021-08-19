import Row from './row';

export default function Index(props: { data: any, update: () => any }) {
    const { data, update } = props;

    return (
        <div className="domain-box">
            <h4 className="title">域名设置</h4>

            <Row
                name="分享地址"
                url={data.shareUrl}
                keyName="shareUrl"
                update={update}
            />
            <Row
                name="WS地址"
                url={data.wsUrl}
                keyName="wsUrl"
                update={update}
            />
            <Row
                name="图片地址"
                url={data.feedbackUrl}
                keyName="feedbackUrl"
                update={update}
            />
            <Row
                name="游戏地址／跳转地址"
                url={data.gameUrl}
                keyName="gameUrl"
                update={update}
            />
        </div>
    );
};