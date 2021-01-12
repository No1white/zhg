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
        <Route path="/mine" exact component={MinePage} />
        <Route path="/userPage" exact component={UserPage} />
        <Route path='/commodityDetail/:id' exact component={CommodityPage} />
        <Route path='/search/:word' exact component={SearchPage2} />
        <Route path='/sale' exact component={SalePage} />
        <Route path='/clearing' exact component={ClearingPage} />
        <Route path='/addressMange' exact component={AddressMangePage} />
        <Route path='/addAddress' exact component={addAddressPage} />
        {/* <Route path='/search/:word'  component={SearchPage} /> */}
        </Switch>
        <Navigation history={history} goTo={goTo}></Navigation>
      </div>
    </Router>
  );
}

export default RouterConfig;
