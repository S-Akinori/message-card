import React,  { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas, useFrame, Vector3 } from '@react-three/fiber'
import * as Drei from "@react-three/drei";

const BackgroundCircles = () => {
  const ref = useRef<THREE.Mesh>(null!)
  const [scale, setScale] = useState(0)
  useFrame((state, delta) => {
    
  })
  return (
    <mesh
      ref={ref}
      scale={scale}
    >
      <Drei.Circle args={[1,32]} position={[1,0,0]} />
      <Drei.Circle args={[1,32]} position={[-1,2,0]} />
      <Drei.Circle args={[1,32]} position={[-1,-2,0]} />
    </mesh>
  )
}

export default BackgroundCircles