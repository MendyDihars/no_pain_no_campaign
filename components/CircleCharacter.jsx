export default function CircleCharacter({ name }) {
  return (
    <div>
      <div
        className="relative group overflow-hidden h-40 w-40 rounded-full text-background cursor-pointer"
      >
        <div
          className="absolute top-0 bottom-0 left-0 right-0 rounded-full group-hover:scale-105 transition-all duration-300 z-0"
          style={{
            backgroundImage: `url(https://i.postimg.cc/Kc9D53yz/orana.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      <div className="text-center text-foreground cursor-pointer z-20">
        {name}
      </div>
    </div>
  );
}
