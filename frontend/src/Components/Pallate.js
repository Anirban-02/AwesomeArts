import {Suspense,useEffect,useState,useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls,Preload,useGLTF } from '@react-three/drei';
import Loader from './Loader'

import { useAnimations } from '@react-three/drei';

const Pallate = ({isMobile}) => {
  const group=useRef();
  const pallate =useGLTF('./model/pallate.glb');
  const {animations}=useGLTF('./model/pallate.glb');
  const {actions}=useAnimations(animations,group)
    useEffect(()=>{
      actions.brush_movement.play();
      actions.brush_paint.play();
      actions.brush_drop_1.play();
      actions.brush_drop_2.play();
    },[]);
  return (
    <mesh ref={group} >
      <hemisphereLight intensity={0.58} groundColor="black"/>
      <pointLight intensity={38} position={isMobile?[-2.7,2,4]:[-6,-3,3]}/>
      <pointLight intensity={isMobile?9:16} position={isMobile?[2,0,-4]:[0,5,-1]}/>
      
      <spotLight intensity={2300} position={isMobile?[-25,60,-10]:[-50,30,10]}
        angle={0.32}
        penumbra={1}
        castShadow
        shadow-mapSize={1024}
        ></spotLight>

      <primitive object={pallate.scene} 
        scale={isMobile? 0.71:1.38} 
        
        position={isMobile?[0,-1.6,0]:[-3,-1.2,-3.1]} 
        rotation={isMobile?[-0.7,0.6,-0.3]:[-1.1,0.4,-0.5]} 
          
        />
    </mesh>
  )
}

const PallateCanvas=({mode})=>{
  const[isMobile,setIsMobile]=useState(false);
  useEffect(()=>{
    const mediaQuery=window.matchMedia('(max-width:640px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange=(e)=>{
      setIsMobile(e.matches);
    }
    mediaQuery.addEventListener('change',handleMediaQueryChange);
    
    return()=>{
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  },[])
  return(
    <Canvas
      frameloop={mode}
      shadows
      camera={{position:[25,4,5],fov:18}}
      gl={{preserveDrawingBuffer:true}}
      >
      <Suspense fallback={<Loader/>} >
        <OrbitControls 
        enableZoom={false}
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI/2}/>
        <Pallate isMobile={isMobile}/>
      </Suspense>
      <Preload all/>
    </Canvas>
  )
}

export default PallateCanvas