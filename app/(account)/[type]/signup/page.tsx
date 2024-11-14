"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Company, User } from "../../../../util/server";
import { accent, background } from '../../../../util/colors'
import Header from "../../../../components/Header";
import { RotatingShadow } from "../../../../components/RotatingShadow";

const SignupForm = () => {
    const [name, setName] = useState('')
    const [userName, setUserName] = useState({
        firstName: '',
        lastName: '',
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [router, { type }, params] = [useRouter(), useParams(), useSearchParams()];
    const isCompany = type === 'companies';
    const inputTailwind = 'rounded-[20px] border-x border-y border-white bg-slate-950 outline-none text-white p-[20px] text-xl'

    const submissionHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isCompany) {
            if (!await Company.register(name, email, password)) {
                alert('Failed to register');
                return;
            }
        } else if (!await User.register(userName.firstName, userName.lastName, email, password)) {
            alert('Failed to register');
            return;
        }
        
        if (params.get('zero')) 
            router.push(`/${type}/dashboard`);
        else 
            router.back();
    };

    return (
        <form 
            className={`w-[560px] flex flex-col gap-[20px] rounded-[40px] px-[40px]`}
            style={{
                height: isCompany ? 650 : 750,
            }}
            onSubmit={(e) => submissionHandler(e)}>

            <div className="flex flex-col flex-1 justify-center gap-[50px]">
                <span className='text-white text-7xl'>signup</span>

                {
                    isCompany ? (
                        <input 
                            className={inputTailwind}
                            type='text' 
                            placeholder='Enter company name' 
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    ) : (
                        <>
                            <input 
                                className={inputTailwind}
                                type='text' 
                                placeholder='Enter first name' 
                                value={userName.firstName}
                                onChange={(e) => setUserName({ ...userName, firstName: e.target.value })} />
                            <input 
                                className={inputTailwind}
                                type='text' 
                                placeholder='Enter last name' 
                                value={userName.lastName}
                                onChange={(e) => setUserName({ ...userName, lastName: e.target.value })} />
                        </>
                    )
                }
                <input 
                    className={inputTailwind}
                    type='text' 
                    placeholder='Enter company email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input 
                    className={inputTailwind}
                    type='password' 
                    placeholder='Enter password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />


                <input 
                    style={{
                        backgroundColor: accent
                    }} 
                    className={`hover:cursor-pointer text-white w-full rounded-[20px] text-3xl py-[20px]`}
                    type="submit" 
                    value="sign up" />
            </div>
        </form>
    )
}

export default function SignupPage() {
    return (
        <div className='flex flex-col w-screen h-screen'>
            <Header />
            <main className={`w-full flex-1 flex justify-center items-center`} style={{ backgroundColor: background }}>
                <RotatingShadow shadowBlur={50} shadowColor={accent} shadowSpread={-5} radius={12} borderRadius={40}>
                    <SignupForm />
                </RotatingShadow>
            </main>
        </div>
    );
}
