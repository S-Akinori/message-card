import React,  { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas, useFrame, Vector3 } from '@react-three/fiber'
import * as Drei from "@react-three/drei";

interface Props {
  args?: [radius?: number | undefined, segments?: number | undefined, thetaStart?: number | undefined, thetaLength?: number | undefined] | undefined
  position?: Vector3
}

const Circle = ({args = [1, 32], position, ...props}: Props) => {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={ref}
    >
      <Drei.Circle args={args} position={position} />
    </mesh>
  )
}

export default Circle