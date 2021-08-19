import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import util from '@util';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const menu = util.menu;
    const state = useSelector((state: any) => state);
    const homePath = menu[0]?.path ? menu[0]?.path : menu[0]?.children[0].path;

    useEffect(() => {
        if (state.count) {
            navigate('/login');
        } else {
            navigate(homePath, { replace: true })
        }
    }, [homePath, navigate])
    return null;
}

export default Home;