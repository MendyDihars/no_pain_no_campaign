'use client';

import colors from "@root/lib/colors";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function CircleCharacter({
  name,
  id,
  prefixTo,
  avatar_url,
  onClick,
  isNew = false,
}) {
  function handleClick() {
    onClick(id);
  }

  const Comp = onClick ? 'button' : Link;
  const props = onClick 
    ? { onClick: handleClick } : { href: `${prefixTo ?? '/links'}/${id}` };

  return (
    <Comp {...props}>
      <div
        className="relative group overflow-hidden h-40 w-40 rounded-full text-background cursor-pointer"
      >
        {isNew ? (
          <div className="bg-foreground h-full w-full flex items-center justify-center">
            <PlusIcon className="w-20 h-20 text-primary group-hover:scale-125 transition-all duration-300" />
          </div>
        ) : (
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 rounded-full group-hover:scale-105 transition-all duration-300 z-0 ${!avatar_url ? 'bg-gradient-to-br from-foreground to-secondary' : ''}`}
          style={avatar_url ? {
            backgroundImage: `url(${avatar_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : {}}
        />
        )}
      </div>
      <div className="text-center text-foreground cursor-pointer z-20">
        {name}
      </div>
    </Comp>
  );
}
