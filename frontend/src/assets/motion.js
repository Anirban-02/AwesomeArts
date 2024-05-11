export const textVariant = (delay) => {
    return {
      hidden: {
        y: -50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.25,
          delay: delay,
        },
      },
    };
  };
  
  export const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

  export const flip =(time)=> {
    return{
      initial1:{
        opacity:1,
        rotateY:0
      },
      rotate_back: { 
                opacity:0,
                rotateY:[0,110],
                transition: { 
                  repeat:0,
                  repeatType:"reverse",
                  duration:0.5,
                  ease:'easeOut',
                  delay:0 } },
      initial2:{
        
        opacity:0,
        rotateY:0
      },
      rotate_front: { 
                opacity:1,
                rotateY:[-110,0],
                transition: { 
                  repeat:0,
                  repeatType:"reverse",
                  duration:0.8,
                  ease:'easeIn',
                  delay:0 } },
      
    }
    
  };


  export const fadeIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
          
        },
      },
    };
  };
  
  export const zoomIn = (delay, duration) => {
    return {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "tween",
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
  
  export const slideIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
      },
      show: {
        x: 0,
        y: 0,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
  
  export const staggerContainer = (staggerChildren, delayChildren) => {
    return {
      hidden: {},
      show: {
        transition: {
          staggerChildren: staggerChildren,
          delayChildren: delayChildren || 0,
        },
      },
    };
  };