import * as THREE from 'three'
import { memo, useRef } from "react";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { useGLTF, Instances, Instance } from '@react-three/drei';

import { shader } from './Material';



const Cubes = () => {
  const { gl } = useThree();
  const cuberef = useRef()
  const { nodes, materials } = useGLTF('/About/Models/Cubie.glb')

  useFrame(() => {
    // if (gl) console.log("Draw calls:", gl.info.render.calls);
  })

  return (
    <>
    <Instances ref={cuberef} range={27} limit={27} material={shader} geometry={nodes.CenteredCube.geometry} castShadow receiveShadow scale={0.5} position={[0,0.25,0]}>

      
      <Instance position={[0, 0.514, 0]}/>
      <Instance position={[0, 4.614, 0]}/>
      <Instance position={[-4.1, 4.614, 0]}/>
      <Instance position={[-4.1, 0.514, 0]}/>
      <Instance position={[0, 0.514, -4.1]}/>
      <Instance position={[0, 4.614, -4.1]}/>
      <Instance position={[-4.1, 4.614, -4.1]}/>
      <Instance position={[-4.1, 0.514, -4.1]}/>

      <Instance position={[0, 0.514, -2.05]}/>
      <Instance position={[-2.05, 0.514, 0]}/>
      <Instance position={[-2.05, 0.514, -2.05]}/>
      <Instance position={[-2.05, 0.514, -4.1]}/>
      <Instance position={[-4.1, 0.514, -2.05]}/>
      <Instance position={[-2.05, 2.564, -2.05]}/>
      <Instance position={[0, 4.614, -2.05]}/>
      <Instance position={[-2.05, 4.614, 0]}/>
      <Instance position={[-4.1, 4.614, -2.05]}/>
      <Instance position={[-2.05, 4.614, -4.1]}/>
      <Instance position={[0, 2.564, 0]}/>
      <Instance position={[0, 2.564, -4.1]}/>
      <Instance position={[-4.1, 2.564, 0]}/>
      <Instance position={[-4.1, 2.564, -4.1]}/>

      <Instance position={[0, 2.564, -2.05]}/>
      <Instance position={[-2.05, 2.564, 0]}/>
      <Instance position={[-2.05, 2.564, -4.1]}/>
      <Instance position={[-4.1, 2.564, -2.05]}/>
      <Instance position={[-2.05, 4.614, -2.05]}/>

    </Instances>
    </>
  );
};

useGLTF.preload('About/Models/Cubie.glb')


export default memo(Cubes)