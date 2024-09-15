import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Avatar, AvatarImage, } from "../ui/avatar"
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../ui/button"
import { LogOut, User2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import axios from "axios"
import { USER_API_ENDPOINT } from '@/utils/constant';
import { setUser } from "@/redux/authSlice"

const Navbar = () => {
    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const shortBio = (bio) => {
        if(bio.length < 30) return bio;
        else return bio.substring(0, 29) + "..."
    }

    const logoutHandler = async() => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`,{withCredentials: true});
            if(res.data.success){
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

  return (
    <div className='bg-white'>
       <div className='flex justify-between items-center mx-auto max-w-7xl h-16'>
            <div onClick={() => navigate("/")} className="cursor-pointer select-none" >
                <h1 className='text-2xl font-bold'>Job <span className='text-[#f83002]'>Portal</span></h1>
            </div>
            <div className="flex items-center gap-12">
                <ul className='flex font-medium items-center gap-5'>
                    {
                        user && user?.role === "recruiter" ? (
                            <>
                                <li className="hover:scale-105 transition-all duration-200"><Link to={"/admin/companies"}>Companies</Link></li>
                                <li className="hover:scale-105 transition-all duration-200"><Link to={"/admin/jobs"}>Jobs</Link></li> 
                            </>
                        ) : (
                            
                            <>
                                <li className="hover:scale-105 transition-all duration-200"><Link to={"/"}>Home</Link></li>
                                <li className="hover:scale-105 transition-all duration-200"><Link to={"/jobs"}>Jobs</Link></li>
                                <li className="hover:scale-105 transition-all duration-200"><Link to={"/browse"}>Browse</Link></li>
                            </>
                        )
                    }
                </ul>

                {
                    !user ? (
                        <div className="flex items-center gap-2">
                            <Link to={"/login"}><Button variant="outline">Login</Button></Link>
                            <Link to={"/signup"}><Button>Signup</Button></Link>
                        </div>
                    ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={user?.profile.profilePhoto} alt="profile" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div>
                                <div className="flex gap-4 space-y-1">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile.profilePhoto} alt="profile" />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">{user?.fullName}</h4>
                                        <p className="text-sm text-muted-foreground">{
                                            user.role === 'student' && shortBio(user?.profile?.bio)
                                        }</p>
                                    </div>
                                </div>

                                <div className="flex flex-col text-gray-400 mt-2">
                                    {
                                        user && user?.role === "student" && (
                                            <div className="w-fit flex items-center gap-2">
                                                <User2/>
                                                <Button variant="link"><Link to={"/profile"}>View Profile</Link></Button>
                                            </div>
                                        )
                                    }
                                    <div className="w-fit flex items-center gap-2">
                                        <LogOut/>
                                        <Button onClick={logoutHandler} variant="link">Log out</Button>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    )
                } 
            </div>
       </div>
    </div>
  )
}

export default Navbar