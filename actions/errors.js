import { getTranslations } from "next-intl/server";

export async function handle(promise) {
  const t = await getTranslations();

  try {
    const data = await promise;
    return { data, success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof ActionError) {
      return { error: t(`Errors.${error.code}`), success: false };
    }
    return { error: error.message, success: false };
  }
}
