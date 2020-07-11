import { combineReducers } from 'redux';

import authReducer from './auth';
import caseReducers from './cases';
import organizationReducers from './organizations';
import partyReducers from './parties';

const rootReducer =combineReducers({
  auth: authReducer,
  cases: caseReducers,
  organizations: organizationReducers,
  parties: partyReducers,
})

export default rootReducer;
