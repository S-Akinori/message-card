import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';

interface Props {
  position?: [x: number, y: number, z: number];
};

const Sphere = (props: Props) => {
  const ref = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={ref}
    >
      <sphereBufferGeometry
        args={[1, 32, 32]} 
      />
      <meshLambertMaterial color={ 0x9178e6} />
    </mesh>
  );
};

export default Sphere;