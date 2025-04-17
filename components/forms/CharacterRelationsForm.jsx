'use client';

import { useState } from 'react';
import Select from '@root/components/ui/Select';
import Datepicker from '@root/components/Calendar/Datepicker';
import DATime from '@root/lib/da-time';

export default function CharacterRelationsForm({ relations, options, relationsTypesOptions }) {
  return (
    <div className="flex flex-col gap-6">
      {relations?.map((relation) => (
        <div key={relation.id}>
          <Select
            className="w-56 mb-6 border-b-2 border-secondary"
            key={relation.id}
            options={options}
            value={relation.recipient_id}
          />
          <div className="flex flex-wrap gap-6 text-foreground">
            {relation.relations.map((r) => (
              <div key={Object.values(r).join('-')}>
                <Datepicker date={new DATime(r.starts_at)} position="top" />
                <Select
                  options={relationsTypesOptions}
                  value={r.type_id}
                  className="w-full mt-4 border-b-2 border-secondary"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
