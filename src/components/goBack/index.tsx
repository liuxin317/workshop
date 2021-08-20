import { useNavigate } from "react-router-dom";
import { LeftOutlined } from '@ant-design/icons';
import { url } from "inspector";

export default function Index (props: { url: string }) {
    const navigate = useNavigate();
    const { url } = props;

    return (
        <section className="go-back">
            <a onClick={() => navigate(url)}>
                <LeftOutlined />
                返回
            </a>
        </section>
    )
}