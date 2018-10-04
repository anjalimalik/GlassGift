import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import resetPassword from './resetPassword';
import forgotPassword from './forgotPassword';
import updateNGO from './updateNGO';
import confirmEmail from './confirmEmail';
// import search from './search';

export default combineReducers({
  login,
  signup,
  resetPassword,
  forgotPassword,
  updateNGO,
  confirmEmail,
  //search,
});
