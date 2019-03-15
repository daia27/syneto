import React from 'react'

export interface IAppContext {
    state: any;
    setState(state: any): void;
}

export const AppContext = React.createContext({});

