import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({open, setOpen}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    });

    const changeEventHandler = (e) =>{
        setInput({...input, [e.target.name]: e.target.value});
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if(input.file){
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            if(res.data.success){
                //update the user in the store
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        setOpen(false);
        setLoading(false);
        console.log(input);
    }

  return (
    <div>

        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                value={input.fullName}
                                onChange={changeEventHandler}
                                name="fullName"
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email Address</Label>
                            <Input
                                type="email"
                                id="email"
                                onChange={changeEventHandler}
                                value={input.email}
                                name="email"
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="phoneNumber" className="text-right">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                onChange={changeEventHandler}
                                name="phoneNumber"
                                value={input.phoneNumber}
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input
                                id="skills"
                                onChange={changeEventHandler}
                                name="skills"
                                value={input.skills}
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input
                                id="bio"
                                onChange={changeEventHandler}
                                value={input.bio}
                                name="bio"
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input
                                type="file"
                                id="file"
                                onChange={fileChangeHandler}
                                name="file"
                                accept="application/pdf"
                                className="col-span-3"
                            />
                        </div>
                        
                    </div>
                    <DialogFooter>
                        {
                            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>
                            : <Button type="submit" className="w-full my-4">Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default UpdateProfileDialog