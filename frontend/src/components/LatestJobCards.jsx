import React from 'react'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {

  const navigate = useNavigate();


  const shortDesc = (description) => {
    if(description?.length < 110) return description;
    else return description.substring(0, 105) + "..."
  }

  return (
    <div onClick={() => navigate(`/description/${job?._id}`)} className='p-5 rounded-lg shadow-lg bg-white border border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300'>

        <div>
            <div className='flex items-center gap-x-3'>
              <Avatar>
                <AvatarImage src={job?.company?.logo}/>
              </Avatar>
              <div>
                <h1 className='font-bold text-md'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500 -mt-1'>{job?.location}</p>
              </div>
            </div>
            
        </div>
        <div className='mt-5'>
            <h1 className='font-bold text-lg'>{job?.title}</h1>
            <p className='text-sm text-gray-500 mt-2'>{shortDesc(job?.description)}</p>
        </div>
        <div className='flex gap-2 my-4 items-center'>
            <Badge className={'text-blue-700 text-sm'} variant={"ghost"}>{job?.position} Positions</Badge>
            <Badge className={'text-yellow-700 text-sm'} variant={"ghost"}>{job?.jobType}</Badge>
            <Badge className={'text-red-700 text-sm'} variant={"ghost"}>{job?.salary} LPA</Badge>
        </div>

    </div>
  )
}

export default LatestJobCards