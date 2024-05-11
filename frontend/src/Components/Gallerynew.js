import React from 'react'
import { useState,useContext,useEffect} from 'react';
import { AppContext } from '../context/productcontext';

import { SectionWrapper } from '../hoc';
import { motion,useAnimation } from 'framer-motion';
import { fadeIn,flip } from '../assets/motion';
import { styles } from '../style';
import { category } from '../constants';
import { useInView } from 'react-intersection-observer';



const GalleryCard=({data})=>{
  const [detailShow,setDetailShow]=useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
    else
      controls.start("hidden")
    
  }, [controls, inView]);
  
  function pop()
    {
      setDetailShow(!detailShow);
    }
  return(
    <>
      <div className=' w-[320px] sm:w-[280px] md:w-[340px] mx-auto relative '>
      <motion.div 
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeIn('','spring',0.05,1)}
      className={` w-full green-pink-gradient p-[2px] rounded-[20px] shadow-card `}>
        <motion.div
      
        initial='initial1'
        variants={flip(1.1)}
        animate={detailShow?'rotate_back':'rotate_front'}
        options={{max:45,
        scale:1,
        speed:450
        }}
        className={`bg-tertiary rounded-[20px] 
          py-5 w-[98.5%] h-[390px] flex justify-evenly items-center flex-col absolute  ` }>
          <img src={data.img1} alt='' className='px-6 h-[290px] object-contain'/>
          <button className='mt-auto green-pink-gradient 
              *:outline-none w-[111px] h-[41px]
           text-white text-[17px] font-bold cursor-pointer shadow-md shadow-primary rounded-[8px] bottom-3 xs:mb-0 z-20' 
            onClick={()=>pop()}> 
            Details
          </button>
        </motion.div>
        <motion.div
        initial='initial2'
        variants={flip(1.1)}
        animate={detailShow?'rotate_front':'rotate_back'}
        options={{max:45,
        scale:1,
        speed:450
        }}
        className={`bg-tertiary rounded-[20px] }
          py-5 px-4 h-[390px] flex justify-evenly items-center flex-col `}>
          <div className='mt-2 w-full py-1 violet-gradient  text-center rounded-t-[11px]'>
          <p className=' text-[24px] font-bold  '>Details :</p>
          </div>
            <div className="mt-7 flex flex-col gap-1">
              <div className='flex gap-2 items-center'>
                <p className=' font-semibold text-[18px] font-mono'>Title : </p>
                <p className='text-secondary '>{(data.category!=='Commissioned')?(data.name):("Commissioned Work")}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <p className=' font-semibold text-[18px] font-mono'>Medium Used : </p>
                <p className='text-secondary '>{data.medium} </p>
              </div>
              <div className='flex gap-2 items-center'>
                <p className=' font-semibold text-[18px] font-mono'>Category :  </p>
                <p className='text-secondary '>{data.category}</p>
              </div>
              
              <div className='flex gap-2 items-center'>
              {(data.category==='Commissioned')?
                (<p className=' font-semibold text-[18px] font-mono'>Date of Order :  </p>):
                (<p className=' font-semibold text-[18px] font-mono'>Date of Completion : </p>)}
                <p className='text-secondary '>{data.date}</p>
              </div>
              
              <div className='flex gap-2 items-center'>
                <p className=' font-semibold text-[18px] font-mono'>Duration :  </p>
                <p className='text-secondary '>{data.duration}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <p className=' font-semibold text-[18px] font-mono'>Size : </p>
                <p className='text-secondary '>{data.size}</p>
              </div>
              {/*{(data.sold==="NA")?(<p className=' text-red-500'>Not for Sale</p>):((data.sold==='No')?(<button>ORDER NOW</button>):(<p>Sold</p>))}*/}
            </div>
            <button className='mt-auto green-pink-gradient 
             w-[111px] h-[41px] *:outline-none 
           text-white text-[17px] font-bold shadow-md shadow-primary rounded-[8px] bottom-3 xs:mb-0 z-20' 
            onClick={()=>pop()}> 
            Artwork
          </button>
          
        </motion.div>    
      </motion.div>
    </div>
    
    </>
  )
}



