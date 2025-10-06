import * as THREE from "three";
import React, { useRef, useEffect, useMemo, memo } from "react";
import { createPortal, useThree, useFrame, extend } from "@react-three/fiber";
import { useFBO, PerspectiveCamera, useTexture } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import useStore from "../contexts/store";
import BicubicUpscaleMaterial from "../Clouds/BicubicUpscale";
import getFullscreenTriangle from "../Clouds/Utils";
import vertexShader from "../Clouds/vertex.glsl";
import fragmentShader from "../Clouds/fragment.glsl";
import { mouseTracker } from "../contexts/cloudmouse";

const noiseTexturePath = "/Launch/images/noise2.png";
const blueNoiseTexturePath = "/Launch/images/blue-noise.png";

extend({ BicubicUpscaleMaterial });

const Clouds = memo(function Clouds() {
  const { size, viewport } = useThree();

  const resolution = useMemo(() => {
    const width = size.width;
    if (width < 768) {
      return 1.8; // Lower resolution for mobile
    } else if (width < 1200) {
      return 1.5; // Medium resolution for tablets
    } else {
      return 2.0; // Higher resolution for desktops
    }
  }, [size.width]);
  
  // Refs
  const fullscreenplane = useRef();
  const portalcamera = useRef();
  const triangleMesh = useRef();
  const upscaleMaterialRef = useRef();

  // Store
  const { 
    setCloudsTexture,
    scrollOffset,
    rangevalue,
    cloudsColor,
    skyColor,
    lightColor,
     } = useStore();

  // Scene setup
  const scene = useMemo(() => new THREE.Scene(), []);
  const scenetwo = useMemo(() => new THREE.Scene(), []);
  const renderTarget = useFBO(size.width / resolution, size.height / resolution);
  const renderTargetTwo = useFBO(size.width, size.height);

  // Uniforms
  const clouduniforms = {
    uTime: new THREE.Uniform(0.0),
    uResolution: new THREE.Uniform(new THREE.Vector2()),
    uNoise: new THREE.Uniform(null),
    uBlueNoise: new THREE.Uniform(null),
    uFrame: new THREE.Uniform(0.0),
    uScrollOffset: new THREE.Uniform(0.0),
    uCloudSpeed: new THREE.Uniform(0.0),
    uCloudsColor: new THREE.Uniform(null),
    uSkyColor: new THREE.Uniform(null),
    uLightColor: new THREE.Uniform(null),
    uMouse: new THREE.Uniform(new THREE.Vector2(0.0, 0.0)),
  };

  // Texture setup
  const blueNoiseTexture = useTexture(blueNoiseTexturePath);
  blueNoiseTexture.wrapS = THREE.RepeatWrapping;
  blueNoiseTexture.wrapT = THREE.RepeatWrapping;
  blueNoiseTexture.minFilter = THREE.LinearFilter;
  blueNoiseTexture.magFilter = THREE.LinearFilter;

  const noisetexture = useTexture(noiseTexturePath);
  noisetexture.wrapS = THREE.RepeatWrapping;
  noisetexture.wrapT = THREE.RepeatWrapping;
  noisetexture.minFilter = THREE.LinearFilter;
  noisetexture.magFilter = THREE.LinearFilter;

  // Animation frame
  useFrame((state) => {
    const { gl, clock } = state;

    // Update uniforms
    fullscreenplane.current.material.uniforms.uTime.value = clock.elapsedTime;
    fullscreenplane.current.material.uniforms.uResolution.value.set(
      renderTarget.width,
      renderTarget.height
    );
    fullscreenplane.current.material.uniforms.uNoise.value = noisetexture;
    fullscreenplane.current.material.uniforms.uBlueNoise.value = blueNoiseTexture;
    // Use integer frame count for stability
    fullscreenplane.current.material.uniforms.uFrame.value = Math.floor(clock.elapsedTime * 60.0); // 60 FPS
    fullscreenplane.current.material.uniforms.uScrollOffset.value = scrollOffset;
    fullscreenplane.current.material.uniforms.uCloudSpeed.value = rangevalue;
    fullscreenplane.current.material.uniforms.uCloudsColor.value = new THREE.Color(cloudsColor);
    fullscreenplane.current.material.uniforms.uSkyColor.value = new THREE.Color(skyColor);
    fullscreenplane.current.material.uniforms.uLightColor.value = new THREE.Color(lightColor);
    fullscreenplane.current.material.uniforms.uMouse.value = mouseTracker.mouse;

    // First render pass
    gl.setRenderTarget(renderTarget);
    gl.render(scene, portalcamera.current);

    // Upscale pass
    upscaleMaterialRef.current.uniforms.uTexture.value = renderTarget.texture;
    triangleMesh.current.material = upscaleMaterialRef.current;

    // Second render pass
    gl.setRenderTarget(renderTargetTwo);
    gl.render(scenetwo, portalcamera.current);

    // Update store
    setCloudsTexture(renderTargetTwo.texture);

    // Reset render target
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(
        <>
          {createPortal(
            <>
              <PerspectiveCamera
                ref={portalcamera}
                manual
                position={[0, 0, 1]}
              />
              <mesh
                ref={fullscreenplane}
                scale={[viewport.width, viewport.height, 1]}
              >
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                  key={uuidv4()}
                  uniforms={clouduniforms}
                  vertexShader={vertexShader}
                  fragmentShader={fragmentShader}
                />
              </mesh>
            </>,
            scene
          )}
          <bicubicUpscaleMaterial ref={upscaleMaterialRef} key={uuidv4()} />
          <mesh ref={triangleMesh} geometry={getFullscreenTriangle()}>
            <meshBasicMaterial />
          </mesh>
        </>,
        scenetwo
      )}
    </>
  );
});

export default Clouds;
