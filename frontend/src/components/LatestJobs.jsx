import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const  LatestJobs = () => {
  const {allJobs} = useSelector(store => store.job)

  return (
    <div className='max-w-7xl mx-auto my-20'>

      <h1 className='text-4xl font-bold text-center'><span className='text-[#f83002]'>Latest & Top</span> Job Openings</h1>

      <div className='grid grid-cols-3 gap-4 my-10'>
      {
        allJobs.length === 0 ? <span className='text-xl font-bold w-full mx-auto mt-16'>No Job Available</span> : allJobs?.slice(0, 6).map((job) => (
          <LatestJobCards key={job?._id} job={job}/>
        ))
      }
      </div>


    </div>
  )
}

export default LatestJobs