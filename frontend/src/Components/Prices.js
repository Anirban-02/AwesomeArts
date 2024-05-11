import React, { useState } from 'react'
import { SectionWrapper } from '../hoc';
import { styles } from '../style';
import { motion } from 'framer-motion';
import { fadeIn } from '../assets/motion';

const Prices = () => {
  const [size,setSize]=useState('Select Size');
  const [click1,setClick1]=useState(true);
  const [medium,setMedium]=useState('Select Medium');
  const [click2,setClick2]=useState(true);
  const [count,setCount]=useState('Number of Faces');
  const [click3,setClick3]=useState(true);
  const[price,setPrice]=useState(0);
  function fclick1(s)
  {
    setClick1(!click1);
    setSize(s);
  }
  function fclick2(s)
  {
    setClick2(!click2);
    setMedium(s);
  }
  function fclick3(s)
  {
    setClick3(!click3);
    setCount(s);
  }
   
  const dimensions ={
      A3:[297,420],
      A4:[210,297],
      A5:[148,210],
      A6:[105,148]
  }
  const medBg ={
    'Select Medium':'green-pink-gradient',
    'Black & White':'bg-b1 text-white-100',
    'Water Colour':'bg-b2 text-black-100  ',
    'Dot Painting':'bg-b3 text-white-100',
    'Acrylic Colour':'bg-b4 text-black-100 '
}
 const priceList={
  A3:450,
  A4:350,
  A5:200,
  A6:100,
  'Black & White':100,
  'Water Colour':200,
  'Dot Painting':150,
  'Acrylic Colour':200,
  '1':0,
  '2':50,
  '3':100,
  '4+':150
 }
 function reset(){
  setClick1(true);
  setClick2(true);
  setClick3(true);
  setMedium('Select Medium');
  setCount('Number of Faces');
  setSize('Select Size');
  setPrice(0);
 }
function calculatePrice(){
  if (size==='Select Size' )
  {
    window.alert("Please Select a Size");
  }
  else if(medium==='Select Medium' ){
    window.alert("Please Select a Medium");
  }
  else if( count==='Number of Faces'){
    window.alert("Please Select the Number of Faces");
  }
  else{
    setPrice(priceList[size]+priceList[medium]+priceList[count])
  
  }
}

  return (
    <div className='w-full h-screen md:h[70vh] caret-transparent'>
      <motion.p variants={fadeIn('up','','0.1','0.8')} className={`${styles.sectionHeadText}`}>Prices.</motion.p>
      <motion.p variants={fadeIn('left','','0.4','0.8')} className={`${styles.sectionSubText} -mt-1`} >Check how much your customised artwork costs</motion.p>
      <motion.div variants={fadeIn('','','0.9','0.8')} className=' mt-6 w-full flex flex-row rounded-2xl bg-black-100 md:justify-around md:mx-auto flex-wrap items-center '>
        <div className='w-1/2 md:w-1/4 h-[220px] xs:h-[280px] md:h-[450px]  p-2 flex items-center  '>
          {click1?

          <motion.div whileTap={{scale:0.90}} className={`${size==='Select Size'?'green-pink-gradient':'bg-card1 bg-cover '} relative container w-full h-[190px] xs:h-[230px] md:h-[330px] flex items-center justify-center cursor-pointer  rounded-3xl caret-transparent`} onClick={()=>setClick1(!click1)}>
            {size!=='Select Size'?
            <>
            <p className='absolute text-[11px] xs:text-[15px] md:text-[21px] bottom-1 tracking-wider  text-black-200' >&lt;----&nbsp; {dimensions[size][0]} mm &nbsp;----&gt;</p>
            <p className='absolute text-[11px] xs:text-[15px] md:text-[22px] left-[48%]   text-nowrap  -rotate-90 flex items-center  text-black-200' >&lt;-----&nbsp; {dimensions[size][1]} mm &nbsp;-----&gt;</p>
            </>
            :''}
            <p className={`${size ==='Select Size'?'text-[26px] md:text-[48px]':'text-[54px] md:text-[108px] text-black-200'} p-3 text-center font-bold tracking-wide`}>{size}</p>
            
          </motion.div>
          :
          <motion.div className='w-full flex flex-col bg-black-200 h-[190px]  xs:h-[230px] md:h-[330px] text-[18px] md:text-[36px] justify-center p-4 md:gap-4 gap-3  md:mx-2 rounded-3xl caret-transparent ' >
            <motion.div variants={fadeIn('down','spring','0.3','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary w-full  h-[40px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick1('A3')}>
              A3
            </motion.div>
            <motion.div variants={fadeIn('down','spring','0.6','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary  w-full h-[40px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick1('A4')}>
              A4
            </motion.div>
            <motion.div variants={fadeIn('down','spring','0.9','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary  w-full h-[40px] md:h-[60px] flex items-center justify-center cursor-pointer rounded-3xl' onClick={()=>fclick1('A5')}>
              A5
            </motion.div>  
            <motion.div variants={fadeIn('down','spring','1.2','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary  w-full h-[40px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick1('A6')}>
              A6
            </motion.div>  
          </motion.div>
          }
        </div>

        <div className='w-1/2 md:w-1/4 h-[220px]  xs:h-[280px] md:h-[450px] p-2 flex items-center '>
          {click2?

          <motion.div whileTap={{scale:0.90}} className={`${medBg[medium]} bg-cover bg-center  w-full font-bold  h-[190px]  xs:h-[230px] md:h-[330px] px-4 flex items-center justify-center cursor-pointer  rounded-3xl caret-transparent`} onClick={()=>setClick2(!click2)}>
            
            <p className={`text-[26px] md:text-[48px] text-center  `}>{medium}</p> 
          </motion.div>
          :
          <motion.div className='w-full flex bg-black-200 p-4 flex-col justify-center md:gap-4 gap-3 mx-0 h-[190px] xs:h-[230px] md:h-[330px] md:mx-2 text-[11px] md:text-[24px] rounded-3xl caret-transparent ' >
            <motion.div variants={fadeIn('down','spring','0.3','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary w-ful  shadow-md h-[35px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick2('Black & White')}>
              Black & White
            </motion.div>
            <motion.div variants={fadeIn('down','spring','0.6','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary  w-full shadow-md  h-[35px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick2('Water Colour')}>
              Water Colour
            </motion.div>
            <motion.div variants={fadeIn('down','spring','0.9','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary  w-full shadow-md  h-[35px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick2('Dot Painting')}>
              Dot Painting
            </motion.div>  
            <motion.div variants={fadeIn('down','spring','1.2','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary  w-full shadow-md   h-[35px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick2('Acrylic Colour')}>
              Acrylic Colour
            </motion.div>  
          </motion.div>
          }
        </div>

        <div className='w-1/2 md:w-1/4 h-[220px]  xs:h-[280px] md:h-[450px]  p-2 flex items-center '>
          {click3?

          <motion.div whileTap={{scale:0.90}} className={`${count==='Number of Faces'?'green-pink-gradient':'bg-card1 bg-cover  '} px-4 bg-center w-full font-bold  h-[190px]  xs:h-[230px] md:h-[330px] flex items-center justify-center cursor-pointer  rounded-3xl caret-transparent`} onClick={()=>setClick3(!click3)}>
            
            <p className={`${count ==='Number of Faces'?'text-[26px] md:text-[44px]':'text-[74px] md:text-[108px] text-black-200'} text-center  `}>{count}</p> 
          </motion.div>
          :
          <motion.div className='w-full flex flex-col h-[190px]  xs:h-[230px] md:h-[330px] bg-black-200 p-4 rounded-3xl md:gap-4 gap-3 md:mx-2 justify-center text-[18px] md:text-[24px] font-bold caret-transparent ' >
            <motion.div variants={fadeIn('down','spring','0.3','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary w-full  h-[40px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick3('1')}>
              1
            </motion.div>
            <motion.div variants={fadeIn('down','spring','0.6','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary  w-full h-[40px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick3('2')}>
              2
            </motion.div>
            <motion.div variants={fadeIn('down','spring','0.9','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary  w-full h-[40px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick3('3')}>
              3
            </motion.div>  
            <motion.div variants={fadeIn('down','spring','1.2','0.5')} initial='hidden' animate='show' whileTap={{scale:0.85}} className='bg-tertiary  w-full h-[40px] md:h-[60px] flex items-center justify-center cursor-pointer  rounded-3xl' onClick={()=>fclick3('4+')}>
              4+
            </motion.div>  
          </motion.div>
          }
        </div>
        <div className='w-1/2 md:w-1/5 h-[220px] md:h-[200px]  p-4 flex items-center '>
          <motion.div  className={`w-full font-bold  h-[190px] md:h-[300px] flex flex-col items-center justify-center gap-4 md:gap-6 caret-transparent`}  >
            <motion.button whileTap={{scale:0.85}} className={`text-[18px] md:text-[26px] bg-tertiary border-2 text-center rounded-2xl p-2 px-3 cursor-pointer  `} onClick={()=>calculatePrice()}>Check Price</motion.button> 
            <input className='text-center bg-secondary p-2 rounded-2xl w-[100px] md:w-[150px] text-[21px] cursor-default'   value={`Rs. ${price}`} />
            <motion.button whileTap={{scale:0.85}} className={`text-[16px] md:text-[22px] bg-tertiary border-2 text-center rounded-2xl px-4 py-1 cursor-pointer  `} onClick={()=>reset()}>Reset</motion.button>           
          </motion.div>
          
        
        </div>
        
      </motion.div>
      <div className=' mt-8 w-full h-fit flex justify-center items-center'>
          <a href='#buy'>
            <div className='w-[35px] h-[60px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2  bottom-6'>
              <motion.dev
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
    </div>
  )
}

export default SectionWrapper(Prices,'prices');
