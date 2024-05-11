import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../style';
import { SectionWrapper } from '../hoc';
import { fadeIn } from '../assets/motion';
import { close } from '../assets';
import certificate from './Certificate.json'
const About=()=> {
  const [click1,setClick1]=useState(false);
  const [click2,setClick2]=useState(false);
  const [expandedIndex,setExpandedIndex]=useState(null);
  const [isMobile,setIsMobile]=useState(false);
  useEffect(()=>{
    const mediaQuery=window.matchMedia('(max-width:740px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange=(e)=>{
      setIsMobile(e.matches);
    }
    mediaQuery.addEventListener('change',handleMediaQueryChange);
    
    return()=>{
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  },[])
  const cardvariants={
    expandedw:{
      width:"672px"
    },
    collapsedw:{
      width:"250px"
    },
    collapsedh:{
      height:"140px"
    },
    expandedh:{
      height:"227px"
    },
    expandedh2:{
      height:"189px"
    }
  }

  function preventBubbling(event) {
    event.stopPropagation();
}
  return (
    <div className="w-full h-fit relative caret-transparent ">
      <motion.p variants={fadeIn('up','','0.1','0.8')} className={`${styles.sectionHeadText} mt-1`}>Introduction.</motion.p>
      <motion.p variants={fadeIn('left','','0.7','0.8')} className={`${styles.sectionSubText} -mt-1 `}>know more About your artist friend</motion.p>
      <div className="w-full mt-6 md:-mt-4 flex flex-col md:flex-row-reverse items-center  gap-3">
        <motion.div variants={fadeIn('down','','1.1','0.85')} className='w-[255px] h-[255px] md:w-[350px] md:h-[350px] bg-white rounded-full flex justify-center items-center'>
          <img src='./img/pic1.jpeg' alt='img' className='p-2 rounded-full object-cover w-full h-full '></img>
        </motion.div>
        <div className='w-full flex-1 md:pr-5 '>
          <motion.p variants={fadeIn('','',1.1,0.8)} className='w-full font-bold text-[24px] flex md:flex-row flex-col justify-center md:gap-3 items-baseline tracking-wider '>
            <div className='text-[24px] '>Hello, myself</div>
            <div className='text-[36px] text-secondary'>Anirban Ghosh</div> 
          </motion.p>
          <motion.p 
            variants={fadeIn('','',0.9,0.8)}
            className='mt-2 text-[18px] font-light indent-16 md:text-left    leading-relaxed '>
            Currently I am pursuing B.Tech in Computer Science from MCKV Institute of Engineering , Liluah , Howrah. 
            I have learnt Drawing for around 12 years from '<span className='font-semibold '> MEERA SMRITI SISHU ANKAN SIKSHA KENDRA </span>' .
            Here are my latest drawing examination certificates .
            You can go through my Works in the Gallery Section. You can also order Customized Paintings, Sketches and Portraits for your own or gift
            it to your loved ones for making them feel a little MORE SPECIAL..!! 
          </motion.p>
        </div>
      </div>
      <motion.div variants={fadeIn('','','1.2','0.6')} className='md:-mt-4 mt-4 md:text-[38px] text-[32px] font-semibold '>Certificates.</motion.div>
      <div className=' flex md:flex-row flex-col w-full items-center md:w-[60%] mt-4 mb-5 gap-4 p-4 '>
        <motion.div variants={fadeIn('left','','1.3','0.7')} className='green-pink-gradient flex items-center h-10 w-fit px-6 rounded-3xl cursor-pointer' onClick={()=>setClick1(!click1)}>
          Suro Bharti Sangeet Kala kendra
          {click1 && 
          <section>
            <motion.div 
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{
                duration:0.5,
                delay:0.1
              }}
              className='absolute p-4 -bottom-24 -md:bottom-[10px] left-0 w-full h-[93vh] backdrop-blur-md backdrop-brightness-125 flex justify-center items-center z-0 ' onClick={(event)=>(preventBubbling(event))}>
                <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>{
                  certificate.slice(0,3).map((cert,index)=>(
                    <motion.div
                    key={{index}}
                    className={`md:h-[480px] w-[320px] bg-cover md:bg-center rounded-3xl ${index===expandedIndex?'expandedh':''}  md:${index===expandedIndex?'expandedw':''}`}
                    variants={cardvariants}
                    initial={isMobile?'collapsedh':'collapsedw'}
                    animate={index===expandedIndex?(isMobile?"expandedh":"expandedw"):(isMobile?"collapsedh":"collapsedw")}
                    transition={{duration:0.38}}
                    onClick={()=>setExpandedIndex(index===expandedIndex?-1:index)}
                    style={{
                      backgroundImage:`url(${cert.img1})`,
                    }}
                    >
                      <motion.div 
                        initial={{opacity:0.85}}
                        animate={index===expandedIndex?{opacity:0}:{}}
                        transition={{duration:0.38}}
                        className=' bg-primary rounded-t-3xl mt-0 h-[50px] md:h-[78px] w-full flex justify-center items-center font-semibold text-[28px]'>
                        {cert.name}
                      </motion.div>
                    </motion.div>
                  ))
                }</div>
                <img src={close} alt='img' width='38px' className='absolute p-1.5 top-12 right-2 md:right-10 md:top-10 cursor-pointer ' onClick={()=>{setClick1(!click1);setExpandedIndex(-1);}} />
            </motion.div>
          </section>
          }
          
        </motion.div>
        <motion.div variants={fadeIn('left','','1.9','0.7')} className='green-pink-gradient flex items-center w-fit px-6 h-10 rounded-3xl  cursor-pointer ' onClick={()=>setClick2(!click2)}>
          Bangiya Sangeet Parishad
          {click2 && 
          <section>
            <motion.div 
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{
                duration:0.5,
                delay:0.1
              }}
              className='absolute p-4 -bottom-24 -md:bottom-[10px] left-0 w-full h-[93vh]  backdrop-blur-md backdrop-brightness-125 flex justify-center items-center z-0 ' onClick={(event)=>(preventBubbling(event))}>
                <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>{
                  certificate.slice(3).map((cert,index)=>(
                    <motion.div
                    key={{index}}
                    className={`md:h-[480px] w-[320px] bg-cover md:bg-center rounded-3xl ${index===expandedIndex?'expandedh2':''}  md:${index===expandedIndex?'expandedw':''}`}
                    variants={cardvariants}
                    initial={isMobile?'collapsedh':'collapsedw'}
                    animate={index===expandedIndex?(isMobile?"expandedh2":"expandedw"):(isMobile?"collapsedh":"collapsedw")}
                    transition={{duration:0.38}}
                    onClick={()=>setExpandedIndex(index===expandedIndex?-1:index)}
                    style={{
                      backgroundImage:`url(${cert.img1})`,
                    }}
                    >
                      <motion.div 
                        initial={{opacity:0.85}}
                        animate={index===expandedIndex?{opacity:0}:{}}
                        transition={{duration:0.38}}
                        className=' bg-primary rounded-t-3xl mt-0 h-[50px] md:h-[78px] w-full flex justify-center items-center font-semibold text-[28px]'>
                        {cert.name}
                      </motion.div>
                    </motion.div>
                  ))
                }</div>
                <img src={close} alt='img' width='38px' className='absolute p-1.5 top-12 right-2 md:right-10 md:top-10 cursor-pointer ' onClick={()=>{setClick2(!click2);setExpandedIndex(-1);}} />
            </motion.div>
          </section>
          }
          
        </motion.div>
      </div>
      
      
    </div>
    
  )
}

export default SectionWrapper(About,'about')
