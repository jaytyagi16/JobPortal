import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, user} = useSelector(store => store.auth);

    const[input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file});
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if(input.file){
            formData.append("file", input.file);
        }
        console.log("form data: ", formData);
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers:{
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });
            if(res.data.success){
                navigate("/login")
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if(user){
            navigate("/");
        }
    })

  return (
    <div>
        <Navbar/>

        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-lg p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Signup</h1>
                <div className='my-2'>
                    <Label>Full Name</Label>
                    <Input
                        type="text"
                        placeholder="Enter full name"
                        value={input.fullName}
                        name="fullName"
                        onChange={changeEventHandler}
                    />
                </div>
                <div className='my-2'>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        placeholder="Enter email address"
                        value={input.email}
                        name="email"
                        onChange={changeEventHandler}
                    />
                </div>
                <div className='my-2'>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        placeholder="Enter password"
                        value={input.password}
                        name="password"
                        onChange={changeEventHandler}
                    />
                </div>
                <div className='my-2'>
                    <Label>Phone Number</Label>
                    <Input
                        type="text"
                        placeholder="Enter phone number"
                        value={input.phoneNumber}
                        name="phoneNumber"
                        onChange={changeEventHandler}
                    />
                </div>
                <div className='flex items-center justify-between my-4 gap-2'>
                    <RadioGroup className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                id="student"
                                type="radio"
                                name="role"
                                value="student"
                                className="cursor-pointer"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                            />
                            <Label htmlFor="student" className="cursor-pointer">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                id="recruiter"
                                type="radio"
                                name="role"
                                value="recruiter"
                                className="cursor-pointer"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                            />
                            <Label htmlFor="recruiter" className="cursor-pointer">Recruiter</Label>
                        </div>
                    </RadioGroup>
                    <div className='flex items-center gap-2'>
                        <Label>Profile</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            className="cursor-pointer"
                            onChange={changeFileHandler}
                        />
                    </div>
                </div>
                {
                    loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>
                    : <Button type="submit" className="w-full my-4">Submit</Button>
                }
                <div>
                    <span className='mx-auto text-sm'>Already have an accout? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Signup