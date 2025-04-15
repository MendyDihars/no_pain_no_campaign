import { getTranslations } from "next-intl/server";
import ActionError from "@root/lib/ActionError";
import { getUser } from "@root/lib/user";

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


export async function policy() {
  const user = await getUser();
  if (!user || user.role !== 'admin') throw new ActionError('Unauthorized', 'Unauthorized');
}