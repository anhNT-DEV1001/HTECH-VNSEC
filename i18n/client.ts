'use client';

import {createContext, useContext} from 'react';

export {locales, defaultLocale} from './settings';
export type {Locale} from './settings';

export const LocaleContext = createContext<string>('vi');

export function useLocale(){
    return useContext(LocaleContext);
}
