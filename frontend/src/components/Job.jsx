import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunc = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;
        return Math.floor(timeDiff / (1000*60*60*24));
    }

    const shortDesc = (description) => {
        if(description?.length < 110) return description;
        else return description.substring(0, 105) + "..."
    }

  return (
    <div className='p-5 rounded-lg shadow-xl border border-gray-100 bg-white'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>{daysAgoFunc(job?.createdAt) === 0 ? "Today" : `${daysAgoFunc(job?.createdAt)} days ago`}</p>
            <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>
        </div>
    
        <div className='flex items-center gap-2 my-2'>
            <Button className="p-6" variant="outline" size="icon">
                <Avatar>
                    <AvatarImage src={job?.company?.logo}/>
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-500'>{shortDesc(job?.description)}</p>
        </div>
        <div className='flex gap-2 mt-4 items-center'>
            <Badge className={'text-blue-700 text-sm'} variant={"ghost"}>{job?.position} Positions</Badge>
            <Badge className={'text-yellow-700 text-sm'} variant={"ghost"}>{job?.jobType}</Badge>
            <Badge className={'text-red-700 text-sm'} variant={"ghost"}>{job?.salary} LPA</Badge>
        </div>
        <div className='mt-4 flex items-center justify-between'>
            <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
            <Button>Save for later</Button>
        </div>
    </div>
  )
}

export default Job