import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import resetPassword from './resetPassword';
import forgotPassword from './forgotPassword';
import updateNGO from './updateNGO';
import updateNGONotice from './updateNGONotice';
import getNGO from './getNGO';
import getNGONotice from './getNGONotice';
import confirmEmail from './confirmEmail';
import search from './search';
import donate from './donate';
import donationEmail from './donationEmail';
import getSearches from './getSearches';
import getNGODonations from './getNGODonations';
import getDonorDonations from './getDonorDonations';
import getNGONewsletter from './getNGONewsletter';

export default combineReducers({
  login,
  signup,
  resetPassword,
  forgotPassword,
  updateNGO,
  updateNGONotice,
  getNGO,
  getNGONotice,
  confirmEmail,
  search,
  donate,
  donationEmail,
  getSearches,
  getNGODonations,
  getDonorDonations,
  getNGONewsletter,
});
