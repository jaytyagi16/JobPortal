import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'


const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);

    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {singleCompany} = useSelector(store => store.company);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    })

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if(input.file){
            formData.append("file", input.file);
        }
        console.log("form data: ", formData); 
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            location: singleCompany?.location || "",
            website: singleCompany?.website || "",
            file: singleCompany?.file || null
        })
    },[singleCompany]);

  return (
    <div>
        <Navbar/>
        <div className='max-w-xl mx-auto my-10'>
            <form onSubmit={submitHandler}>
                <div className='flex items-center gap-5 my-8'>
                    <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2">
                        <ArrowLeft/>
                        <span>Back</span>
                    </Button>
                    <h2 className='font-bold text-xl'>Company Setup</h2>
                </div>
                <div className='grid grid-cols-2 gap-4 items-center'>
                    <div>
                        <Label className="">Company Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label className="">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label className="">Website</Label>
                        <Input
                            type="text"
                            name="website"
                            value={input.website}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label className="">Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label className="">Logo</Label>
                        <Input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                        />
                    </div>
                </div>
                {
                    loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>
                    : <Button type="submit" className="w-full my-4">Update</Button>
                }
            </form>
        </div>
    </div>
  )
}

export default CompanySetup