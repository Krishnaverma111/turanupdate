import { useEffect, useState, useRef } from 'react';

// Defines the properties for each segment in the trail
interface TrailNode {
  x: number;
  y: number;
  id: number;
}

const TRAIL_LENGTH = 20; // Increase this number for a longer trail

export function CursorTrail() {
  const mousePos = useRef({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailNode[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameId = useRef<number>();

  // 1. Initialize the trail array with starting points
  useEffect(() => {
    const initialTrail = Array.from({ length: TRAIL_LENGTH }).map((_, i) => ({
      x: window.innerWidth / 2, // Start in the middle of the screen
      y: window.innerHeight / 2,
      id: i,
    }));
    setTrail(initialTrail);
  }, []);

  // 2. Track real-time mouse movement
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, .group, input'));
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  // 3. The Animation Loop (Core logic for the "Chain" effect)
  useEffect(() => {
    const animateTrail = () => {
      setTrail((prevTrail) => {
        if (prevTrail.length === 0) return prevTrail;

        const nextTrail = [...prevTrail];
        
        // --- Petal Chain Physics ---
        // stiffness: How fast the dot moves (Lower = lazier, more organic)
        const stiffness = isHovering ? 0.08 : 0.05; 
        
        for (let i = 0; i < nextTrail.length; i++) {
          const petal = nextTrail[i];
          const leader = i === 0 ? mousePos.current : nextTrail[i - 1];

          // Calculate distance to the "leader" (either mouse or previous petal)
          const dx = leader.x - petal.x;
          const dy = leader.y - petal.y;

          // Move the petal smoothly using a spring algorithm
          petal.x += dx * stiffness;
          petal.y += dy * stiffness;
        }
        return nextTrail;
      });

      // Request next frame
      animationFrameId.current = requestAnimationFrame(animateTrail);
    };

    animationFrameId.current = requestAnimationFrame(animateTrail);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isHovering]); // Restart loop when hover state changes

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trail.map((petal, index) => {
        // --- Calculate "Flowering" Properties based on index ---
        const totalPetals = trail.length;
        const indexRatio = index / totalPetals; // 0 at head, 1 at tail

        // 1. Petals get smaller toward the tail
        const maxScale = 1;
        const minScale = 0.2;
        const scale = maxScale - (maxScale - minScale) * indexRatio;

        // 2. Head petals are vibrant gold, tail petals fade into transparent neon
        const headOpacity = 0.8;
        const tailOpacity = 0.1;
        const opacity = headOpacity - (headOpacity - tailOpacity) * indexRatio;

        // 3. Size on Hover
        const hoverSizeMultiplier = isHovering ? 1.5 : 1;
        const baseSize = 8; // Small dot
        const finalSize = baseSize * scale * hoverSizeMultiplier;

        // 4. Smooth Z-Index (Head is on top)
        const zIndex = totalPetals - index;

        return (
          <div 
            key={petal.id}
            className={`absolute rounded-full transition-shadow duration-300 ${
              isHovering ? 'bg-[#d4af37]/20 border border-[#d4af37]' : 'bg-[#d4af37]'
            }`}
            style={{ 
              width: `${finalSize}px`,
              height: `${finalSize}px`,
              left: `${petal.x}px`,
              top: `${petal.y}px`,
              transform: 'translate(-50%, -50%)', // Center the dot
              opacity: opacity,
              zIndex: zIndex,
              boxShadow: isHovering 
                ? '0 0 15px #d4af37' 
                : index === 0 ? '0 0 10px #d4af37' : 'none',
              // Use backdrop blur sparingly for performance
              backdropFilter: isHovering && index < 3 ? 'blur(1px)' : 'none',
            }}
          />
        );
      })}
    </div>
  );
}