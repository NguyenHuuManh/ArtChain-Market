import { Dispatch, useEffect } from "react";
import { createContext, useContext, useMemo, useReducer } from "react";

interface AuthorState {
  username: string;
  password: string;
}

interface AuthorAction {
  type: string;
  value: AuthorState;
}
const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();
const keySession = "auth";

const initalState = {
  username: "",
  password: "",
};
const AuthorContext = createContext<[AuthorState, Dispatch<AuthorAction>]>([
  initalState,
  () => {},
]);
const ACTION_TYPE = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  INIT_SESSIOM: "INIT_SESSIOM",
};

const dispatchLogin = (dispatch: Dispatch<AuthorAction>, value: AuthorState) =>
  dispatch({ type: ACTION_TYPE.LOGIN, value });

const dispatchLogout = (dispatch: Dispatch<AuthorAction>) =>
  dispatch({ type: ACTION_TYPE.LOGOUT, value: initalState });

const useAuth = () => {
  const authContex = useContext(AuthorContext);
  return authContex;
};

const AuthorProvider = ({ children }: { children: React.ReactNode }) => {
  const reducer = (state: AuthorState, action: AuthorAction) => {
    switch (action.type) {
      case ACTION_TYPE.LOGIN:
        sessionStorage.setItem(keySession, JSON.stringify(action.value));
        return { ...state, ...action.value };
      case ACTION_TYPE.LOGOUT:
        return { ...state, ...initalState };
      case ACTION_TYPE.INIT_SESSIOM:
        return { ...state, ...action.value };
      default:
        break;
    }
  };

  const [controller, dispatch] = useReducer<any>(reducer, initalState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  useEffect(() => {
    const valueSession = sessionStorage.getItem(keySession);
    if (!!valueSession) {
      const AuthSession = JSON.parse(valueSession);
      dispatch({
        type: ACTION_TYPE.INIT_SESSIOM,
        value: {
          username: AuthSession.username,
          password: AuthSession.password,
        },
      });
      console.log(AuthSession, "===AuthSession===");
    }
  }, []);
  return (
    <AuthorContext.Provider value={value as any}>
      {children}
    </AuthorContext.Provider>
  );
};

export default AuthorProvider;
export { dispatchLogin, dispatchLogout, useAuth };
