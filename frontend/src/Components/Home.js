import React, { useState } from 'react';
import { SectionWrapper } from '../hoc';
import {motion} from 'framer-motion';
import { fadeIn } from '../assets/motion';
import { styles } from '../style';
import PallateCanvas from './Pallate';



const Home=() => {
  const [isPlay,setIsPlay]=useState(false);
  const [mode,setMode]=useState('demand');
  const play='./img/play.png';
  const pause='./img/pause.png';

  const handlePlay=(button)=>{
    if (isPlay===true && button==='b2')
    {
        setIsPlay(!isPlay);
        setMode('demand');
    }
    
    if (isPlay===false && button==='b1')
    {
        setIsPlay(!isPlay);
        setMode('always');
    }
  }
  return (
      <section className="relative w-full h-[90vh] mx-auto caret-transparent">
        <motion.div className={` absolute top-[60px] md:top-[40px] max-w-7xl mx-auto z-10 cursor-default `}>
          <motion.div variants={fadeIn('','',0.4,1)} className={`${styles.heroHeadText}  text-white text-[40px]  `}>
            WELCOME !!
          </motion.div>
          <motion.p variants={fadeIn('left','',1.1,1.3)} className={`${styles.heroSubText} text-white text-wrap `}>
            ORDER <span className='text-[18px]'>your dream </span><span className='px-2 rounded-md violet-gradient text-nowrap '>Customised Artwork</span>
          </motion.p>
          <motion.div variants={fadeIn('','','2.1','1.1')} className='green-pink-gradient absolute mt-10 opacity-90 w-[90px] h-10 z-10 rounded-2xl left-0 p-2  '>
            <div className='flex justify-center items-center h-full gap-2'>
              <img src={play} alt='img' className={`h-8 w-9 py-1 px-[7px] ${isPlay?' opacity-20':' opacity-90 bg-blue-100 cursor-pointer'} rounded-xl duration-500`} onClick={()=>handlePlay('b1')}/>
              <img src={pause} alt='img' className={`h-8 w-9 py-1 px-[7px] ${isPlay?'opacity-90 bg-blue-100 cursor-pointer':'opacity-20 '} rounded-xl duration-500`} onClick={()=>handlePlay('b2')}/>
            </div> 
          </motion.div>
        </motion.div>
        
        <PallateCanvas mode={mode}/>
          
        <div className=' absolute w-full xs:bottom-16 bottom-2 flex justify-center items-center'>
          <a href='#about' >
            <div className='w-[35px] h-[60px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2  bottom-6'>
              <motion.div
                animate={{
                  y:[0,21,0]
                }}
                transition={{
                  duration:1.5,
                  repeat:Infinity,
                  repeatType:'loop'
                }}
                className=' w-3 h-3 rounded-full bg-secondary mb-1'
              />
            </div>
          </a>
        </div>
      </section>
  
  )
}

export default SectionWrapper(Home,"")
