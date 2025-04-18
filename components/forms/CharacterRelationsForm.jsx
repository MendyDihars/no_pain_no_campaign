'use client';

import { useState, useEffect, useMemo } from 'react';
import { CopyIcon, PlusIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import Select from '@root/components/ui/Select';
import Datepicker from '@root/components/Calendar/Datepicker';
import DATime from '@root/lib/da-time';
import {
  getRelationTypes,
  getRelations,
  updateRelation,
} from '@root/actions/relation';
import { getCharacters, getCharacter } from '@root/actions/character';
import { DEFAULT_DATE } from '@root/lib/decorators/character.helper';
import { createRelation, deleteRelation, copyRelation } from '@root/actions/relation';
import Tooltip from '../ui/Tooltip';

export default function CharacterRelationsForm({ id }) {
  const t = useTranslations();
  const [relations, setRelations] = useState([]);
  const [relationsTypes, setRelationsTypes] = useState([]);
  const [characters, setCharacters] = useState([]);

  function handleUpdateRelationType(relation_id) {
    return async (value) => {
      const res = await updateRelation({
        id: relation_id,
        type_id: value,
      });
      if (res.success) {
        setRelations((prev) => (
          prev.map((prevRelation) => (
            prevRelation.relation_id === relation_id
              ? { ...prevRelation, type_id: value, type_name: relationsTypes.find((relationType) => relationType.id === value)?.name }
              : prevRelation
          ))
        ));
        toast.success(t('Admin.Character.Relations.updated'));
      }
    };
  }

  function handleUpdateRelationStartsAt(relation_id) {
    return async (value) => {
      const res = await updateRelation({
        id: relation_id,
        starts_at: value.timestamp,
      });
      if (res.success) {
        setRelations((prev) => (
          prev.map((prevRelation) => (
            prevRelation.relation_id === relation_id
              ? { ...prevRelation, starts_at: value }
              : prevRelation
          ))
        ));
        toast.success(t('Admin.Character.Relations.updated'));
      }
    }
  }

  function handleDeleteRelation(relation_id) {
    return async () => {
      const res = await deleteRelation(relation_id);
      if (res.success) {
        setRelations((prev) => prev.filter((relation) => relation.relation_id !== relation_id));
        toast.success(t('Admin.Character.Relations.deleted'));
      }
    }
  }
  
  function handleCopyRelation(relation_id) {
    return async () => {
      const res = await copyRelation(relation_id);
      if (res.success) {
        toast.success(t('Admin.Character.Relations.copied'));
      } else {
        toast.error(res.error);
      }
    }
  }

  async function handleAddRelation(recipient_id) {
    const res = await createRelation({
      recipient_id,
      character_id: id,
    });
    if (res.success) {
      const characterRes = await getCharacter(recipient_id);
      if (characterRes.success) {
        setRelations((prev) => (
          [
            ...prev,
            {
              relation_id: res.data.id,
              recipient_id: recipient_id,
              character_id: id,
              avatar_url: characterRes.data.avatar_url,
              birthdate: characterRes.data.birthdate,
              firstname: characterRes.data.firstname,
              gender: characterRes.data.gender,
              lastname: characterRes.data.lastname
            }
          ]
        ));
        toast.success(t('Admin.Character.Relations.created'));
      }
    }
  }

  useEffect(() => {
    async function fetchRelations() {
      const [res, resTypes, resCharacters] = await Promise.all([
        getRelations(id),
        getRelationTypes(),
        getCharacters(),
      ]);
      if (res.success) setRelations(res.data);
      if (resTypes.success) setRelationsTypes(resTypes.data);
      if (resCharacters.success) setCharacters(resCharacters.data);
    }

    if (id) {
      fetchRelations();
    }
  }, [id]);

  const options = useMemo(() => (
    characters
      ?.filter((character) => character.id !== id)
      ?.map((character) => ({
        label: `${character.firstname}${character.lastname ? ` ${character.lastname}` : ''}`,
        value: character.id,
      })) ?? []
  ), [id, characters]);

  const relationsTypesOptions = relationsTypes?.map((relationType) => ({
    label: `${relationType.name} ${relationType.icon}`,
    value: relationType.id,
  })) ?? [];

  const displayRelations = useMemo(() => (
    Object.values(relations?.reduce((acc, relation) => {
      const payload = {
        starts_at: relation.starts_at,
        type_id: relation.type_id,
        type_name: relation.type_name,
        relation_id: relation.relation_id,
      }
      if (acc[relation.recipient_id]) {
        acc[relation.recipient_id].relations.push(payload);
      } else {
        acc[relation.recipient_id] = {
          recipient_id: relation.recipient_id,
          avatar_url: relation.avatar_url,
          birthdate: relation.birthdate,
          firstname: relation.firstname,
          gender: relation.gender,
          lastname: relation.lastname,
          relations: [payload]
        };
      }
      return acc;
    }, {}) ?? {})
  ), [relations]);

  const recipientIds = useMemo(() => (
    relations?.map((relation) => relation.recipient_id) ?? []
  ), [relations]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {displayRelations?.map((relation) => (
        <div key={relation.recipient_id} className="p-6 bg-background/50 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Tooltip content={`${t('General.edit')} ${relation.firstname}`}>
              <Link href={`/admin/characters/${relation.recipient_id}`} className="hover:scale-105 transition-all duration-300">
                {relation.avatar_url ? (
                  <img src={relation.avatar_url} alt={relation.firstname} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-foreground to-secondary" />
                )}
              </Link>
            </Tooltip>
            <Select
              className="mb-6 border-b-2 border-secondary w-full"
              key={relation.recipient_id}
              options={options}
              value={relation.recipient_id}
              onChange={handleUpdateRelationStartsAt(relation.relation_id)}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-6 text-foreground">
            {relation.relations?.map((r) => (
              <div key={Object.values(r).join('-')} className="border-1 border-primary p-4 rounded-lg w-full relative">
                <Datepicker
                  date={r.starts_at ? new DATime(r.starts_at) : new DATime(DEFAULT_DATE)}
                  onChange={handleUpdateRelationStartsAt(r.relation_id)}
                  position="top"
                />
                <Select
                  options={relationsTypesOptions}
                  value={r.type_id}
                  className="w-full mt-4 border-2 border-secondary rounded-sm"
                  onChange={handleUpdateRelationType(r.relation_id)}
                />
                <div
                  className="absolute -top-4 -right-4 rounded-full bg-background/70 p-2 flex justify-center items-center cursor-pointer hover:bg-background hover:text-primary transition-all duration-300"
                  onClick={handleDeleteRelation(r.relation_id)}
                >
                  <TrashIcon className="w-4 h-4" />
                </div>
                <Tooltip content={t('Admin.Character.Relations.copy')}>
                  <div
                    className="absolute -top-4 -left-4 rounded-full bg-background/70 p-2 flex justify-center items-center cursor-pointer hover:bg-background hover:text-primary transition-all duration-300"
                    onClick={handleCopyRelation(r.relation_id)}
                  >
                    <CopyIcon className="w-4 h-4" />
                  </div>
                </Tooltip>
              </div>
            ))}
            <div
              className="border-1 border-primary p-4 rounded-lg flex justify-center items-center w-full cursor-pointer hover:bg-background/50 transition-colors duration-300"
              onClick={() => handleAddRelation(relation.recipient_id)}
            >
              <PlusIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
      ))}
      <div
        className="flex flex-col justify-center items-center bg-background/50 rounded-lg cursor-pointer hover:bg-background/70 transition-colors duration-300 min-h-100"
      >
        <PlusIcon className="w-8 h-8" />
        <Select
          className="w-56 mb-6 border-b-2 border-secondary"
          options={options.filter((option) => !recipientIds.includes(option.value))}
          onChange={handleAddRelation}
          placeholder={t('Admin.Character.Relations.addRelation')}
        />
      </div>
    </div>
  );
}
