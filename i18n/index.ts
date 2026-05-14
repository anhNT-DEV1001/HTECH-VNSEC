// Re-export server utilities (dùng trong server components / server actions)
export {getTranslations, getLocale, getMessages} from './server';
export {locales, defaultLocale} from './settings';
export type {Locale} from './settings';

// Re-export client utilities (dùng trong client components)
export {useLocale} from './client';
