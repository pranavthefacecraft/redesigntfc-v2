import { useRef ,Suspense, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, ContactShadows } from '@react-three/drei'

import { 
     lightpurple_house,
     lightpurple_tree,
     lightpurple_towork,
     lightpurple_solit,
     lightpurple_study,
     darkpurple_house,
     darkpurple_rafw,
     darkpurple_tree,
     darkpurple_solit,
     darkpurple_towork,
     white,
     purpledark,
     purplelight,
     greyish
} from '../cubematerial'

export default function Cube() {

  const group = useRef()  
  const { nodes, animations   } = useGLTF('/Menu/Models/Cube_tfc.glb')  
  const { actions, names } = useAnimations(animations, group)
  

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
    actions[names[0]].timeScale = 0.6;
  });
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.position.y =- 3.0 + ( 1.0 * Math.cos((t * 2) / 2)) / 2

   
  })
  
  return (
    <>
    <Suspense fallback={null} >
    <group ref={group} dispose={null} position={[-4,-10,0]} scale={1.2} rotation={[0.1,0.1,0]}>
    <ambientLight intensity={2}/>
    <group name="Scene">
        <group name="Rubix002" position={[2.52, 0.5, -0.5]} scale={0.5}>
          <mesh
            name="Cube003"
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={greyish}
          />
          <mesh
            name="Cube003_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube003_1.geometry}
            material={white}
          />
          <mesh
            name="Cube003_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube003_2.geometry}
            material={lightpurple_tree}
          />
          <mesh
            name="Cube003_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube003_3.geometry}
            material={darkpurple_house}
          />
        </group>
        <group name="Rubix009" position={[0.5, 1.51, -0.5]} scale={0.5}>
          <mesh
            name="Cube010"
            castShadow
            receiveShadow
            geometry={nodes.Cube010.geometry}
            material={greyish}
          />
          <mesh
            name="Cube010_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube010_1.geometry}
            material={white}
          />
          <mesh
            name="Cube010_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube010_2.geometry}
            material={purplelight}
          />
          <mesh
            name="Cube010_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube010_3.geometry}
            material={darkpurple_solit}
          />
        </group>
        <group name="Rubix010" position={[1.51, 1.51, -0.5]} scale={0.5}>
          <mesh
            name="Cube011"
            castShadow
            receiveShadow
            geometry={nodes.Cube011.geometry}
            material={greyish}
          />
          <mesh
            name="Cube011_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube011_1.geometry}
            material={white}
          />
          <mesh
            name="Cube011_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube011_2.geometry}
            material={purplelight}
          />
          <mesh
            name="Cube011_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube011_3.geometry}
            material={purpledark}
          />
        </group>
        <group name="Rubix014" position={[2.52, 1.51, -1.51]} scale={0.5}>
          <mesh
            name="Cube015"
            castShadow
            receiveShadow
            geometry={nodes.Cube015.geometry}
            material={greyish}
          />
          <mesh
            name="Cube015_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_1.geometry}
            material={white}
          />
          <mesh
            name="Cube015_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_2.geometry}
            material={lightpurple_house}
          />
          <mesh
            name="Cube015_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_3.geometry}
            material={purpledark}
          />
        </group>
        <group name="Rubix018" position={[0.5, 2.518, -0.5]} scale={0.5}>
          <mesh
            name="Cube019"
            castShadow
            receiveShadow
            geometry={nodes.Cube019.geometry}
            material={greyish}
          />
          <mesh
            name="Cube019_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube019_1.geometry}
            material={white}
          />
          <mesh
            name="Cube019_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube019_2.geometry}
            material={lightpurple_study}
          />
          <mesh
            name="Cube019_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube019_3.geometry}
            material={darkpurple_rafw}
          />
        </group>
        <group name="Rubix020" position={[2.52, 2.518, -0.5]} scale={0.5}>
          <mesh
            name="Cube021"
            castShadow
            receiveShadow
            geometry={nodes.Cube021.geometry}
            material={greyish}
          />
          <mesh
            name="Cube021_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube021_1.geometry}
            material={white}
          />
          <mesh
            name="Cube021_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube021_2.geometry}
            material={lightpurple_towork}
          />
          <mesh
            name="Cube021_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube021_3.geometry}
            material={darkpurple_tree}
          />
        </group>
        <group name="Rubix022" position={[1.51, 2.518, -1.51]} scale={0.5}>
          <mesh
            name="Cube023"
            castShadow
            receiveShadow
            geometry={nodes.Cube023.geometry}
            material={greyish}
          />
          <mesh
            name="Cube023_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube023_1.geometry}
            material={white}
          />
          <mesh
            name="Cube023_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube023_2.geometry}
            material={lightpurple_house}
          />
          <mesh
            name="Cube023_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube023_3.geometry}
            material={purpledark}
          />
        </group>
        <group name="Rubix023" position={[2.52, 2.52, -1.51]} scale={0.5}>
          <mesh
            name="Cube024"
            castShadow
            receiveShadow
            geometry={nodes.Cube024.geometry}
            material={greyish}
          />
          <mesh
            name="Cube024_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube024_1.geometry}
            material={white}
          />
          <mesh
            name="Cube024_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube024_2.geometry}
            material={purplelight}
          />
          <mesh
            name="Cube024_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube024_3.geometry}
            material={purpledark}
          />
          <mesh
            name="Cube024_4"
            castShadow
            receiveShadow
            geometry={nodes.Cube024_4.geometry}
            material={lightpurple_house}
          />
        </group>
        <group name="Rubix024" position={[0.5, 2.518, -2.52]} scale={0.5}>
          <mesh
            name="Cube025"
            castShadow
            receiveShadow
            geometry={nodes.Cube025.geometry}
            material={greyish}
          />
          <mesh
            name="Cube025_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube025_1.geometry}
            material={white}
          />
          <mesh
            name="Cube025_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube025_2.geometry}
            material={purplelight}
          />
          <mesh
            name="Cube025_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube025_3.geometry}
            material={darkpurple_towork}
          />
        </group>
        <group name="Rubix026" position={[2.52, 2.518, -2.52]} scale={0.5}>
          <mesh
            name="Cube027"
            castShadow
            receiveShadow
            geometry={nodes.Cube027.geometry}
            material={greyish}
          />
          <mesh
            name="Cube027_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube027_1.geometry}
            material={white}
          />
          <mesh
            name="Cube027_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube027_2.geometry}
            material={lightpurple_solit}
          />
          <mesh
            name="Cube027_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube027_3.geometry}
            material={purpledark}
          />
        </group>  
      </group>
    </group>

    </Suspense>
    
    <ContactShadows opacity={0.1} scale={30} blur={1.5} far={30} resolution={256} color="#000000" position={[0,-6.0,0]}/>
    </>  
  )
}

useGLTF.preload('/Menu/Models/Cube_tfc.glb')
