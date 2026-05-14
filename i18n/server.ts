export {locales, defaultLocale} from "./settings";
export type {Locale} from "./settings";

export async function getTranslations(namespace?: string){
    const {getTranslations: gt} = await import('next-intl/server');
    return gt(namespace);
}

export async function getLocale(){
    const {getLocale: gl} = await import('next-intl/server');
    return gl();
}

export async function getMessages(){
    const {getMessages: gm} = await import('next-intl/server');
    return gm();
}