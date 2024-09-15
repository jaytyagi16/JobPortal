import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      searchJobHandler();
    }
  }

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
            <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium'>No. 1 Job Hunting Website</span>
            <h1 className='text-5xl font-bold leading-snug'>Search, Apply, & <br/>Get Your <span className='text-[#f83002]'>Dream Job</span></h1>
            <p>Your one-stop destination for finding your dream job or hiring the perfect candidate.</p>
            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto my-8'>
                <input 
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text" 
                placeholder='Find your dream jobs'
                className='outline-none border-none w-full'
                />
                <Button onClick={searchJobHandler} className="rounded-r-full">
                    <Search className='h-5 w-5'/>
                </Button>
            </div>
        </div>

    </div>
  )
}

export default HeroSection