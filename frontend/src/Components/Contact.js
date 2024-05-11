import React, { useState,useEffect } from 'react';
import { SectionWrapper } from '../hoc';
import { styles } from '../style';
import {  motion } from 'framer-motion';
import emailjs from '@emailjs/browser'; 
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeIn } from '../assets/motion';

const Contact = () => {
    const [data,setData]=useState({name:'',email:'',message:''});
    const [loading,setLoading]=useState(false);
    const controls = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
      if (inView) 
        controls.start("show");
      else
        controls.start("hidden");
      
    }, [controls, inView]);
    const vari={
      hidden:{pathLength:0,opacity:0,x:0},

      show:{pathLength:[0,0.74,1,1],opacity:[0,1,1,0]}

    };
    const vari1={
      hidden:{opacity:0,y:'-100%'},

      show:{y:['-100%','30%','15%'],opacity:1,transition:{duration:1.5,delay:3.4},scale:[1,1.4,1.6]}

    };
    const vari2={
      hidden:{opacity:0,y:'100%'},

      show:{y:['100%','0%','10%'],opacity:1,transition:{duration:1.5,delay:3.4},scale:[1,1.4,1.6]},

    };
    const icon={
      hidden:{opacity:0,y:100,scale:1},
      show:{opacity:1,y:20,scale:0.85,transition:{duration:0.7,delay:4.1}}
    }
    const sendMessage=(e)=>{
        e.preventDefault();
        setLoading(true);
        emailjs.send('service_vgly9zr','template_yru7s7e',
        {
          from_name:data.name,
          to_name:'Anirban',
          from_email:data.email,
          to_email:'tataighosh104@gmail.com',
          message:data.message,
    
        },'vzoS1DPojvOG_3sE9'
        ).then(()=>{
          setLoading(false);

          alert('Email Sent, will get back to you as soon as possible');
          setData({
            name:'',
            email:'',
            message:'',
          },(error)=>{
            setLoading(false);
            console.log(error);
            alert('Something went Wrong')
          })
        })
    
      }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setData({...data,[name]:value})
      }
    return (
    <div className='w-full h-fit ' >
      <motion.p variants={fadeIn('up','','','0.9')} className={`${styles.sectionHeadText}`} >Contact.</motion.p>
      <motion.p variants={fadeIn('left','','0.5','0.9')} className={`${styles.sectionSubText}`}>Feel free to contact in case of any doubts.</motion.p>
      <div className='w-full md:mt-8 mt-4 flex flex-col-reverse md:flex-row gap-8'>
        <motion.div variants={fadeIn('up','','0.9','1')} className=' md:w-1/2'>
            <form onSubmit={sendMessage} className=' p-8 md:px-16 px-6 bg-black-100 rounded-2xl flex flex-col gap-7  caret-current'>
                <label className='flex flex-col '>
                    <span className='text-[20px] font-semibold '> Name </span>
                    <input type='text' name='name' required='true' placeholder='Your name' value={data.name} onChange={handleChange}  className='bg-tertiary mt-1.5 p-2 px-6 rounded-lg outline-none border-none '></input>
                </label>
                <label className='flex flex-col'>
                    <span className='text-[20px] font-semibold'> Email </span>
                    <input type='email' name='email' required='true' placeholder='Your email' value={data.email} onChange={handleChange}  className='bg-tertiary mt-1.5 p-2 px-6 rounded-lg outline-none border-none '></input>
                </label>
                <label className='flex flex-col'>
                    <span className='text-[20px] font-semibold'> Message </span>
                    <textarea rows={5} type='text' name='message' required='true' placeholder='Enter you message' value={data.message} onChange={handleChange}  className='bg-tertiary mt-1.5 p-2 px-6 rounded-lg outline-none border-none '></textarea>
                </label>
                <motion.button whileTap={{scale:0.85}} type='submit' className='bg-tertiary py-3 px-8 *:outline-none w-fit
                text-white font-bold shadow-md shadow-primary rounded-xl'>
                    {loading? 'Sending...':'Send'}
                </motion.button>
            </form>
        </motion.div>
        <motion.div className='md:w-1/2  flex flex-col items-center' ref={ref} >
            <motion.div
            initial='hidden'
            variants={icon}
            animate={controls}
              className='bg-white w-12 md:w-32  p-2 rounded-2xl'>
              <img src='./img/contact.png' alt='contact' className='text-white font-white'></img>
            </motion.div>
            
            <motion.div
            initial='hidden'
            variants={vari1}
            animate={controls}
            className='mt-4 text-[38px] md:text-[98px] text-center tracking-wide font-semibold h-fit '>Get</motion.div>
            <svg xmlns="http://www.w3.org/2000/svg" className='absolute -mt-16 md:mt-0 scale-75 md:scale-110'  viewBox='0 0 100 80'>
                <motion.path d='M29 25 L70 25 L70 55 L30 55 L30 26 L50 40 L70 25' stroke='#ffffff' fill='none' strokeWidth={2}
                  key="message"
                  variants={vari}
                  initial="initial"
                  animate={controls}
                  transition={{duration:3,ease:'easeInOut',delay:0.7, easings:3}}
                  />
            </svg>
            <motion.div
            initial='hidden'
            variants={vari2}
            animate={controls}
              className='text-[18px] md:text-[56px] text-center tracking-tighter font-thin h-fit '>in touch</motion.div>
            
            
        </motion.div>
      </div>
      <div className='w-full mt-6 '>
        <div className='flex gap-4 justify-center items-center opacity-70'>
            <p className=' text-[18px] font-light '>
                Social Media Links <span className='text-[31px] align-middle ml-2'>|</span>
            </p>
            <a href='' className='w-8'>
                <img src='./img/facebook.png'  alt='facebook'/>
            </a>
            <a href='' className='w-8'>
                <img src='./img/insta.png' alt='facebook'/>
            </a>
            
        </div>
      </div>
    </div>
  )
}

export default SectionWrapper(Contact,'contact');
