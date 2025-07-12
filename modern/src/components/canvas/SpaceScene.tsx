'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stars, 
  Text, 
  Float,
  Html,
  useTexture,
  Sphere,
  Box
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { useCanvasConfig } from '@/hooks/useResponsiveCanvas';

// Satellite component - replaces Box2D satellite from legacy
const Satellite = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setInteracting } = useAppStore();

  useFrame((state) => {
    if (meshRef.current) {
      // Orbital animation - replaces legacy Box2D physics
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      meshRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => {
          setHovered(true);
          setInteracting(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          setInteracting(false);
        }}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hovered ? '#4f46e5' : '#6366f1'} 
          emissive={hovered ? '#1e1b4b' : '#000000'}
        />
        
        {/* Solar panels */}
        <mesh position={[1.2, 0, 0]}>
          <boxGeometry args={[0.1, 2, 1]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[-1.2, 0, 0]}>
          <boxGeometry args={[0.1, 2, 1]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </mesh>
    </Float>
  );
};

// Floating work portfolio signs - replaces legacy floating signs
const WorkSign = ({ 
  position, 
  text, 
  onClick 
}: { 
  position: [number, number, number];
  text: string;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <planeGeometry args={[3, 1]} />
        <meshStandardMaterial 
          color={hovered ? '#10b981' : '#059669'}
          transparent
          opacity={0.8}
        />
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </mesh>
    </Float>
  );
};

// Cloud component - replaces jQuery cloud animations
const Cloud = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow drift animation
      meshRef.current.position.x += 0.005;
      if (meshRef.current.position.x > 10) {
        meshRef.current.position.x = -10;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[2, 8, 6]} />
      <meshStandardMaterial 
        color="#f3f4f6" 
        transparent 
        opacity={0.6}
      />
    </mesh>
  );
};

// Main space scene component
const SpaceSceneContent = () => {
  const { setCurrentScene } = useAppStore();
  const { camera } = useThree();

  // Set up camera position
  React.useEffect(() => {
    camera.position.set(0, 0, 10);
  }, [camera]);

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />

      {/* Background stars - replaces static background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
      />

      {/* Main satellite */}
      <Satellite position={[0, 0, 0]} />

      {/* Floating clouds */}
      <Cloud position={[-8, 3, -5]} />
      <Cloud position={[6, -2, -8]} />
      <Cloud position={[-4, -4, -6]} />

      {/* Work portfolio signs */}
      <WorkSign
        position={[4, 2, -2]}
        text="Work Portfolio"
        onClick={() => setCurrentScene('work')}
      />
      
      <WorkSign
        position={[-4, -1, -3]}
        text="Music & Audio"
        onClick={() => setCurrentScene('music')}
      />

      {/* Interactive controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Loading component
const CanvasLoader = () => (
  <Html center>
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-white">Loading Space Scene...</span>
    </div>
  </Html>
);

// Main SpaceScene component
export const SpaceScene: React.FC = () => {
  const canvasConfig = useCanvasConfig();
  const { isLoading } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <Canvas
        camera={{
          fov: canvasConfig.fov,
          near: canvasConfig.near,
          far: canvasConfig.far,
          position: [0, 0, 10]
        }}
        shadows={canvasConfig.shadows}
        gl={{
          antialias: canvasConfig.antialias,
          powerPreference: canvasConfig.powerPreference as WebGLPowerPreference,
          pixelRatio: canvasConfig.pixelRatio
        }}
        className="bg-gradient-to-b from-slate-900 to-slate-800"
      >
        <Suspense fallback={<CanvasLoader />}>
          <SpaceSceneContent />
        </Suspense>
      </Canvas>
    </motion.div>
  );
};