const Gallerynew=()=> {
    const { state,dispatch } = useContext(AppContext);
    
    const handleClick=()=>{
      dispatch({type:"Set_Click"})
    }
    const filterItem=(piccat)=>{
        dispatch({type:"Filter_Category",payload:piccat})
    }
    function goPrevPage(){
        if (state.currentPage!==1)
            dispatch({type:"Page_Change",payload:-1})
       
      }
    function goNextPage(){
        if (state.currentPage!==state.npage)
          dispatch({type:"Page_Change",payload:1})
        
        
            
           
        
      }
    function changeCurrentPage(currpage){
        
        dispatch({type:"Page_Jump",payload:currpage})
      }
   

    
    return (
        <>
          <motion.div  className="w-full text-white ">
              
              <motion.p variants={fadeIn('up','','','0.9')} className={`${styles.sectionHeadText}`} >
                Gallery.
              </motion.p>
              <motion.p variants={fadeIn('left','spring','0.7','1.1')} className={`${styles.sectionSubText} -mt-1`} >
                take a look at my recent artworks
              </motion.p>
          
            <motion.div variants={fadeIn('','','1.1','1.3')} className="  mt-4 font-bold text-[24px] flex gap-4 items-center justify-center cursor-default  md:mt-0">
              <h3>Search by Category</h3>
              <i className={state.click ? 'fa-solid fa-circle-xmark cursor-pointer' : 'fa-solid fa-circle-chevron-down cursor-pointer'} onClick={handleClick}></i>
            </motion.div>
            <div className={state.click ? "block" :" hidden"}>
              <div className="mt-3 flex flex-row  gap-4 text-[18px] justify-center items-center  ">
                {category.map((cat)=>(
                  <button className='w-fit px-3 py-1 rounded-md bg-tertiary shadow-md' onClick={() => filterItem(cat)}>{cat}</button>
                ))}
                
              </div> 
            </div> 
            <motion.p variants={fadeIn('up','','1.0','1.1')} className={`${styles.sectionSubText} flex justify-center mt-[38px] cursor-default` }>Showing results for : <span className='ml-2 -mt-1 font-bold sm:text-[22px] text-[18px]  text-white'> {state.category}</span> </motion.p>  
          </motion.div>

          <div className="mt-10 flex flex-wrap sm:gap-9 h-auto gap-7">    
            { 
              state.data1.slice(state.firstindex,state.lastindex).map((elem1,index) => (
                <GalleryCard key={elem1.uid} data={elem1}/>
              )
            )}
            
            
                  {/* const { img1, name, desc,category,price,date,sold } = elem1;
                  return (
                    <>
                    <div className="col-lg-4 col-md-6 col-sm-6 box">
                      <div className="box-content" onClick={()=>pop(elem1)} >
                          <img
                            class="card-img-top"
                            src={img1}
                            alt="..."
                          ></img>
                        <div className="card-body">
                          <div className="card-text">
                            <button className='card-button' onClick={()=>pop(elem1)} >{type(category)}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Popup trigger={poptrigger} setTrigger={setpoptrigger} data={imgdata}></Popup>
                    </>
                    
                  ); */}
            
            </div>
            <div className='w-full h-fit p-6 flex relative justify-center gap-4 '>
              <a href='#gallery' className={`w-fit px-4 py-2 rounded-xl text-[18px] font-semibold bg-tertiary absolute left-0 border-2 ${state.currentPage===1?'hidden':''} `} onClick={goPrevPage}>
                &lt;
              </a>
              {
                state.numbers.map((n,i)=>(
                  <a href='#gallery' className={`w-fit px-4 py-2 rounded-xl text-[18px] font-semibold bg-tertiary flex  cursor-pointer ${state.currentPage===n?'border-2':''}` } key={i} onClick={()=>changeCurrentPage(n)}>{n}</a>
                ))
              }
              <a href='#gallery' className={`w-fit px-4 py-2 rounded-xl text-[18px] font-semibold bg-tertiary absolute right-0 border-2 ${state.currentPage===state.npage?'hidden':''} `} onClick={goNextPage} >
                &gt;
              </a>
            </div>
        
        </>
      )
    }
export default SectionWrapper(Gallerynew,'gallery');
