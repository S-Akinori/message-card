/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useSpring, animated } from '@react-spring/three'
import { config } from 'process'

type ActionName = 'RotateZ' | 'Open'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[];
}

export default function Cube({ ...props }: JSX.IntrinsicElements['group']) {
  const [active, setActive] = useState(false);
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF('/models/cube.glb') as GLTFResult
  const { actions } = useAnimations(animations, group);
  
  const onClick = () => {
    setActive(true);
    const openAction = actions.Open!;
    openAction.clampWhenFinished = true;
    openAction.setLoop(THREE.LoopOnce, 0);
    openAction.play();
  }
  const { scale, positionY } = useSpring({
    scale: active ? 0.75 : 1,
    positionY: active ? -3: 0,
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <animated.mesh position-y={positionY} scale={scale} onClick={onClick} name="Cube" castShadow receiveShadow geometry={nodes.Cube.geometry} material={materials.Material} morphTargetDictionary={nodes.Cube.morphTargetDictionary} morphTargetInfluences={nodes.Cube.morphTargetInfluences} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/cube.glb')
