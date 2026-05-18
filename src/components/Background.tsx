import {Canvas, useFrame, useThree} from '@react-three/fiber';
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
      mesh.current.rotation.x = t * 0.1 + scroll * 1.5;
      mesh.current.rotation.y = t * 0.15 + scroll * 1;
      mesh.current.position.y = -scroll * 8;
      mesh.current.position.x = Math.sin(t * 0.2) * 1.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <torusKnotGeometry args={[3.5, 0.8, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={2}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.3}
          distortionScale={0.3}
          temporalDistortion={0.5}
          clearcoat={0.8}
          attenuationDistance={1}
          attenuationColor={isDark ? "#ffffff" : "#000000"}
          color={isDark ? "#ffffff" : "#ffffff"}
          transparent
          opacity={isDark ? 0.4 : 0.2}
        />
      </mesh>
    </Float>
  );
}

function Particles({ isDark }: { isDark: boolean }) {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={isDark ? "#ffffff" : "#000000"}
        transparent
        opacity={0.1}
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
      {/* Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.01]" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      
      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 20], fov: 35 }} dpr={[1, 2]}>
        <color attach="background" args={[isDark ? '#000000' : '#FBFBFB']} />
        <ambientLight intensity={isDark ? 0.2 : 1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Environment preset="city" />
        <Crystal isDark={isDark} />
        <Particles isDark={isDark} />
      </Canvas>

      {/* Subtle Aesthetic Gradient */}
      <div className={cn(
        "absolute inset-0 z-0 transition-opacity duration-1000",
        isDark 
          ? "bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent)]" 
          : "bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.01),transparent)]"
      )} />
    </div>
  );
}
