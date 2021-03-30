import React from 'react';
import { Router, Route, Switch,Redirect} from 'dva/router';
import Loadable from 'react-loadable';
import Navigation from './routes/components/Navigation'
import SearchPage from './routes/SearchCommodity'
import IndexPage from './routes/IndexPage';
// import Home from './routes/Home'

function RouterConfig({ history }) {
  const Loading = () => <div />;
  const HomePage = Loadable({
    loader: () => import('./routes/Home'),
    loading: Loading,
  });
  const CartPage = Loadable({
    loader: () => import('./routes/Cart'),
    loading: Loading,
  });
  // 我的
  const MinePage = Loadable({
    loader: () => import('./routes/Mine'),
    loading: Loading,
  });
  // 收藏夹
  const CollectPage = Loadable({
    loader: () => import('./routes/Mine/components/Collect'),
    loading: Loading,
  });
  // 关注的人
  const AttentionPage = Loadable({
    loader: () => import('./routes/Mine/components/Attention'),
    loading: Loading,
  });
  // 历史浏览
  const BrosingHistoryPage = Loadable({
    loader: () => import('./routes/Mine/components/Brosing'),
    loading: Loading,
  });
  // 我发布的
  const PublishPage = Loadable({
    loader: () => import('./routes/Mine/components/Publish'),
    loading: Loading,
  });
  // 我卖出的
  const SaledPage = Loadable({
    loader: () => import('./routes/Mine/components/Saled'),
    loading: Loading,
  });
  // 订单页面
  const OrderPage = Loadable({
    loader: () => import('./routes/Mine/components/Order'),
    loading: Loading,
  });
  // 登录页面
  const LoginPage = Loadable({
    loader: () => import('./routes/Mine/components/Login'),
    loading: Loading,
  });
  // 忘记密码
  const ForgetPage = Loadable({
    loader: () => import('./routes/Mine/components/Forget'),
    loading: Loading,
  });
  // 注册页面
  const RegisterPage = Loadable({
    loader: () => import('./routes/Mine/components/Register'),
    loading: Loading,
  });
  // 修改密码页面
  const UpdatePwdPage = Loadable({
    loader: () => import('./routes/Mine/components/UpdatePwd'),
    loading: Loading,
  });
  // 修改手机号页面
  const UpdatePhonePage = Loadable({
    loader: () => import('./routes/Mine/components/UpdatePhone'),
    loading: Loading,
  });
  // 设置页面
  const settingsPage = Loadable({
    loader: () => import('./routes/Mine/components/Settings'),
    loading: Loading,
  });
  // 修改页面
  const alterUserInfoPage = Loadable({
    loader: () => import('./routes/Mine/components/Settings/Components/AlterUserInfo'),
    loading: Loading,
  });
  // 修改页面
  const autonymPage = Loadable({
    loader: () => import('./routes/Mine/components/Settings/Components/Autonym'),
    loading: Loading,
  });
  const CommodityPage = Loadable({
    loader: () => import('./routes/CommodityDetail'),
    loading: Loading,
  });
  const SearchPage2 = Loadable({
    loader: () => import('./routes/SearchCommodity'),
    loading: Loading,
  });
  const SalePage = Loadable({
    loader: () => import('./routes/SalePage'),
    loading: Loading,
  });
  const ClearingPage = Loadable({
    loader: () => import('./routes/Clearing'),
    loading: Loading,
  });

  const ClearingSuccessPage = Loadable({
    loader: () => import('./routes/OrderSuccess'),
    loading: Loading,
  });
  const orderDetail = Loadable({
    loader: () => import('./routes/OrderDetail'),
    loading: Loading,
  });
  const RefoundGood = Loadable({
    loader: () => import('./routes/RefoundGood'),
    loading: Loading,
  });
  const AddressMangePage = Loadable({
    loader: () => import('./routes/AddressMange'),
    loading: Loading,
  });
  const addAddressPage = Loadable({
    loader: () => import('./routes/AddAddress'),
    loading: Loading,
  });
  const successPage = Loadable({
    loader: () => import('./routes/SuccessPage'),
    loading: Loading,
  });
  // 消息页面
  const MessagePage = Loadable({
    loader: () => import('./routes/Message'),
    loading: Loading,
  });
  // 发送消息
  const SendMessagePage = Loadable({
    loader: () => import('./routes/Message/Components/SendMessage'),
    loading: Loading,
  });
  // 聊天页面
  const chatPage = Loadable({
    loader: () => import('./routes/Message/Chart.js'),
    loading: Loading,
  });
  // 卖家详细信息
  const SellerInfo = Loadable({
    loader: () => import('./routes/SellerInfo/index'),
    loading: Loading,
  });

  const goTo = (url) => {
    history.push(url)
  }
  return (
    <Router history={history}>
      <div>
      <Switch>

        <Route path="/"  exact component={IndexPage} />
        {/* 主页 */}
        <Route path="/home" exact component={HomePage} />
        {/* 购物车页面 */}
        <Route path="/cart" exact component={CartPage} />
        {/* 我的 */}
        <Route path="/mine" exact component={MinePage} />
        {/* 收藏夹 */}
        <Route path='/mine/collect' exact component={CollectPage} />
        {/* 关注页面 */}
        <Route path='/mine/attention' exact component={AttentionPage} />
        {/* 历史浏览 */}
        <Route path='/mine/history' exact component={BrosingHistoryPage} />
        {/* 已发布 */}
        <Route path='/mine/publish' exact component={PublishPage} />
        {/* 已卖出 */}
        <Route path='/mine/saled' exact component={SaledPage} />
        {/* 订单页面 */}
        <Route path='/mine/order/:tabPage' exact component={OrderPage} />
        {/* 修改密码 */}
        <Route path='/mine/updatePwd' exact component={UpdatePwdPage} />
        {/* 修改手机号码 */}
        <Route path='/mine/updatePhone' exact component={UpdatePhonePage} />
        {/* 登录页面 */}
        <Route path="/mine/login" exact component={LoginPage} />
        {/* 设置页面 */}
        <Route path='/mine/settings' exact component={settingsPage} />
        {/* 忘记密码 */}
        <Route path='/mine/forget' exact component={ForgetPage} />
        {/* 修改用户信息 */}
        <Route path='/mine/settings/alterUserInfo' exact component={alterUserInfoPage} />
        {/* 实名认证页面 */}
        <Route path="/mine/settings/autonym" exact component={autonymPage} />
        {/* 注册页面 */}
        <Route path="/mine/register" exact component={RegisterPage} />
        {/* 商品详细页面 */}
        <Route path='/commodityDetail/:goodId' exact component={CommodityPage} />
        {/* 搜索页面 */}
        <Route path='/search/:word' exact component={SearchPage2} />
        {/* 发布闲置 */}
        <Route path='/sale' exact component={SalePage} />
        <Route path='/clearing/:goodId' exact component={ClearingPage} />
        <Route path='/orderSuccess' exact component={ClearingSuccessPage} />
        <Route path='/orderDetail/:orderId' exact component={orderDetail} />
        <Route path='/refoundGood/:orderId' exact component={RefoundGood} />
        <Route path='/addressMange' exact component={AddressMangePage} />
        <Route path='/addAddress' exact component={addAddressPage} />
        <Route path='/success' exact component={successPage} />
        {/* 消息页面 */}
        <Route path='/message' exact component={MessagePage} />
        {/* 发送消息页面 */}
        <Route path='/message/sendMessage/:receiver' exact component={SendMessagePage} />
        <Route path='/chat' exact component={chatPage} />
        <Route path='/seller/:userId' exact component={SellerInfo} />

        {/* <Route path='/search/:word'  component={SearchPage} /> */}
        </Switch>
        <Navigation history={history} goTo={goTo}></Navigation>
      </div>
    </Router>
  );
}

export default RouterConfig;
