import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import resetPassword from './resetPassword';
import forgotPassword from './forgotPassword';

export default combineReducers({
  login,
  signup,
  resetPassword,
  forgotPassword,
});
