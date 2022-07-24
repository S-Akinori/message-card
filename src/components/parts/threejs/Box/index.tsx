import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';

interface Props {
  position?: [x: number, y: number, z: number];
};

const getPositionX = (t: number) => {
  const x = -1*(t - 1)**2 + 1;
  return x;
}
const getPositionZ = (t: number) => {
  const z = 2*t - 2;
  return z;
}

const Box = (props: Props) => {
  const ref = useRef<Mesh>(null!);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.01;
    const time = state.clock.getElapsedTime();
    if(time < 2) {
      const posX = getPositionX(time)
      const posZ = getPositionZ(time)
      ref.current.position.x = posX;
      ref.current.position.z = posZ;
    }
  });

  return (
    <mesh
      ref={ref}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxBufferGeometry args={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]} />
      <meshLambertMaterial color={isHovered ? 0x44c2b5 : 0x9178e6} />
    </mesh>
  );
};

export default Box;