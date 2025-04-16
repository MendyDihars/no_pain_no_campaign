'use client';

import Link from 'next/link';
import { getFullname, getInitials } from '@root/lib/decorators/character.helper';
import {
  Handle,
} from '@xyflow/react';
import { useStoredDate } from '@root/contexts/StoredDateContext';
import Tooltip from '../ui/Tooltip';
import DATime from '@root/lib/da-time';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import colors from '@root/lib/colors';

export function BackgroundCircleNode({ data: { radius } }) {
  return (
    <svg
      width={radius * 2}
      height={radius * 2}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius}
        fill="none"
        stroke={colors.primary}
        strokeWidth="4"
      />
    </svg>
  );
}

export function CharacterNode({ data: { character, type } }) {
  const { date } = useStoredDate();
  const t = useTranslations();

  const age = useMemo(() => {
    if (!character?.birthdate) return '??';
    const age = DATime.getAge(character?.birthdate, date);
    if (age < 0) return t('Nodes.notBorn');
    if (age === 0) return t('Nodes.baby');
    if (age === 1) return t('Nodes.oneYearOld');
    return t('Nodes.age', { age });
  }, [character?.birthdate, date]);

  return (
    <Tooltip content={(
      <div className="text-lg">
        {age}
      </div>
    )}>
      <Link href={`/links/${character?.id}`} className="relative">
        <div className="absolute top-[-20px] left-[-20px] text-white text-xs w-[100px]">
          <div className="text-center">
            {getFullname(character)}
          </div>
        </div>
        <div
          className="w-15 h-15 hover:scale-110 transition-all duration-300 bg-white rounded-full nodrag text-black flex items-center justify-center text-2xl font-bold relative"
        >
          {getInitials(character)}
          <Handle
            type={type}
            position="top"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'transparent', border: 'none' }}
            isConnectable={false}
          />
        </div>
      </Link>
    </Tooltip>
  );
}

export const nodeTypes = {
  character: CharacterNode,
  circle: BackgroundCircleNode,
};
