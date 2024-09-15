import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const JobDescription = () => {
    const {user} = useSelector(store => store.auth);
    const {singleJob} = useSelector(store => store.job);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials: true});
            console.log(res.data);
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob =  {...singleJob, applications: [...singleJob.applications, {applicant: user?.id}]};
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async() => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials: true});
                if(res.data.success){
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob();
    },[jobId, dispatch, user?._id])

  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                <div className='flex gap-2 mt-4 items-center'>
                    <Badge className={'text-blue-700 text-sm'} variant={"ghost"}>{singleJob?.position} Positions</Badge>
                    <Badge className={'text-yellow-700 text-sm'} variant={"ghost"}>{singleJob?.jobType}</Badge>
                    <Badge className={'text-red-700 text-sm'} variant={"ghost"}>{singleJob?.salary} LPA</Badge>
                </div>
            </div>
            <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${isApplied ? 'hover:bg-slate-900 cursor-not-allowed' : 'bg-red-700 hover:bg-red-600'}`}>
                {
                    isApplied ? "Already Applied" : "Apply Now"
                }
            </Button>
        </div>
        <h2 className='font-medium text-lg py-4 border-b-2 border-b-gray-300'>{singleJob?.description}</h2>
        <div className='my-5'>
            <h2 className='font-bold my-1'>Role: <span className='ml-4 font-normal text-gray-800'>{singleJob?.title}</span></h2>
            <h2 className='font-bold my-1'>Location: <span className='ml-4 font-normal text-gray-800'>{singleJob?.location}</span></h2>
            <h2 className='font-bold my-1'>Description: <span className='ml-4 font-normal text-gray-800'>{singleJob?.description}</span></h2>
            <h2 className='font-bold my-1'>Experience: <span className='ml-4 font-normal text-gray-800'>{singleJob?.experienceLevel} years</span></h2>
            <h2 className='font-bold my-1'>Total Applicants: <span className='ml-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h2>
            <h2 className='font-bold my-1'>Posted Date: <span className='ml-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h2>

           <Button onClick={() => navigate("/jobs")} className="flex items-center gap-2 mt-10">
            <ArrowLeft className='h-8'/>
            Back
           </Button>

        </div>
    </div>
  )
}

export default JobDescription