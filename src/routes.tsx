
import { ReactElement, lazy } from 'react';
import View from '@view';
import Home from '@view/home';
import menu from '@config/menu';
import Login from '@view/login';

interface children {
  path: string,
  element: ReactElement | string,
};

const children: children[] = [];
function menuDg (data:Array<any>):void {
  data.forEach(it => {
    if (it.path){
      children.push({
        path: it.path,
        element: it.element,
      });

      if (it.children?.length) {
        menuDg(it.children);
      }
    } else {
      if (it.children.length) {
        menuDg(it.children);
      }
    }
  });
};
menuDg(menu);

export default [
  { path: '', element: <Home /> },
  { path: '/*', element: <View />, children, },
  { path: '/login', element: <Login /> },
]
