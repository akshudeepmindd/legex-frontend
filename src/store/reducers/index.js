import { combineReducers } from 'redux';

import authReducer from './auth';
import caseReducers from './cases';
import organizationReducers from './organizations';
import partyReducers from './parties';
import documentReducers from './documents';
import inviteReducers from './invites';
import hearingReducers from './hearings';
import caseTypeReducers from './caseTypes';

const rootReducer =combineReducers({
  auth: authReducer,
  cases: caseReducers,
  organizations: organizationReducers,
  parties: partyReducers,
  documents: documentReducers,
  invites: inviteReducers,
  hearings: hearingReducers,
  caseTypes: caseTypeReducers,
})

export default rootReducer;
