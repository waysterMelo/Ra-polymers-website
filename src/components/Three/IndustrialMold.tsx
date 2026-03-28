import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

// Generates a subtle procedural noise texture to simulate an EDM (Electrical Discharge Machining) finish
const createEDMTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (context) {
    const imageData = context.createImageData(512, 512);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const val = Math.random() * 255;
      imageData.data[i] = val;
      imageData.data[i + 1] = val;
      imageData.data[i + 2] = val;
      imageData.data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
};

interface IndustrialMoldProps {
  progress: number;
}

export const IndustrialMold: React.FC<IndustrialMoldProps> = ({ progress }) => {
  const leftHalf = useRef<THREE.Group>(null);
  const rightHalf = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const logoRef = useRef<THREE.Group>(null);

  const easeInOutExpo = (x: number): number => {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
  };

  useFrame((state) => {
    const easedProgress = easeInOutExpo(progress);
    
    if (leftHalf.current && rightHalf.current) {
      const offset = (1 - easedProgress) * 5;
      leftHalf.current.position.x = -offset;
      rightHalf.current.position.x = offset;

      if (glowRef.current) {
        const pulse = Math.sin(state.clock.elapsedTime * 15) * 0.2 + 0.8;
        glowRef.current.intensity = progress > 0.8 ? (progress - 0.8) * 100 * pulse : 0;
      }

      if (logoRef.current) {
        logoRef.current.scale.setScalar(progress > 0.9 ? (progress - 0.9) * 10 : 0);
        logoRef.current.position.z = 1.2;
      }
    }
  });

  const edmTexture = useMemo(() => createEDMTexture(), []);
  
  const baseMaterial = <meshPhysicalMaterial color="#94a3b8" metalness={0.85} roughness={0.3} clearcoat={0.1} />;
  const blockMaterial = <meshPhysicalMaterial color="#cbd5e1" metalness={0.95} roughness={0.2} clearcoat={0.3} />;
  const pinMaterial = <meshPhysicalMaterial color="#f8fafc" metalness={1.0} roughness={0.05} clearcoat={0.8} />;
  const darkMetalMaterial = <meshPhysicalMaterial color="#334155" metalness={0.9} roughness={0.5} />;
  
  const cavityMaterial = (
    <meshPhysicalMaterial 
      color="#0f172a" 
      metalness={0.9} 
      roughness={0.3} 
      roughnessMap={edmTexture}
      bumpMap={edmTexture}
      bumpScale={0.002}
      clearcoat={0.8}
      clearcoatRoughness={0.2}
      envMapIntensity={2.5}
    />
  );
  
  const ejectorPlateMaterial = <meshPhysicalMaterial color="#64748b" metalness={0.7} roughness={0.4} />;

  return (
    <group>
      <group ref={leftHalf} position={[-5, 0, 0]}>
        <mesh position={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[1, 7.5, 5.5]} />
          {baseMaterial}
        </mesh>
        {[[-3.2, 2.2], [-3.2, -2.2], [3.2, 2.2], [3.2, -2.2]].map(([y, z], i) => (
          <mesh key={`bolt-l-${i}`} position={[-1.01, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}
        <mesh castShadow>
          <boxGeometry args={[4, 6, 4]} />
          {blockMaterial}
        </mesh>
        {[[-1.8, 0], [1.8, 0]].map(([y, z], i) => (
          <mesh key={`groove-l-${i}`} position={[2, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.1, 4.05, 0.1]} />
            {darkMetalMaterial}
          </mesh>
        ))}
        <mesh position={[-0.8, 0, 0]} castShadow>
          <boxGeometry args={[0.4, 6.5, 4.5]} />
          {ejectorPlateMaterial}
        </mesh>
        <mesh position={[-1.2, 0, 0]} castShadow>
          <boxGeometry args={[0.4, 6.5, 4.5]} />
          {ejectorPlateMaterial}
        </mesh>
        {[[-2.5, 1.5], [-2.5, -1.5], [2.5, 1.5], [2.5, -1.5]].map(([y, z], i) => (
          <mesh key={`return-pin-${i}`} position={[-1, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
            {pinMaterial}
          </mesh>
        ))}
        {[[-2.8, 1.5], [-2.8, -1.5], [2.8, 1.5], [2.8, -1.5]].map(([y, z], i) => (
          <mesh key={`cool-l-${i}`} position={[0, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 4.05, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}
        {[[-2.2, 1.4], [-2.2, -1.4], [2.2, 1.4], [2.2, -1.4]].map(([y, z], i) => (
          <mesh key={`guide-${i}`} position={[2, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 1.5, 32]} />
            {pinMaterial}
          </mesh>
        ))}
        {[[-2, 2], [2, 2], [-2, -2], [2, -2]].map(([y, z], i) => (
          <mesh key={`interlock-m-${i}`} position={[2.1, y, z]}>
            <boxGeometry args={[0.2, 0.6, 0.6]} />
            {darkMetalMaterial}
          </mesh>
        ))}
        {[[-0.9, 0.9], [-0.9, -0.9], [0.9, 0.9], [0.9, -0.9], [0, 1.2], [0, -1.2], [1.2, 0], [-1.2, 0]].map(([y, z], i) => (
          <mesh key={`ejector-${i}`} position={[1.5, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 5, 16]} />
            {pinMaterial}
          </mesh>
        ))}
      </group>

      <group ref={rightHalf} position={[5, 0, 0]}>
        <mesh position={[0.5, 0, 0]} castShadow>
          <boxGeometry args={[1, 7.5, 5.5]} />
          {baseMaterial}
        </mesh>
        {[[-3.2, 2.2], [-3.2, -2.2], [3.2, 2.2], [3.2, -2.2]].map(([y, z], i) => (
          <mesh key={`bolt-r-${i}`} position={[1.01, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}
        <mesh castShadow>
          <boxGeometry args={[4, 6, 4]} />
          {blockMaterial}
        </mesh>
        {[[-1.8, 0], [1.8, 0]].map(([y, z], i) => (
          <mesh key={`groove-r-${i}`} position={[-2, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.1, 4.05, 0.1]} />
            {darkMetalMaterial}
          </mesh>
        ))}
        {[[-2.8, 1.5], [-2.8, -1.5], [2.8, 1.5], [2.8, -1.5]].map(([y, z], i) => (
          <mesh key={`cool-r-${i}`} position={[0, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 4.05, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}
        {[[-2.2, 1.4], [-2.2, -1.4], [2.2, 1.4], [2.2, -1.4]].map(([y, z], i) => (
          <group key={`bushing-${i}`} position={[-2, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <mesh>
              <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
              {darkMetalMaterial}
            </mesh>
            <mesh position={[0, 0.01, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.06, 32]} />
              {cavityMaterial}
            </mesh>
          </group>
        ))}
        {[[-2, 2], [2, 2], [-2, -2], [2, -2]].map(([y, z], i) => (
          <mesh key={`interlock-f-${i}`} position={[-2.05, y, z]}>
            <boxGeometry args={[0.1, 0.62, 0.62]} />
            {cavityMaterial}
          </mesh>
        ))}
      </group>

      <group ref={logoRef} scale={0}>
        <Text
          fontSize={1.2}
          color="#0066ff"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf"
          anchorX="center"
          anchorY="middle"
        >
          RA
        </Text>
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial color="#0066ff" transparent opacity={0.1} />
        </mesh>
      </group>

      <pointLight ref={glowRef} position={[0, 0, 1.5]} color="#0066ff" intensity={0} distance={10} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, -2]} scale={1.5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#0066ff"
            speed={2}
            distort={0.3}
            radius={1}
            opacity={0.1}
            transparent
          />
        </mesh>
      </Float>
    </group>
  );
};
