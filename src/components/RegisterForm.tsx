
import { ArrowLeft,  EyeIcon,  EyeOff,  Leaf, Loader2, Lock, LogIn, Mail, User } from 'lucide-react'

import React from 'react'
import { motion } from "motion/react"
import googleImage from "@/assets/googleImage.png"
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
type propType={
  prevtStep:(s:number)=>void
}


const RegisterForm = ({prevtStep}:propType) => {
  const [name,setName]=React.useState("")
  const [email,setEmail]=React.useState("")
  const [password,setPassword]=React.useState("")
  const[showPassword,setShowPassword]=React.useState(false)
  const [loading,setLoading]=React.useState(false)
  const router=useRouter();
  const handleRegister= async(e:React.FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    // Handle registration logic here
    try {
      const result= await axios.post('/api/auth/register',{
        name,
        email,
        password
      })
     router.push("/login");
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center bg-white min-h-screen px-6 py-12 relative'>
       <div className='absolute top-6 left-6 flex items-center justify-center gap-2 cursor-pointer text-green-600 hover:text-green-800 transition-colors'
       onClick={()=>prevtStep(1)}>
         <ArrowLeft className='w-6 h-6 text-green-600  cursor-pointer'/>
        <span className='font-medium'>Back</span>
       </div>
       <motion.h1 
       className='text-3xl font-bold mb-4 text-center text-green-600'
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, ease: "easeOut" }}>

        Create an account
       </motion.h1>
       <p className='text-md flex text-gray-600 '>Join PrinceCart Today <Leaf className='w-5 h-5 text-green-600'/></p>
       <motion.form 
        onSubmit={handleRegister}
       initial={{ opacity: 0, }}
       animate={{ opacity: 1,  }}
       transition={{ duration: 0.5, ease: "easeOut" }}
       className='w-full max-w-md mt-6 flex flex-col gap-4'>
       <div className='relative ' >
        <User className='absolute top-3 left-3 w-5 h-5 text-green-600'/>
        <input type="text" placeholder='Your Name' className='w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-600'
        onChange={(e)=>setName(e.target.value)}
        value={name}
        />
       </div>
       <div className='relative ' >
        <Mail className='absolute top-3 left-3 w-5 h-5 text-green-600'/>
        <input type="text" placeholder='Your Email Address' className='w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-600'
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        />
       </div>
       <div className='relative ' >
        <Lock className='absolute top-3 left-3 w-5 h-5 text-green-600'/>
        <input type={showPassword ? "text" : "password"} placeholder='Your Password' className='w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-600'
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        />
        {
          showPassword ?<EyeOff className='absolute top-3 right-3 w-5 h-5 text-green-600 cursor-pointer' onClick={()=>setShowPassword(!showPassword)}/>:<EyeIcon className='absolute top-3 right-3 w-5 h-5 text-green-600 cursor-pointer' onClick={()=>setShowPassword(!showPassword)}/>
        }
       </div>
       {
        (()=>{
          const isFormValid=name.trim()!=="" && email.trim()!=="" && password.trim()!==""
          return <button
          type='submit'
         disabled={!isFormValid || loading}
          className={`inline-flex items-center justify-center w-full py-2 px-4 rounded-md text-white font-semibold ${isFormValid ? 'bg-green-600 hover:bg-green-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed i'} transition-colors`}
          >
           {loading ? <Loader2 className='w-5 h-5 animate-spin  text-white'/> : 'Register'}
          </button>
        })()
       }
       <div className='flex items-center justify-center gap-2 text-gray-600'>
        <span className='flex-1 h-px bg-gray-300'></span>
        OR
        <span className='flex-1 h-px bg-gray-300'></span>
       </div>

       <div className='w-full py-2 px-4 rounded-md border border-gray-300 flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition-colors cursor-pointer ' onClick={()=>signIn("google",{callbackUrl:'/'})}>
        <Image src={googleImage} alt="Google" width={20} height={20}/>
        Continue with Google
       </div>
        
       </motion.form>
       <p className='text-sm text-gray-600 flex mt-6 text-center gap-1'>Already have an account? <LogIn className='w-5 h-5 text-green-600' />
       <span className='text-gray-600 cursor-pointer hover:text-green-600' onClick={()=>router.push("/login")}>Sign in</span>
       </p>
    </div>
    )
}

export default RegisterForm 