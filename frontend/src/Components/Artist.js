import {Suspense,useEffect,useState,useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls,Preload,useGLTF } from '@react-three/drei';
import Loader from './Loader'

import { useAnimations } from '@react-three/drei';

const Artist = ({isMobile}) => {
  const group=useRef();
  const artist =useGLTF('./model/artist3.glb');
  const {animations}=useGLTF('./model/artist3.glb');
  const {actions}=useAnimations(animations,group)
  useEffect(()=>{
    actions.waving.play();
  },);
  return (
    <mesh ref={group} >
      <hemisphereLight intensity={1.8} groundColor="black"/>
      <pointLight intensity={30} position={isMobile?[-2.7,3,4]:[9,2,5]}/>
      <pointLight intensity={isMobile?31:11} position={isMobile?[3,5,5]:[3,4,4]}/>
      <pointLight intensity={isMobile?19:38} color='#fffff5' position={isMobile?[-4,6,3]:[-3.8,4,2]}/>
      <spotLight intensity={100} position={isMobile?[4,-5.6,6.8]:[1,10,0]} 
        angle={0.38}
        penumbra={1}
        castShadow
        shadow-mapSize={1024}
        
        ></spotLight>
      <spotLight intensity={30} position={isMobile?[6,7,3]:[2,-5,7]} 
        angle={0.38}
        penumbra={1}
        castShadow
        shadow-mapSize={1024}
        
        ></spotLight>

      <primitive object={artist.scene} 
        scale={isMobile? 1.15:0.54} 
        position={isMobile?[-0.3,-10.5,0.2]:[0,-2.1,0.45]} 
        rotation={isMobile?[0,1.38,0]:[0.3,1.38,-0.3]} 
          
        />
    </mesh>
  )
}

const ArtistCanvas=({mode})=>{
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
      camera={{position:[25,4,5],fov:25}}
      gl={{preserveDrawingBuffer:true}}
      >
      <Suspense fallback={<Loader/>} >
        <OrbitControls 
        enableZoom={false}
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI/2}/>
        <Artist isMobile={isMobile}/>
      </Suspense>
      <Preload all/>
    </Canvas>
  )
}

export default ArtistCanvas