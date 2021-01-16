import React from 'react';
import { Router, Route, Switch } from 'dva/router';
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
  const MinePage = Loadable({
    loader: () => import('./routes/Mine'),
    loading: Loading,
  });
  const CollectPage = Loadable({
    loader: () => import('./routes/Mine/components/Collect'),
    loading: Loading,
  });
  const AttentionPage = Loadable({
    loader: () => import('./routes/Mine/components/Attention'),
    loading: Loading,
  });
  const BrosingHistoryPage = Loadable({
    loader: () => import('./routes/Mine/components/Brosing'),
    loading: Loading,
  });
  const PublishPage = Loadable({
    loader: () => import('./routes/Mine/components/Publish'),
    loading: Loading,
  });
  const SaledPage = Loadable({
    loader: () => import('./routes/Mine/components/Saled'),
    loading: Loading,
  });
  const UserPage = Loadable({
    loader: () => import('./routes/UserPage'),
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

  const settingsPage = Loadable({
    loader: () => import('./routes/Settings'),
    loading: Loading,
  });
  const alterUserInfoPage = Loadable({
    loader: () => import('./routes/Settings/Components/AlterUserInfo'),
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
        <Route path="/home" exact component={HomePage} />
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

        <Route path="/userPage" exact component={UserPage} />
        <Route path='/commodityDetail/:id' exact component={CommodityPage} />
        <Route path='/search/:word' exact component={SearchPage2} />
        <Route path='/sale' exact component={SalePage} />
        <Route path='/clearing' exact component={ClearingPage} />
        <Route path='/addressMange' exact component={AddressMangePage} />
        <Route path='/addAddress' exact component={addAddressPage} />
        <Route path='/success' exact component={successPage} />
        {/* 设置页面 */}
        <Route path='/settings' exact component={settingsPage} />
        {/* 修改用户信息 */}
        <Route path='/settings/alterUserInfo' exact component={alterUserInfoPage} />
        {/* <Route path='/search/:word'  component={SearchPage} /> */}
        </Switch>
        <Navigation history={history} goTo={goTo}></Navigation>
      </div>
    </Router>
  );
}

export default RouterConfig;
