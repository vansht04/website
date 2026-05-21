import {Canvas, useFrame} from '@react-three/fiber';
import {useMemo, useRef, Suspense} from 'react';
import * as THREE from 'three';
import {MeshTransmissionMaterial, Float, Environment} from '@react-three/drei';
import {cn} from '@/src/lib/utils';

function Crystal({ isDark }: { isDark: boolean }) {
  const mesh = useRef<THREE.Group>(null!);
  const innerMesh = useRef<THREE.Mesh>(null!);
  const outerMesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
    
    if (mesh.current) {
      // Smooth, elegant rotation
      mesh.current.rotation.x = t * 0.1 + scroll * 1.5;
      mesh.current.rotation.y = t * 0.15 + scroll * 1.2;
      mesh.current.position.y = -scroll * 8;
      // Gentle horizontal swaying for a fluid feel
      mesh.current.position.x = Math.sin(t * 0.4) * 1.5;
    }

    if (innerMesh.current && outerMesh.current) {
      // Counter-rotation for the inner core to create complex refractions
      innerMesh.current.rotation.y = -t * 0.3;
      innerMesh.current.rotation.z = t * 0.2;
    }
  });

  const glassProps = {
    backside: true,
    samples: 8, // Balanced sample count for peak frame rate and sharp detail
    resolution: 512, // Smart buffer resolution for speed
    thickness: isDark ? 4 : 6,
    roughness: 0,
    chromaticAberration: 0.15,
    anisotropy: 0.6,
    distortion: 0.3,
    distortionScale: 0.5,
    temporalDistortion: 0.4,
    ior: 1.8, // Premium glass index of refraction
    transmission: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    attenuationDistance: 2.5,
    attenuationColor: "#ffffff",
    color: "#ffffff",
  };

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <group ref={mesh}>
        {/* Outer Complex Shell */}
        <mesh ref={outerMesh}>
          <torusKnotGeometry args={[3.2, 0.9, 128, 24, 7, 3]} />
          <MeshTransmissionMaterial {...glassProps} transparent opacity={isDark ? 0.32 : 0.42} />
        </mesh>
        
        {/* Inner Refractive Core - Complex multi-dimensional reflection */}
        <mesh ref={innerMesh}>
          <octahedronGeometry args={[2, 0]} />
          <MeshTransmissionMaterial 
            {...glassProps} 
            resolution={256} // Lower resolution for inner core keeps performance smooth
            samples={4}
            thickness={2} 
            ior={2.4} // Higher diamond-like refraction for the inner core
            chromaticAberration={0.3}
            transparent 
            opacity={isDark ? 0.4 : 0.5} 
          />
        </mesh>
      </group>
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
      <Canvas 
        camera={{ position: [0, 0, 22], fov: 35 }} 
        dpr={[1, 1.5]} // Balance pixel density to ensure high-DPI screens do not experience lag
        gl={{ antialias: true, powerPreference: "high-performance" }} // Direct GPU optimization bias
      >
        <color attach="background" args={[isDark ? '#000000' : '#FBFBFB']} />
        
        {/* Balanced lighting to ensure glass is defined against white */}
        <ambientLight intensity={isDark ? 0.3 : 0.5} />
        
        {/* High-fidelity lighting setup for strong reflection highlights */}
        <pointLight position={[10, 10, 10]} intensity={isDark ? 3 : 8} />
        <pointLight position={[-10, -10, 5]} intensity={isDark ? 1.5 : 4} color={isDark ? "#0071E3" : "#003A75"} />
        <pointLight position={[0, -15, 0]} intensity={isDark ? 0.5 : 1} color="#ffffff" />
        
        {/* Suspense is key to guarantee the page loaded state interactive immediately */}
        <Suspense fallback={null}>
          {/* Environment preset provides the premium reflections that define the 3D glass */}
          <Environment preset="studio" />
          <Crystal isDark={isDark} />
          <Particles isDark={isDark} />
        </Suspense>
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
