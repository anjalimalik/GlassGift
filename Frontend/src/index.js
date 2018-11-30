import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faDownload } from '@fortawesome/free-solid-svg-icons';
import WebFont from 'webfontloader';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { getUserId } from './utils';
import Header from './components/Shared/Header';
import Entry from './components/Entry';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import SentEmail from './components/SentEmail';
import ConfirmEmail from './components/ConfirmEmail';
import Dashboard from './components/Dashboard';
import UnknownAccess from './components/UnknownAccess';
import Search from './components/Search';
import DonationCompleted from './components/DonationCompleted';

// Font Awesome
library.add(faSpinner, faDownload);

// load fonts
WebFont.load({
  google: {
    families: ['Roboto Mono', 'Montserrat', 'sans-serif']
  }
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

function requireAuth(nextState, replace, next) {
  const userId = getUserId();
  if (!userId) {
    replace({
      pathname: '/'
    });
  }
  next();
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="container-fluid">
        <Header />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <Route exact path="/dashboard" component={Dashboard} onEnter={requireAuth} />
        <Route exact path="/unknownaccess" component={UnknownAccess} />
        <Route exact path="/profile/:id" component={Profile} onEnter={requireAuth} />
        <Route exact path="/sentEmail" component={SentEmail} />
        <Route exact path="/confirmEmail" component={ConfirmEmail} />
        <Route exact path="/search" component={Search} onEnter={requireAuth} />
        <Route exact path="/donationcompleted" component={DonationCompleted} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
