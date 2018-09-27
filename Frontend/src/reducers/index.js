import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import resetPassword from './resetPassword';
import forgotPassword from './forgotPassword';
import updateNGO from './updateNGO';

export default combineReducers({
  login,
  signup,
  resetPassword,
  forgotPassword,
  updateNGO,
});
