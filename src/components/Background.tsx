import {Canvas, useFrame} from '@react-three/fiber';
import {useMemo, useRef} from 'react';
import * as THREE from 'three';
import {MeshTransmissionMaterial, Float, Environment} from '@react-three/drei';
import {cn} from '@/src/lib/utils';

function Crystal({ isDark }: { isDark: boolean }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame(() => {
    const t = performance.now() / 1000;
    const scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
    
    if (mesh.current) {
      // Elegant, slightly unpredictable movement
      mesh.current.rotation.x = t * 0.12 + scroll * 1.5;
      mesh.current.rotation.y = t * 0.18 + scroll * 1;
      mesh.current.position.y = -scroll * 8;
      // Gentle horizontal swaying
      mesh.current.position.x = Math.sin(t * 0.3) * 1.8;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={mesh} position={[0, 0, 0]}>
        {/* A more intricate, star-like knot for a unique look */}
        <torusKnotGeometry args={[3.2, 1.1, 256, 32, 5, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={isDark ? 5 : 8} // Slightly thicker in light mode for more refraction depth
          roughness={0}
          chromaticAberration={0.15}
          anisotropy={0.6}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.4}
          ior={1.7} // High index for sharp glass look
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0}
          attenuationDistance={2.5}
          attenuationColor="#ffffff" // Clean white attenuation for both
          color="#ffffff"
          transparent
          opacity={isDark ? 0.35 : 0.45} // Slightly more opaque in light mode to define edges
        />
      </mesh>
    </Float>
  );
}

function Particles({ isDark }: { isDark: boolean }) {
  const count = 400;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 55;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 55;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={isDark ? "#ffffff" : "#000000"}
        transparent
        opacity={isDark ? 0.12 : 0.15}
        sizeAttenuation
      />
    </points>
  );
}

export default function Background({ isDark = true }: { isDark?: boolean }) {
  return (
    <div className={cn(
      "fixed inset-0 -z-10 transition-colors duration-1000",
      isDark ? "bg-[#000000]" : "bg-[#FBFBFB]"
    )}>
      {/* Noise Overlay for that cinematic texture */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.02]" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      
      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 22], fov: 35 }} dpr={[1, 2]}>
        <color attach="background" args={[isDark ? '#000000' : '#FBFBFB']} />
        
        {/* Balanced lighting to ensure glass is defined against white */}
        <ambientLight intensity={isDark ? 0.3 : 0.5} />
        
        {/* Aggressive sharp highlights for the "mirror" look */}
        <pointLight position={[10, 10, 10]} intensity={isDark ? 3 : 8} />
        <pointLight position={[-10, -10, 5]} intensity={isDark ? 1.5 : 4} color={isDark ? "#0071E3" : "#003A75"} />
        <pointLight position={[0, -15, 0]} intensity={isDark ? 0.5 : 1} color="#ffffff" />
        
        {/* Environment preset provides the reflections that define the glass */}
        <Environment preset="studio" />
        
        <Crystal isDark={isDark} />
        <Particles isDark={isDark} />
      </Canvas>

      {/* Subtle Aesthetic Gradient Overlay */}
      <div className={cn(
        "absolute inset-0 z-0 transition-opacity duration-1000",
        isDark 
          ? "bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent)]" 
          : "bg-[radial-gradient(circle_at_50%_0%,rgba(0,113,227,0.05),transparent)]"
      )} />
    </div>
  );
}
