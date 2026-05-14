import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export default getRequestConfig(async ({requestLocale}: {requestLocale: Promise<string | undefined>}) => {
    const locale = await requestLocale;

    if(!locale || !locales.includes(locale as Locale)){
        notFound();
    }
    return {
        locale,
        messages: {
            ...(await import(`./locales/${locale}/translation.json`)).default,
            ...(await import(`./locales/${locale}/menu.json`)).default,
        },
    };
});