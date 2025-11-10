import React, { useRef, useLayoutEffect } from 'react'
import { useGLTF, useAnimations, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export function Scenetwo(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Revamp/cmon.glb')
  const { actions } = useAnimations(animations, group)

  const scroll = useScroll()
  const lastScroll = useRef(0)
  const currentScroll = useRef(0)
  const isScrolling = useRef(false)
  const framesWithoutScroll = useRef(0)
  
  useLayoutEffect(() => {
    const action = actions['Action.002']; 
    const actiontwo = actions['cat_create']
    if (action && actiontwo) {
      action.play();
      action.paused = true;
      // Only initialize cat_create as paused, don't affect Action.002
      actiontwo.play();
      actiontwo.paused = true;
    }
  }, [actions]);
  
  useFrame(() => {
    currentScroll.current = scroll.offset
    
    // Check if scroll position changed
    const scrollChanged = currentScroll.current !== lastScroll.current
    
    if (scrollChanged) {
      framesWithoutScroll.current = 0
      
      // Scroll just started
      if (!isScrolling.current) {
        isScrolling.current = true
        console.log("🎯 Scroll STARTED")
      }
      
      // Log scroll details
      const scrollDelta = currentScroll.current - lastScroll.current
      const direction = scrollDelta > 0 ? 'down' : 'up'
      
      console.log(`Scrolling ${direction}:`, {
        delta: scrollDelta.toFixed(4),
        current: currentScroll.current.toFixed(3)
      })
      
      // Update animations based on scroll position
      if (actions && actions['Action.002'] && actions['cat_create']) {
        const action = actions['Action.002'];
        const actiontwo = actions['cat_create'];
        const duration = action.getClip().duration;
        
        // Only unpause cat_create during scrolling, keep Action.002 as is
        actiontwo.paused = false;
        action.time = currentScroll.current * duration;
        actiontwo.time = currentScroll.current * duration;
      }
    } else {
      // No scroll change this frame
      framesWithoutScroll.current++

      // If no scroll change for 2 consecutive frames, consider scrolling stopped
      if (isScrolling.current && framesWithoutScroll.current >= 2) {
        isScrolling.current = false
        console.log("🛑 Scroll ENDED at:", currentScroll.current.toFixed(3))
        
        // Only pause cat_create when scrolling stops, don't affect Action.002
        if (actions && actions['cat_create']) {
          actions['cat_create'].paused = true;
        }
      }
    }
    
    lastScroll.current = currentScroll.current
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="catarmature"
          position={[0.975, 0, -278.228]}
          rotation={[0, 0.197, 0]}
          scale={0.011}>
          <skinnedMesh
            name="Object_7"
            geometry={nodes.Object_7.geometry}
            skeleton={nodes.Object_7.skeleton}
          >
            <meshToonMaterial/>
          </skinnedMesh>  
          <primitive object={nodes.GLTF_created_0_rootJoint} />
        </group>
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          position={[0, 0, 5.258]}
        >
          <meshStandardMaterial transparent={true} opacity={0.2} color={'black'}/>
        </mesh>  
      </group>
    </group>
  )
}

useGLTF.preload('/Revamp/cmon.glb')