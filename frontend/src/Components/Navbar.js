import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {menu,close} from '../assets';
import { navLinks } from '../constants';
import { styles } from '../style';
function Navbar() {
  const [click,setClick]=useState(false);
  const [button, setButton] = useState(true);
  const[active,setActive]=useState('');
  const[toggle,setToggle]=useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <nav className={`${styles.paddingX} w-full flex flex-col items-center py-5 fixed top-0 z-20 bg-primary caret-transparent`}>
      <div className='w-full flex justify-between items-center  '>
        <Link to='/'
          onClick={()=>{
            setActive("");
          window.scrollTo(0,0);}}
          className='flex items-center gap-2 sm:gap-3 hover:no-underline'>
          <img src='./img/icon.png' alt='logo' className=' h-[42px] sm:h-[50px] object-contain'/>
          <div className='w-[2px] sm:w-1 h-11 sm:h-12 bg-white mx-1 sm:mx-2'/>
          <p className='text-white text-[24px] font-bold cursor-pointer flex '>Awesome Arts</p>
          
        </Link>
        
        <ul className='list-none hidden sm:flex gap-9 items-center'>
        {navLinks.map((link)=>(
          <li 
            key={link.id} 
            className={`${active===link.title?"text-white":"text-secondary"} hover:text-white text-[22px]   font-medium cursor-pointer flex `}
            onClick={()=>{
              setActive(link.title);
              setToggle(!toggle);}}>
            <a href={`#${link.id}` } className=' hover:text-white hover:no-underline' >{link.title}</a>
          </li>
        ))}
        </ul>
        <div className="sm:hidden ">
          <img src={toggle?close:menu}
          alt='menu'
          className='w-[28px] h-[28px] object-contain cursor-pointer'
          onClick={()=>setToggle(!toggle)}></img>
          <div className={`${!toggle?'hidden':'flex'} p-6 bg-black-100 border-4 border-secondary border-violetgradient  absolute top-24 right-0 mx-3 my-2 min-w-[160px] z-10 rounded-2xl`}>
            <ul className="list-none flex justify-end items-start flex-col gap-4">
            { navLinks.map((link)=>(
                <li
                key={link.id}
                className={`${
                  active===link.title ?"text-white":"text-secondary"}  hover:text-white
                 font-poppins font-medium cursor-pointer text-[21px] `}
                  onClick={()=>{
                  setToggle(!toggle);
                  setActive(link.title);
                  }}>
                  <a href={`#${link.id}`} className=' hover:text-white hover:no-underline'>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
      <div className='w-full z-50 absolute bottom-0'>
        <div className='absolute left-0 h-1.5 w-[60%]  violet-gradient bg-white'/>
        <div className='absolute right-0 h-1.5 w-[60%]  violet-gradient-rev bg-white'/>
      </div>
    </nav>
  );
}

export default Navbar ;
