"use client"

import RegisterForm from '@/components/RegisterForm';
import Welcome from '@/components/Welcome'
import React from 'react'

const RegisterPage = () => {
  const [step, setStep] = React.useState(1);
  return (
    <div>
        {step===1 ? <Welcome nextStep={setStep}/>:<RegisterForm prevtStep={setStep}/>}
    </div>
  )
}

export default RegisterPage