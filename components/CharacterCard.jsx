export default function CharacterCard({ character }) {
  return (
    <div 
      key={character.id} 
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/90 to-primary/70 p-1 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative h-full rounded-lg bg-gradient-to-br from-primary/80 to-primary/60 p-6">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/10" />
        
        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">
              {character.firstname} {character.lastname}
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="rounded-lg bg-white/20 p-3 backdrop-blur-sm border border-white/10">
                <span className="text-sm font-semibold text-white/90">Race</span>
                <p className="text-lg font-bold text-white mt-1">{character.race}</p>
              </div>
              <div className="rounded-lg bg-white/5 p-2 backdrop-blur-sm">
                <span className="text-xs font-medium text-white/60">Genre</span>
                <p className="text-sm text-white/80">{character.gender}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="rounded-lg bg-white/20 p-3 backdrop-blur-sm border border-white/10">
                <span className="text-sm font-semibold text-white/90">Classe</span>
                <p className="text-lg font-bold text-white mt-1">{character.klass}</p>
              </div>
              <div className="rounded-lg bg-white/5 p-2 backdrop-blur-sm">
                <span className="text-xs font-medium text-white/60">Taille</span>
                <p className="text-sm text-white/80">{character.height}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-white/5 p-2 backdrop-blur-sm">
            <span className="text-xs font-medium text-white/60">Orientation</span>
            <p className="text-sm text-white/80">{character.sexual_orientation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
