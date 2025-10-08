import * as THREE from "three"
import { memo, useRef, useMemo, useLayoutEffect } from "react"
import { useGLTF, useAnimations, useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";


const Common = memo(function Common() {
  
  const group = useRef()
  const glbcubesref = useRef([])
  const instanceMeshref = useRef()
  const { nodes, materials, animations } = useGLTF('/Launch/models/Rubby.glb')
  const { actions, names } = useAnimations(animations, group)

  const { size, viewport } = useThree()
  const scroll = useScroll()

  useLayoutEffect(() => {
      const action = actions['Animation']; 
      if (action) {
        action.play();
        action.paused = true;
      }
  }, [actions]);


  // Reusable objects for matrix calculations
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const tempVector = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {

    const scrollOffset = scroll.offset; // Get the current scroll offset (0 to 1)
    if (actions && actions['Animation']) {
      const action = actions['Animation'];
      const duration = action.getClip().duration;
      action.time = scrollOffset * duration;
    }

    // Updating instance meshes Matrix with reusable objects
    if(instanceMeshref.current && glbcubesref.current.length > 0){
     for(let i = 0; i < glbcubesref.current.length; i++){
         const cube = glbcubesref.current[i];
         tempMatrix.compose(
             cube.position,
             tempQuaternion.setFromEuler(cube.rotation),
             tempVector.set(
                 cube.scale?.x ?? 0.7,
                 cube.scale?.y ?? 0.7,
                 cube.scale?.z ?? 0.7
             )
         );
         instanceMeshref.current.setMatrixAt(i, tempMatrix);
     }
     instanceMeshref.current.instanceMatrix.needsUpdate = true;
    }


  });


  const cubeNames = useMemo(() => 
   Object.keys(nodes)
    .filter((k) => k.startsWith('Cube'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
  [nodes]
  )

  return (
    <>



    {/* Instanced Mesh */}
    {nodes && nodes.Scene && (
      <instancedMesh 
        ref={instanceMeshref}  
        args={[null, materials["Material.001"], cubeNames.length]}
      >  
        <primitive attach="geometry" object={nodes.Cube002.geometry} />
      </instancedMesh>
    )}

    {/* AnimationTargets */}
    <group ref={group} dispose={null}>
      <group name="Scene">
        {cubeNames.map((name, index) => {
          const node = nodes[name];
          return (
            <mesh
              key={name}
              name={name}
              visible={false}
              ref={(el) => (glbcubesref.current[index] = el)}
              geometry={node.geometry}
              position={node.position ?? undefined}
              rotation={node.rotation ?? undefined}
              scale={node.scale ?? 0.7}
            />
          );
        })}
      </group>
    </group>
    
    </>
  )
});

export default Common;
useGLTF.preload('/Launch/models/Rubby.glb')