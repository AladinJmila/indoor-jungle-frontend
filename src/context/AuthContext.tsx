import { createContext, useReducer, useEffect } from 'react';
import { projectAuth } from '../firebase/config';

interface AuthContextInterface {
  user: null;
  authIsReady: boolean;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

// type Reducer<State, Action> = (state: State, action: Action) => State;
type State = { user: null; authIsReady: boolean };
enum ActionType {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  AuthIsReady = 'AUTH_IS_READY',
}
type Action = { type: ActionType; payload: null | boolean };

const login: Action = { type: ActionType.Login, payload: null };
const logout: Action = { type: ActionType.Logout, payload: null };
const authIsReady: Action = { type: ActionType.AuthIsReady, payload: false };

const initialState: AuthContextInterface = { user: null, authIsReady: false };

const authReducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (action.payload) {
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch(authIsReady);
    });
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
