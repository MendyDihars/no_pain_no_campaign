'use client';

import { roxborough } from "@root/lib/fonts";
import { useTranslations } from "next-intl";
import Select from "@root/components/ui/Select";
import DATime from "@root/lib/da-time";
import { useForm } from "react-hook-form";
import {
  upsertCharacter,
  updateCharacterBackground,
  insertCharacterBackground,
} from "@root/actions/character";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Datepicker from "../Calendar/Datepicker";
import { DEFAULT_DATE } from "@root/lib/decorators/character.helper";

export default function CharacterForm({ character, races, klasses }) {
  const t = useTranslations();
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      firstname: character?.firstname || '',
      lastname: character?.lastname || '',
      gender: character?.gender || '',
      birthdate: character?.birthdate || '',
      sexual_orientation: character?.sexual_orientation || '',
      race_id: character?.race_id || '',
      klass_id: character?.klass_id || '',
      id: character?.id || '',
      avatar_id: character?.avatar_id || '',
    }
  });

  const onSubmit = async (data) => {
    let err;
    try {
      const res = await upsertCharacter({
        firstname: data.firstname,
        lastname: data.lastname,
        gender: data.gender,
        birthdate: data.birthdate,
        sexual_orientation: data.sexual_orientation,
        id: data.id,
        avatar_id: data.avatar_id,
      });
      if (res.success) {
        const action = character?.id ? updateCharacterBackground : insertCharacterBackground;
        const res2 = await action({
          klass_id: data.klass_id,
          race_id: data.race_id,
          character_id: res.data.id
        });
        if (!res2.success) err = res2.error;
        else if (character?.id) {
          router.refresh();
        } else {
          router.push(`/admin/characters/${res.data.id}`);
        }
      }
      else err = res.error;
    } catch (error) {
      err = t('Errors.cantSaveCharacter', { error: error.message });
    }
    if (err) toast.error(err);
    else toast.success(t('Success.characterSaved'));
  };

  const birthdate = watch('birthdate') ? new DATime(watch('birthdate')) : new DATime(DEFAULT_DATE);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-10">
      <div className="flex md:justify-between flex-col md:flex-row">
        
        {/* FIRST BLOCK */}
        <div className="flex flex-col gap-6 w-full flex-1">
          <div className="flex items-center">
            <label htmlFor="firstname" className={`${roxborough.className} text-secondary text-lg w-48`}>
              {t('Admin.Character.firstname')}
            </label>
            <input
              {...register('firstname')}
              className="w-full md:w-1/2 lg:w-1/4 border-l-1 border-secondary px-4 py-2 focus:outline-none"
              type="text"
              placeholder={t('Admin.Character.firstname')}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="lastname" className={`${roxborough.className} text-secondary text-lg w-48`}>
              {t('Admin.Character.lastname')}
            </label>
            <input
              {...register('lastname')}
              className="w-full md:w-1/2 lg:w-1/4 border-l-1 border-secondary px-4 py-2 focus:outline-none"
              type="text"
              placeholder={t('Admin.Character.lastname')}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="birthdate" className={`${roxborough.className} text-secondary text-lg w-48`}>
              {t('Admin.Character.birthdate')}
            </label>
            <Datepicker
              date={birthdate}
              onChange={(value) => setValue('birthdate', value.timestamp)}
              className="border-l-1 border-secondary px-4 py-2 text-foreground"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="gender" className={`${roxborough.className} text-secondary text-lg w-48`}>
              {t('Admin.Character.gender')}
            </label>
            <input
              {...register('gender')}
              className="w-full md:w-1/2 lg:w-1/4 border-l-1 border-secondary px-4 py-2 focus:outline-none"
              type="text"
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
              className="w-full cursor-pointer md:w-1/2 border-0 border-l-1 md:border-l-0 md:border-r-1 rounded-none shadow-none border-secondary md:border-background px-4 py-2 active:border-none focus:outline-none text-right"
              value={watch('race_id')}
              onChange={(value) => setValue('race_id', value)}
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
              className="w-full cursor-pointer md:w-1/2 border-0 border-l-1 md:border-l-0 md:border-r-1 rounded-none shadow-none border-secondary md:border-background px-4 py-2 active:border-none focus:outline-none text-right"
              value={watch('klass_id')}
              onChange={(value) => setValue('klass_id', value)}
            />
            <label htmlFor="klass" className={`${roxborough.className} md:text-background text-secondary text-lg w-48 flex md:justify-end`}>
              {t('Admin.Character.klass')}
            </label>
          </div>
          
          <div className="flex items-center md:flex-row flex-row-reverse md:justify-end w-full">
            <input
              {...register('sexual_orientation')}
              className="w-full text-md md:w-1/2 border-0 border-l-1 md:border-l-0 md:border-r-1 rounded-none shadow-none border-secondary md:border-background px-4 py-2 active:border-none focus:outline-none"
              placeholder={t('Admin.Character.sexualOrientation')}
            />
            <label htmlFor="sexual_orientation" className={`${roxborough.className} md:text-background text-secondary text-lg w-48 md:text-right flex md:justify-end`}>
              {t('Admin.Character.sexualOrientation')}
            </label>
          </div>
          
          <div className="flex items-center md:flex-row flex-row-reverse md:justify-end w-full">
            <input
              {...register('avatar_id')}
              className="w-full text-md md:w-1/2 border-0 border-l-1 md:border-l-0 md:border-r-1 rounded-none shadow-none border-secondary md:border-background px-4 py-2 active:border-none focus:outline-none"
              placeholder={t('Admin.Character.avatar')}
              type="file"
            />
            <label htmlFor="avatar_id" className={`${roxborough.className} md:text-background text-secondary text-lg w-48 md:text-right flex md:justify-end`}>
              {t('Admin.Character.avatar')}
            </label>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="bg-primary text-background px-6 py-2 rounded hover:bg-primary/60 transition-colors cursor-pointer"
        >
          {t('General.save')}
        </button>
      </div>
    </form>
  );
}
