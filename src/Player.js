import React,{useState,useEffect} from 'react';
import useSound from "use-sound";
import {AiFillPlayCircle,AiFillPauseCircle} from 'react-icons/ai';
import {BiSkipNext,BiSkipPrevious} from 'react-icons/bi';
import so_high from './assets/image/So-High.jpg';
import So_High from './assets/music/So_High.mp3';
import {IconContext} from 'react-icons';
const Player = () => {
  const [isPlaying,SetIsPlaying]=useState(false);
  const [time,SetTime]=useState({
    min:'',
    sec:''
  })
  const [seconds,SetSeconds]=useState(0);
  const [currentTime,SetCurrentTime]=useState({
    min:'',
    sec:''
  })
  const [play,{pause,duration,sound}]=useSound(So_High);

  useEffect(()=>{
    if(duration){
      const sec=duration/1000;
      const min=Math.floor(sec/60);
      const secRemain=Math.floor(sec%60);
      SetTime({
        min,
        sec:secRemain
      })
    }
  
},[isPlaying])
  useEffect(()=>{
    const interval=setInterval(()=>{
      
      if(sound){
      SetSeconds(sound.seek([]));
      const min=Math.floor(sound.seek([])/60);
      const sec=Math.floor(sound.seek([])%60);
      SetCurrentTime({
        min,
        sec
      });
    }
    },1000);
  
    return ()=>clearInterval(interval);
  },[sound])
  const handlePlay=()=>{
    if(isPlaying){
         pause();
         SetIsPlaying(false);
    }
    else{
      play();
      SetIsPlaying(true);    
    }
  }
  return (
    <div className='component'>
        <h1>My-Music</h1>
        <h2>Playing Now</h2>
        <img src={so_high}></img>
        <div>
          <h3 className='title'> So High</h3>
          <p className='subtitle'> So High</p>
        </div>
        <div>
        <div className='time'>
          <p>{currentTime.min} : {currentTime.sec}</p>
          <p>{time.min} : {time.sec}</p>
        </div>
        <input 
          type='range'
          min="0"
          max={duration/1000}
          default="0"
          value={seconds}
          className='timeline'
          onChange={
            (e)=>{sound.seek([e.target.value]);
          }}
          >
        </input>
        </div>
        <div>
           <button className='playButton'>
             <IconContext.Provider value={{size:'3em',color:'#072B92'}}>
              <BiSkipPrevious/>
             </IconContext.Provider>
           </button>
           {
           isPlaying?
           (<button className='playButton'  onClick={handlePlay}>
             <IconContext.Provider value={{size:'3em',color:'#072B92'}}>
              <AiFillPauseCircle/>
             </IconContext.Provider>
           </button>):
           (<button className='playButton' onClick={handlePlay}>
           <IconContext.Provider value={{size:'3em',color:'#072B92'}}>
            <AiFillPlayCircle/>
           </IconContext.Provider>
         </button>)
           }
           <button className='playButton'>
             <IconContext.Provider value={{size:'3em',color:'#072B92'}}>
              <BiSkipNext/>
             </IconContext.Provider>
           </button>
        </div>

    </div>
  )
}

export default Player
