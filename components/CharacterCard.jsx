import { roxborough } from '@root/lib/fonts';
import Link from 'next/link';

export default function CharacterCard({ character, className, imgUrl }) {
  return (
    <div className={`relative group overflow-hidden h-140 py-6 my-4 ${className}`}>
      <Link
      href={`/links/${character.id}`}
      className={`${roxborough.className} relative cursor-pointer flex w-full h-full items-end justify-center text-foreground text-4xl z-10`}
    >
      <span className="w-1/2 text-center">
        {character.firstname} {character.lastname}
      </span>
    </Link>
    <div
      className="absolute top-0 bottom-0 left-0 right-0 group-hover:scale-105 transition-all duration-300 z-0"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
   </div>
  );
}
