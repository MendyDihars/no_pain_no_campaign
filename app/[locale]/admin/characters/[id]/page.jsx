import { getFullCharacter } from "@root/actions/character";
import { getRaces, getKlasses } from "@root/actions/background";
import DATime from "@root/lib/da-time";
import { roxborough } from "@root/lib/fonts";
import { getTranslations } from "next-intl/server";
import Select from "@root/components/ui/Select";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

export default async function AdminCharacterPage({ params }) {
  const { id } = await params;
  const [character, races, klasses, t] = await Promise.all([
    getFullCharacter(id),
    getRaces(),
    getKlasses(),
    getTranslations()
  ]);
  return (
    <div className="h-full w-full p-20 bg-gradient-to-br from-black to-secondary">
      <Link href="/admin/characters" className="text-foreground flex items-center gap-1 text-lg">
        <ChevronLeftIcon className="w-5 h-5" />
        {t('General.back')}
      </Link>
      <div className={`${roxborough.className} text-secondary text-4xl mt-12`}>
        {character.firstname} {character.lastname}
      </div>
      <form className="w-full mt-10">
        <div className="flex md:justify-between flex-col md:flex-row">
          
          {/* FIRST BLOCK */}
          <div className="flex flex-col gap-6 w-full flex-1">
            <div className="flex items-center">
                <label htmlFor="firstname" className={`${roxborough.className} text-secondary text-lg w-48`}>
                {t('Admin.Character.firstname')}
              </label>
              <input
                className="w-full md:w-1/2 lg:w-1/4 border-l-1 border-secondary px-4 py-2 focus:outline-none"
                value={character.firstname}
                type="text"
                name="firstname" placeholder={t('Admin.Character.firstname')}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="lastname" className={`${roxborough.className} text-secondary text-lg w-48`}>
                {t('Admin.Character.lastname')}
              </label>
              <input
              className="w-full md:w-1/2 lg:w-1/4 border-l-1 border-secondary px-4 py-2 focus:outline-none"
              value={character.lastname}
              type="text"
              name="lastname"
                placeholder={t('Admin.Character.lastname')}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="birthdate" className={`${roxborough.className} text-secondary text-lg w-48`}>
                {t('Admin.Character.birthdate')}
              </label>
              <input
                className="w-full border-l-1 flex-1 border-secondary px-4 py-2 focus:outline-none"
                value={new DATime(character.birthdate).formatDateReadable()}
                name="birthdate"
                placeholder={t('Admin.Character.birthdate')}
                disabled
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="gender" className={`${roxborough.className} text-secondary text-lg w-48`}>
                {t('Admin.Character.gender')}
              </label>
              <input
                className="w-full md:w-1/2 lg:w-1/4 border-l-1 border-secondary px-4 py-2 focus:outline-none"
                value={character.gender}
                type="text"
                name="gender"
                placeholder={t('Admin.Character.gender')}
              />
            </div>
          </div>

          {/* SECOND BLOCK */}
          <div className="flex-1 w-full flex flex-col items-end gap-6 mt-6 md:mt-0">
            
            <div className="flex items-center md:flex-row flex-row-reverse md:justify-end w-full">
              <Select
                id="race"
                options={races.map((race) => ({ label: race.name, value: race.id }))}
                placeholder={t('Admin.Character.race')}
                className="w-full text-md cursor-pointer md:w-1/2 border-0 border-l-1 md:border-l-0 md:border-r-1 rounded-none shadow-none border-secondary md:border-background px-4 py-2 active:border-none focus:outline-none text-right"
                contentClassName="border-0 bg-secondary text-background"
                itemClassName="cursor-pointer text-md rounded-none bg-background text-secondary"
                value={character.race_id}
              />
              <label htmlFor="race" className={`${roxborough.className} md:text-background text-secondary text-lg w-48 flex md:justify-end`}>
                {t('Admin.Character.race')}
              </label>
            </div>
            
            <div className="flex items-center md:flex-row flex-row-reverse md:justify-end w-full">
              <Select
                id="klass"
                options={klasses.map((klass) => ({ label: klass.name, value: klass.id }))}
                placeholder={t('Admin.Character.klass')}
                className="w-full text-md cursor-pointer md:w-1/2 border-0 border-l-1 md:border-l-0 md:border-r-1 rounded-none shadow-none border-secondary md:border-background px-4 py-2 active:border-none focus:outline-none text-right"
                contentClassName="border-0"
                itemClassName="cursor-pointer text-md"
                value={character.klass_id}
              />
              <label htmlFor="klass" className={`${roxborough.className} md:text-background text-secondary text-lg w-48 flex md:justify-end`}>
                {t('Admin.Character.klass')}
              </label>
            </div>
            
            <div className="flex items-center md:flex-row flex-row-reverse md:justify-end w-full">
              <input
                id="klass"
                options={klasses.map((klass) => ({ label: klass.name, value: klass.id }))}
                placeholder={t('Admin.Character.sexualOrientation')}
                className="w-full text-md md:w-1/2 border-0 border-l-1 md:border-l-0 md:border-r-1 rounded-none shadow-none border-secondary md:border-background px-4 py-2 active:border-none focus:outline-none"
                value={character.sexual_orientation}
              />
              <label htmlFor="klass" className={`${roxborough.className} md:text-background text-secondary text-lg w-48 md:text-right flex md:justify-end`}>
                {t('Admin.Character.sexualOrientation')}
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
