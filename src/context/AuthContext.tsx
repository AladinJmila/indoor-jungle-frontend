import { createContext, useReducer, useEffect } from 'react';
import { projectAuth } from '../firebase/config';

interface AuthContextInterface {
  user: any | null;
  authIsReady: boolean;
  authDispatch: React.Dispatch<Action> | any;
}

// export const AuthContext = createContext<AuthContextInterface | null>(null);
export const AuthContext = createContext<AuthContextInterface | null>(null);

type State = {
  user: any | null;
  authIsReady: boolean;
  authDispatch: React.Dispatch<Action>;
};
enum ActionType {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  AuthIsReady = 'AUTH_IS_READY',
  SetDispatch = 'SET_DISPATCH',
}
type Action = { type: ActionType; payload: any | null | boolean };

export const loginAction: Action = { type: ActionType.Login, payload: null };
export const logoutAction: Action = { type: ActionType.Logout, payload: null };
const authIsReady: Action = { type: ActionType.AuthIsReady, payload: false };
const setDispatch: Action = { type: ActionType.SetDispatch, payload: null };

const initialState: AuthContextInterface = {
  user: null,
  authIsReady: false,
  authDispatch: null,
};

const authReducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DISPATCH':
      return { ...state, authDispatch: payload };
    case 'LOGIN':
      return { ...state, user: payload };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  setDispatch.payload = dispatch;
  console.log('inside', state);

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      authIsReady.payload = user;
      dispatch(authIsReady);
      unsub();
    });
    if (!state.authDispatch) dispatch(setDispatch);
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
