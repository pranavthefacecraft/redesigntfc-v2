import { Float, PerspectiveCamera, useScroll, useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useLayoutEffect, useEffect, useState } from "react";
import * as THREE from "three";

import useStore from "../../LaunchtFC/zustand/store";




const LINE_NB_POINTS = 12000;

export default function Common() {
  const box = useRef()
  const scroll = useScroll()
  const { nodes, materials, animations } = useGLTF('/Revamp/cattie.glb')
  const { actions, names } = useAnimations(animations, box)

  const action = actions['GltfAnimation 0']; 


  // Play the animation and pause it initially
  useLayoutEffect(() => {
    
    if (action) {
      action.play();
    }
  }, [actions]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(10, 0, 50),
        new THREE.Vector3(0, 0, 100),
        new THREE.Vector3(40, 0, 150),
        new THREE.Vector3(0, 0, 200),
        new THREE.Vector3(40, 0, 400),
      ],
      false,
      "chordal",
      5.0
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1.0);
    shape.lineTo(0, 1.0);
    return shape;
  }, [curve]);


  useFrame((state) => {
    // Clamp offsets between 0 and 1
    const cameraOffset = Math.min(scroll.offset, 1);
    const boxOffset = Math.min(scroll.offset + 0.005, 1); // Always slightly ahead of camera
    
    const { camera } = state;

    // Use getPointAt for normalized values (0-1)
    const cameraPosition = curve.getPointAt(cameraOffset);
    const boxPosition = curve.getPointAt(boxOffset);
    
    camera.position.copy(cameraPosition);
    box.current.position.copy(boxPosition);
    
    // Get tangents and normalize them properly
    const cameraTangent = curve.getTangentAt(cameraOffset).normalize();
    const boxTangent = curve.getTangentAt(boxOffset).normalize();
    
    camera.lookAt(cameraPosition.clone().add(cameraTangent));
    box.current.lookAt(boxPosition.clone().add(boxTangent));



  });

  return (
    <> 
    
    
    
      {/* LINE */}
      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshBasicMaterial color={"black"} />
        </mesh>
      </group>



      <group ref={box} scale={0.07}>
       <group name="Scene">
         <group name="Sketchfab_model" rotation={[-Math.PI/2, 0, Math.PI * 2]} scale={0.414} position={[0,-30,30]}>
           <group name="root">
             <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
               <group name="GLTF_created_0">
                 <group name="0000_pet_s_4cat_Black_60">
                   <group name="0000_pet_s_4cat_Black_61" />
                 </group>
                 <group name="0001_pet_s_4cat_Black_62">
                   <group name="0001_pet_s_4cat_Black_63" />
                 </group>
                 <group name="0002_pet_s_4cat_Black_64">
                   <group name="0002_pet_s_4cat_Black_65" />
                 </group>
                 <group name="0003_pet_s_4cat_Black_66">
                   <group name="0003_pet_s_4cat_Black_67" />
                 </group>
                 <skinnedMesh
                   name="Object_7"
                   geometry={nodes.Object_7.geometry}
                   skeleton={nodes.Object_7.skeleton}
                 >
                     <meshBasicMaterial color={'white'}/>
                     </skinnedMesh>
                 <primitive object={nodes.GLTF_created_0_rootJoint} />
               </group>
             </group>
           </group>
         </group>
       </group>
      </group>
    </>
  )
}

useGLTF.preload('/Revamp/cattie.glb')