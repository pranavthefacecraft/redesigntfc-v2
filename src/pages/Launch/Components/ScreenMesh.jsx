import { memo, use, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import screenvert from './Shaders/Screen/screenvert.glsl'
import screenfrag from './Shaders/Screen/screenfrag.glsl'


const ScreenMesh = ({ renderTargetTexture }) => {


  const screenMesh = useRef();
  const { size, viewport } = useThree(); 


  const screenUniforms = {
    uTime: new THREE.Uniform(0.0),
    uResolution: new THREE.Uniform(new THREE.Vector2(0,0)),
    uTexture: new THREE.Uniform(null),
  };


  useFrame((state) => {
    const { clock, size } = state;

    // Update screen uniforms
    screenMesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
    screenMesh.current.material.uniforms.uResolution.value = new THREE.Vector2(size.width * viewport.dpr, size.height * viewport.dpr);
    screenMesh.current.material.uniforms.uTexture.value = renderTargetTexture;
  });


  return (
    <>
    <mesh ref={screenMesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={screenfrag}
        vertexShader={screenvert}
        uniforms={screenUniforms}
      />
    </mesh>
    </>
  );
};

export default ScreenMesh;
    
