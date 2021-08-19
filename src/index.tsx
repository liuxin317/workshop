// IE Promise/object.assign
import 'core-js';
import 'es6-shim';
import 'moment/locale/zh-cn';
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import moment from 'moment-timezone';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import store from '@rematchs';
import App from './App';
import '@style/base.scss';

(moment as any).tz.setDefault("Asia/Shanghai");
ReactDOM.render(
    <ConfigProvider locale={zh_CN}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  ,
  document.getElementById('root')
);

