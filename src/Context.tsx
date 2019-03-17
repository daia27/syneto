import React from 'react'

export interface IAppContext {
    state: any;
    setState(state: any): void;
    getVideos(categoryId: string, query?: string): Promise<any>
}

export const AppContext = React.createContext({});

