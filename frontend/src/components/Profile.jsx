import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobsTable from './AppliedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'


const Profile = () => {
    useGetAppliedJobs();

    const {user} = useSelector(store => store.auth)

    const [open, setOpen] = useState(false);

    const shortBio = (bio) => {
        if(bio.length < 120) return bio;
        else return bio.substring(0, 120) + "..."
    }

  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto border border-gray-100 rounded-2xl my-5 p-8'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="Profile"/>
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                        <p>{shortBio(user?.profile?.bio)}</p>
                    </div>
                </div>
                <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen/></Button> 
            </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 my-2'>
                    <Mail/>
                    <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <Contact/>
                    <span>{user?.phoneNumber}</span>
                </div>
            </div>
            <div className='mt-10'>
                <h1 className="text-md font-bold">Skills</h1>
                <div className='flex flex-wrap gap-3 items-center my-4'>
                {
                    user?.profile?.skills.length !== 0 ? (
                        user?.profile?.skills.map((item, index) => (
                            <Badge className={"text-sm text-center hover:scale-110 transition-all duration-200"} variant={"outline"} key={index}>
                                {item}
                            </Badge>
                        ))
                    ) 
                    : (
                        <p className='text-sm text-gray-500 font-medium'>No Skills to show.</p>
                    )
                }
                </div>
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label className="text-md font-bold">Resume</Label>
                {
                    user?.profile?.resume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 hover:underline w-full'>{user?.profile?.resumeOriginalName}</a>
                    : (
                        <p className='text-sm text-gray-500 font-medium'>Not Uploaded</p>
                    )
                }
            </div>
        </div>
        <div className='max-w-4xl mx-auto rounded-2xl'>
            <h2 className='font-bold text-lg my-5'>Applied Jobs</h2>
            <AppliedJobsTable/>
        </div>

        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile