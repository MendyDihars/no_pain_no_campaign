'use client';

import Link from 'next/link';
import { getFullname, getInitials } from '@root/lib/decorators/character.helper';
import {
  Handle,
} from '@xyflow/react';
import { useCircular } from '@root/contexts/CircularContext';
import Tooltip from '../ui/Tooltip';
import DATime from '@root/lib/da-time';

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
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CharacterNode({ data: { character, type } }) {
  const { date } = useCircular();

  const age = character?.birthdate ? DATime.getAge(character?.birthdate, date) : '??';

  return (
    <Tooltip content={`${getFullname(character)} - ${age} ans`}>
      <Link href={`/characters/${character?.id}`} className="relative">
        <div className="absolute top-[-20px] left-[-20px] text-white text-xs w-[100px]">
          <div className="text-center">
            {getFullname(character)}
          </div>
        </div>
        <div className="w-15 h-15 hover:scale-110 transition-all duration-300 bg-white rounded-full nodrag text-black flex items-center justify-center text-2xl font-bold relative">
          {getInitials(character)}
          <Handle type={type} position="top" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'transparent', border: 'none' }} />
        </div>
      </Link>
    </Tooltip>
  );
}

export const nodeTypes = {
  character: CharacterNode,
  circle: BackgroundCircleNode,
};
