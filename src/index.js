/*
 * @Author: your name
 * @Date: 2020-12-25 10:03:44
 * @LastEditTime: 2021-02-06 16:42:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\index.js
 */
import dva from 'dva';
import createLoading from 'dva-loading';
import { createBrowserHistory as createHistory } from 'history';

import './index.css';

// 1. Initialize
const app = dva({
  // history: createHistory()
});
// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/home').default);
app.model(require('./models/mine').default);
app.model(require('./models/sale').default);
app.model(require('./models/goodDetail').default);
app.model(require('./models/message').default);

// 4. Router
app.router(require('./router').default);



// 5. Start
app.start('#root');
