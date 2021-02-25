import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducers from "./user";
import casesReducers from "./cases";
import caseReducers from "./case";
import organizationReducers from "./organization";
import organizationsReducers from "./organizations";
import partyReducers from "./parties";
import documentReducers from "./documents";
import inviteReducers from "./invites";
import hearingReducers from "./hearings";
import caseTypeReducers from "./caseTypes";
import contractReducers from "./contract";
import adminReducer from "./admin";
import adminCaseReducers from "./adminReducer";
import adminUserReducer from "./adminUserReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducers,
  cases: casesReducers,
  case: caseReducers,
  organizations: organizationsReducers,
  organization: organizationReducers,
  parties: partyReducers,
  documents: documentReducers,
  invites: inviteReducers,
  hearings: hearingReducers,
  caseTypes: caseTypeReducers,
  contractCase: contractReducers,
  admin: adminReducer,
  adminCaseDetail: adminCaseReducers,
  adminUsers: adminUserReducer,
});

export default rootReducer;
