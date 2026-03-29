import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

// Textura EDM reduzida de 512×512 para 128×128
// Reduz de 262.144 para 16.384 iterações no main thread (~94% menos)
const createEDMTexture = () => {
  const SIZE = 128;
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const context = canvas.getContext('2d');
  if (context) {
    const imageData = context.createImageData(SIZE, SIZE);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const val = Math.random() * 255;
      imageData.data[i]     = val;
      imageData.data[i + 1] = val;
      imageData.data[i + 2] = val;
      imageData.data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4); // Reduzido de 8 para 4 — menos tiles, mesma percepção visual
  return texture;
};

interface IndustrialMoldProps {
  progress: number;
}

export const IndustrialMold: React.FC<IndustrialMoldProps> = ({ progress }) => {
  const leftHalf  = useRef<THREE.Group>(null);
  const rightHalf = useRef<THREE.Group>(null);
  const glowRef   = useRef<THREE.PointLight>(null);
  const logoRef   = useRef<THREE.Group>(null);

  const easeInOutExpo = (x: number): number => {
    return x === 0 ? 0
      : x === 1   ? 1
      : x < 0.5   ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
  };

  useFrame((state) => {
    const easedProgress = easeInOutExpo(progress);

    if (leftHalf.current && rightHalf.current) {
      const offset = (1 - easedProgress) * 5;
      leftHalf.current.position.x  = -offset;
      rightHalf.current.position.x =  offset;

      if (glowRef.current) {
        const pulse = Math.sin(state.clock.elapsedTime * 15) * 0.2 + 0.8;
        glowRef.current.intensity = progress > 0.8
          ? (progress - 0.8) * 100 * pulse
          : 0;
      }

      if (logoRef.current) {
        logoRef.current.scale.setScalar(
          progress > 0.9 ? (progress - 0.9) * 10 : 0
        );
        logoRef.current.position.z = 1.2;
      }
    }
  });

  const edmTexture = useMemo(() => createEDMTexture(), []);

  // Materiais — removemos clearcoat de alguns para aliviar GPU
  const baseMaterial = (
    <meshStandardMaterial color="#4B5563" metalness={0.85} roughness={0.3} />
  );
  const blockMaterial = (
    <meshStandardMaterial color="#6B7280" metalness={0.95} roughness={0.2} />
  );
  const pinMaterial = (
    <meshStandardMaterial color="#f8fafc" metalness={1.0} roughness={0.05} />
  );
  const darkMetalMaterial = (
    <meshStandardMaterial color="#1F2937" metalness={0.9} roughness={0.5} />
  );
  const cavityMaterial = (
    <meshStandardMaterial
      color="#111827"
      metalness={0.9}
      roughness={0.3}
      roughnessMap={edmTexture}
      bumpMap={edmTexture}
      bumpScale={0.002}
      envMapIntensity={1.5}
    />
  );
  const ejectorPlateMaterial = (
    <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.4} />
  );

  return (
    <group>
      {/* Metade esquerda */}
      <group ref={leftHalf} position={[-5, 0, 0]}>
        {/* Placa de apoio — castShadow apenas nos blocos principais */}
        <mesh position={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[1, 7.5, 5.5]} />
          {baseMaterial}
        </mesh>

        {/* Parafusos — sem castShadow (pequenos, impacto mínimo visual) */}
        {([[-3.2, 2.2], [-3.2, -2.2], [3.2, 2.2], [3.2, -2.2]] as [number, number][]).map(
          ([y, z], i) => (
            <mesh key={`bolt-l-${i}`} position={[-1.01, y, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.1, 12]} />
              {darkMetalMaterial}
            </mesh>
          )
        )}

        {/* Bloco principal — castShadow */}
        <mesh castShadow>
          <boxGeometry args={[4, 6, 4]} />
          {blockMaterial}
        </mesh>

        {/* Ranhuras */}
        {([[-1.8, 0], [1.8, 0]] as [number, number][]).map(([y, z], i) => (
          <mesh key={`groove-l-${i}`} position={[2, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.1, 4.05, 0.1]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {/* Placas ejetoras */}
        <mesh position={[-0.8, 0, 0]}>
          <boxGeometry args={[0.4, 6.5, 4.5]} />
          {ejectorPlateMaterial}
        </mesh>
        <mesh position={[-1.2, 0, 0]}>
          <boxGeometry args={[0.4, 6.5, 4.5]} />
          {ejectorPlateMaterial}
        </mesh>

        {/* Pinos de retorno */}
        {([[-2.5, 1.5], [-2.5, -1.5], [2.5, 1.5], [2.5, -1.5]] as [number, number][]).map(
          ([y, z], i) => (
            <mesh key={`return-pin-${i}`} position={[-1, y, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.8, 12]} />
              {pinMaterial}
            </mesh>
          )
        )}

        {/* Canais de refrigeração */}
        {([[-2.8, 1.5], [-2.8, -1.5], [2.8, 1.5], [2.8, -1.5]] as [number, number][]).map(
          ([y, z], i) => (
            <mesh key={`cool-l-${i}`} position={[0, y, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 4.05, 12]} />
              {darkMetalMaterial}
            </mesh>
          )
        )}

        {/* Colunas-guia */}
        {([[-2.2, 1.4], [-2.2, -1.4], [2.2, 1.4], [2.2, -1.4]] as [number, number][]).map(
          ([y, z], i) => (
            <mesh key={`guide-${i}`} position={[2, y, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 1.5, 24]} />
              {pinMaterial}
            </mesh>
          )
        )}

        {/* Intertravamentos */}
        {([[-2, 2], [2, 2], [-2, -2], [2, -2]] as [number, number][]).map(([y, z], i) => (
          <mesh key={`interlock-m-${i}`} position={[2.1, y, z]}>
            <boxGeometry args={[0.2, 0.6, 0.6]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {/* Pinos ejetores */}
        {([[-0.9, 0.9], [-0.9, -0.9], [0.9, 0.9], [0.9, -0.9],
           [0, 1.2], [0, -1.2], [1.2, 0], [-1.2, 0]] as [number, number][]).map(
          ([y, z], i) => (
            <mesh key={`ejector-${i}`} position={[1.5, y, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.06, 0.06, 5, 8]} />
              {pinMaterial}
            </mesh>
          )
        )}
      </group>

      {/* Metade direita */}
      <group ref={rightHalf} position={[5, 0, 0]}>
        <mesh position={[0.5, 0, 0]} castShadow>
          <boxGeometry args={[1, 7.5, 5.5]} />
          {baseMaterial}
        </mesh>

        {([[-3.2, 2.2], [-3.2, -2.2], [3.2, 2.2], [3.2, -2.2]] as [number, number][]).map(
          ([y, z], i) => (
            <mesh key={`bolt-r-${i}`} position={[1.01, y, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.1, 12]} />
              {darkMetalMaterial}
            </mesh>
          )
        )}

        <mesh castShadow>
          <boxGeometry args={[4, 6, 4]} />
          {blockMaterial}
        </mesh>

        {([[-1.8, 0], [1.8, 0]] as [number, number][]).map(([y, z], i) => (
          <mesh key={`groove-r-${i}`} position={[-2, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.1, 4.05, 0.1]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {([[-2.8, 1.5], [-2.8, -1.5], [2.8, 1.5], [2.8, -1.5]] as [number, number][]).map(
          ([y, z], i) => (
            <mesh key={`cool-r-${i}`} position={[0, y, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 4.05, 12]} />
              {darkMetalMaterial}
            </mesh>
          )
        )}

        {/* Bucha-guia com cavidade EDM */}
        {([[-2.2, 1.4], [-2.2, -1.4], [2.2, 1.4], [2.2, -1.4]] as [number, number][]).map(
          ([y, z], i) => (
            <group key={`bushing-${i}`} position={[-2, y, z]} rotation={[0, 0, Math.PI / 2]}>
              <mesh>
                <cylinderGeometry args={[0.35, 0.35, 0.05, 24]} />
                {darkMetalMaterial}
              </mesh>
              <mesh position={[0, 0.01, 0]}>
                <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
                {cavityMaterial}
              </mesh>
            </group>
          )
        )}

        {([[-2, 2], [2, 2], [-2, -2], [2, -2]] as [number, number][]).map(([y, z], i) => (
          <mesh key={`interlock-f-${i}`} position={[-2.05, y, z]}>
            <boxGeometry args={[0.1, 0.62, 0.62]} />
            {cavityMaterial}
          </mesh>
        ))}
      </group>

      {/* Logo RA revelado ao fechar */}
      <group ref={logoRef} scale={0}>
        <Text
          fontSize={1.2}
          color="#0f4a8a"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf"
          anchorX="center"
          anchorY="middle"
        >
          RA
        </Text>
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial color="#0f4a8a" transparent opacity={0.1} />
        </mesh>
      </group>

      {/* Luz de glow azul ao fechar completamente */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 1.5]}
        color="#0f4a8a"
        intensity={0}
        distance={10}
      />
    </group>
  );
};