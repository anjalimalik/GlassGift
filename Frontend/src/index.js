import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Header from './components/Shared/Header';
import App from './components/App';
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

// Font Awesome
library.add(faSpinner);

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="container-fluid">
        <Header >
        </Header>
        <a className="btn btn-link btn-bg pull-right" onClick={e => {/* add auth logout function call later */}} href={"/login"}>Logout</a>
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/unknownaccess" component={UnknownAccess} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/sentEmail" component={SentEmail} />
        <Route exact path="/confirmEmail" component={ConfirmEmail} />
        <Route exact path="/search" component={Search} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
