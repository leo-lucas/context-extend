import React, { createContext, useContext, useReducer,  Reducer } from 'react';
export const StateContext = createContext({});

type ActionCreator = {
type: string
}

interface createReducer{
  reducer: Reducer<Object, ActionCreator> , children: JSX.Element
}

export function combineReducers(reducer: any){
  return (state: any , action: any) => {
    const nextReducers: any= {};
    for (const prop in reducer) {
      nextReducers[prop] = reducer[prop](state[prop], action)
    }
    return nextReducers;
  };
};

export const Provider = ({ reducer,  children }: createReducer) => {
  return (
  <StateContext.Provider value={useReducer(reducer, {})}>
    {children}
  </StateContext.Provider>
)};

export const useStateValue = () => useContext(StateContext);

export function useSelector  (selector: Function) {
  const [state]:any = useStateValue()
  return selector(state);
}  

export function useDipatch(): Function {
  const [state, dispatch]:any = useStateValue();
  
  return (action: Function| ActionCreator) => typeof action === "function" ? action(dispatch, state) : dispatch(action)
}
