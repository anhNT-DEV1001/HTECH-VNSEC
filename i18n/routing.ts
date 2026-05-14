// i18n/routing.ts
import {defineRouting} from 'next-intl/routing';
import {locales, defaultLocale} from './settings';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});