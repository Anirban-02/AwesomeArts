import React,{useState,useRef} from 'react';
import axios from 'axios';

import { styles } from '../style';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { fadeIn,} from '../assets/motion';
import ArtistCanvas from './Artist';

function Buy() {
    
    const [user,setUser]=useState({name:"",email:"",address:"",number:"",orderImage:"",size:"",medium:"",face:""});
    const [Price,setPrice]=useState(0);
    const [MedPrice,setMedPrice]=useState(0);
    const [facePrice,setfacePrice]=useState(0);
    const [loading,setLoading]=useState(false);
    const [isPlay,setIsPlay]=useState(false);
    const [mode,setMode]=useState('demand');
    let name,value;
    const inputFile=useRef(null);
    const handleReset = () => {
        if (inputFile.current) {
            inputFile.current.value = "";
            inputFile.current.type = "text";
            inputFile.current.type = "file";
        }
    };
    
    const play='./img/play.png';
    const pause='./img/pause.png';

    const handleInputs=(e)=>{
        name=e.target.name;
        if (name==='orderImage')
        {
            console.log(e.target.files[0])
            value=e.target.files[0]
        }
        else
            value=e.target.value;
        if (name==='size')
        {
            switch(value){
                case "A3":
                    setPrice(450);
                    break;
                case "A4":
                    setPrice(350);
                    break;
                case "A5":
                    setPrice(200);
                    break;
                case "A6":
                    setPrice(100);
                    break;
                default:
                    break;
            }
        }
        if (name==='face')
        {
            switch(value){
                case "1":
                    setfacePrice(0);
                    break;
                case "2":
                    setfacePrice(50);
                    break;
                case "3":
                    setfacePrice(100);
                    break;
                case "4+":
                    setfacePrice(150);
                    break;
                default:
                    break;
            }
        }
        if (name==='medium')
            {
                switch(value){
                    case "Graphite (B/W)":
                        setMedPrice(100);
                        break;
                    case "Coloured (Water/pencil)":
                        setMedPrice(200);
                        break;
                    case "Dot Painting":
                        setMedPrice(150);
                        break;
                    case "Acrylic Painting":
                        setMedPrice(200);
                        break;
                    default:
                        break;
                }
            }

        setUser({...user,[name]:value});
    }
    axios.defaults.withCredentials=true;

    const PostData =async(e)=>{
        e.preventDefault();
        setLoading(true);

        const{name,email,address,number,size,medium,face,orderImage}=user;
        const amount=Price+MedPrice+facePrice;
        try {
            //localhost:5000 ~ server side 
            const res = await axios.post(`${window.location.origin}/data`,
            {
                name,email,address,number,size,medium,face,orderImage,amount,
            },
            {
                
                headers:{'Accept':'application/json, text/plain, /','Content-Type':'multipart/form-data'}
            });
            if(res.status === 422 || !res.data)
            {
                setLoading(false);
                window.alert("Invalid Registration");
                console.log("Invalid Registration");
                window.scrollTo(0,0);
                setUser(({name:"",email:"",address:"",number:"",orderImage:"",size:"",medium:"",face:""}));
            }
            else{
                setLoading(false);
                window.alert("Order Successful \nYou received an email.");
                console.log("Order Successful");
                setUser(({name:"",email:"",address:"",number:"",orderImage:"",size:"",medium:"",face:""}));
                handleReset();
                window.scrollTo(0,0);
                
            }  
        } catch (error) {
            console.log('here is the error : ',error,error.response) ;   
        }
        
        
    }

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
    <div className='w-full h-fit'>
        <div className='w-full '>
            <motion.p variants={fadeIn('up','','','0.85')} className={`${styles.sectionHeadText} `} >
                Order.
            </motion.p>
            <motion.p variants={fadeIn('left','','0.5','0.85')} className={`${styles.sectionSubText} `} >
                Gift your loved ones 
            </motion.p>
            <div className='green-pink-gradient w-[90px]  h-10 opacity-90  rounded-2xl float-right'>
                <div className='flex justify-center items-center h-full gap-2'>
                    <img src={play} alt='img' className={`h-8 w-9 py-1 px-[7px] ${isPlay?' opacity-20':' opacity-90 bg-blue-100 cursor-pointer'} rounded-xl duration-500`} onClick={()=>handlePlay('b1')}/>
                    <img src={pause} alt='img' className={`h-8 w-9 py-1 px-[7px] ${isPlay?'opacity-90 bg-blue-100 cursor-pointer':'opacity-20 '} rounded-xl duration-500`} onClick={()=>handlePlay('b2')}/>
                </div>
                
            </div>
        </div>
        
        <div className='md:mt-12 w-full h-fit flex justify-center flex-col md:flex-row-reverse md:gap-8 '>
            <motion.div variants={fadeIn('','',1.4,1)} className='md:w-[58%] h-[300px] md:h-auto mt-10 md:mt-0 '>
                <ArtistCanvas mode={mode}/>
            </motion.div>
            
            <motion.div variants={fadeIn('left','tween',1.4,1)} className='mt-0 w-full md:w-1/2 bg-black-100 p-6 md:p-12  rounded-2xl '>
                <motion.p variants={fadeIn('','',0.8,0.75)} className=' text-[45px] font-bold text-center underline-offset-1' >
                    Details
                </motion.p>
                <form onSubmit={PostData} encType='multipart/form-data' className='mt-10 flex flex-col gap-6 md:gap-8 w-full '>
                    <label className='flex flex-col'>
                        <span className={`${styles.spanField}`}>Name :</span>
                        <input type='text' name='name' required='true' placeholder='enter your name' autoComplete='off' value={user.name} onChange={handleInputs} 
                        className={`${styles.inputfield} caret-current `}></input>
                    </label>
                    <label className='flex flex-col'>
                        <span className={`${styles.spanField}`}>Email :</span>
                        <input type='email' name='email' required='true' placeholder='enter your email' autoComplete='off' value={user.email} onChange={handleInputs} 
                        className={`${styles.inputfield} caret-current`}></input>
                    </label>
                    <label className='flex flex-col'>
                        <span className={`${styles.spanField}`}>Address :</span>
                        <input type='text' name='address' required='true' placeholder='enter your address' autoComplete='off' value={user.address} onChange={handleInputs} 
                        className={`${styles.inputfield} caret-current`}></input>
                    </label>
                    <label className='flex flex-col'>
                        <span className={`${styles.spanField}`}>Phone Number :</span>
                        <input type='text' name='number' required='true' placeholder='enter your number' autoComplete='off' value={user.number} onChange={handleInputs} 
                        className={`${styles.inputfield} caret-current`}></input>
                    </label>
                    <label className='flex flex-col'>
                        <span className={`${styles.spanField}`}>Select Desired Size :</span>
                        <select name='size' required='true'  value={user.size} onChange={handleInputs} 
                        className={`${styles.inputfield} cursor-pointer`}>
                          <option value="" selected="true"  hidden disabled>select a size</option>
                          <option value="A3">A3</option>
                          <option value="A4">A4</option>
                          <option value="A5">A5</option>
                          <option value="A6">A6</option>
                        </select>
                    </label>
                    <label className='flex flex-col'>
                        <span className={`${styles.spanField}`}>Select a Medium :</span>
                        <select name='medium' required='true'  value={user.medium} onChange={handleInputs} 
                        className={`${styles.inputfield} cursor-pointer`}>
                          <option value="" selected="true" disabled hidden>select a medium</option>
                          <option value="Graphite (B/W)">Graphite (B/W)</option>
                          <option value="Coloured (Water/pencil)">Coloured (Water/pencil)</option>
                          <option value="Dot Painting">Dot Painting</option>
                          <option value="Acrylic Painting">Acrylic Painting</option>
                        </select>
                    </label>
                    <label className='flex flex-col'>
                        <span className={`${styles.spanField}`}>Select Face Count :</span>
                        <select name='face' required='true'  value={user.face} onChange={handleInputs} 
                        className={`${styles.inputfield} cursor-pointer`}>
                          <option value="" selected="true" disabled hidden>select number of faces</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4+">4+</option>
                        </select>
                    </label>
                    <label className='flex flex-col md:flex-row md:items-center  '>
                        <span className={`${styles.spanField} pt-2.5 md:text-nowrap`}>Upload an Image :</span>
                        <input type='file' name='orderImage' ref={inputFile} required='true' onChange={handleInputs} 
                        className={`${styles.inputfield}  w-fit md:ml-3 caret-current`}></input>
                    </label>
                    <label className='flex flex-row'>
                        <span className={`${styles.spanField} pt-2.5 `}>Amount :</span>
                        <div 
                        className='bg-tertiary ml-3 py-2 px-6 w-[130px] text-white
                        outline-none border-none font-medium rounded-lg text-center text-[18px]'>
                            {(user.medium || user.size||user.face)?Price+MedPrice+facePrice:0}
                        </div>
                    </label>
                    <div className='w-full flex justify-center'>
                    <motion.button whileTap={{scale:0.85}} type='submit' className='bg-tertiary py-3 px-8 *:outline-none w-fit
                     text-white font-bold shadow-md shadow-primary rounded-xl flex ' >
                    {loading? 'Sending...':'Send'}
                    </motion.button>
                    </div>
                    
                
                </form>
                </motion.div>
            </div>
    
    </div>
    
  )
}

export default SectionWrapper(Buy,'buy');
