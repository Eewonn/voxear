export function GridBackground() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      <div 
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-[0.4]"
        style={{
          backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)'
        }}
      />
    </div>
  )
}