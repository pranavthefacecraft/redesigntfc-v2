 import { useGLTF, useAnimations } from "@react-three/drei"
import { hairs, skin, TOP_SHIRT, JACKET, LIPS, head } from "../cubematerial"
import { useEffect } from "react"

export function Anne() {

  const model = useGLTF('/Menu/Models/Naima.glb')
  const animations = useAnimations( model.animations, model.scene )

  useEffect( () => {

    const action = animations.actions.Eyes
    action.play()

  } 
  )

  model.scene.traverse( function( node ) {
    if(node.isMesh)
    { 
      if(node.name === "Head" || node.name === "Ears"){
        node.material = skin
      }
      if( node.name === "BODY"){
        
        node.material = head
      }
      if(node.name === "Hair" || node.name === "Brows"){
        node.material = hairs
      }
      if(node.name === "Jacket" || node.name === "Pants" || node.name === "FOOT_R" || node.name === "FOOT_L" ){
        node.material = JACKET
      }
      if(node.name === "TOP_Shirt"){
        node.material = TOP_SHIRT
      }
      if(node.name === "Mouth"){
        node.material = JACKET
      }
      if(node.name === "Mouth001"){
        node.material = LIPS
      }
                  
    }
  }
  )


  return (
    <>
    <ambientLight intensity={0.6}/>
    <directionalLight position={[5,5,5]} intensity={3.0}/>
    <primitive object={ model.scene } scale={ 4.2 } position={[0,-4.0,0]}/>


    </>
  )
}
