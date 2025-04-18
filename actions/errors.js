import { getTranslations } from "next-intl/server";
import ActionError from "@root/lib/ActionError";
import { getUser } from "@root/lib/user";

export async function handle(promise) {
  const t = await getTranslations();

  try {
    if (promise.toSQL) {
      const data = promise.toSQL()
      const sql = data.sql.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim()
      console.log({
        bindings: data.bindings,
        query: data.sql.match(/\?/g)?.reduce((acc, match, index) => (
          acc.replace(match, `'${data.bindings[index]}'`)
        ), sql) ?? sql,
      })
    }
    const data = await promise;
    return { data, success: true };
  } catch (error) {
    if (error.message.includes('Empty .update() call detected')) {
      return { success: true };
    }
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