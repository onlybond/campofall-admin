import React from 'react'
export default function page() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-[#0a0a0a]'>
      <div className='flex justify-center bg-[#131313] h-4/5 w-4/5 py-10 rounded-[30px]'>
          <div className='hidden nd:block w-2/5 h-full rounded-[30px]'>
          <img src="/assets/images/sign-in/sign-in.png" alt="Not Found" className="h-full rounded-[30px]" />
          </div>
          <div className='flex flex-col justify-center items-center w-4/5 nd:w-2/5 h-full rounded-[30px] gap-5'>
            <div className="flex flex-col justify-center items-center">
              <div className='h-14'>
                <img src="/assets/images/sign-in/logo.png" alt="" className="h-full"/>
              </div>
              <p className="text-[12px] text-white">We are glad to see you back with us</p>
            </div>
            <form action="" className='w-4/5 flex flex-col gap-4'>
            <div>
            <label htmlFor="email" className="block text-white text-[16px]">Email Address</label>
            <div className='flex bg-white rounded-xl'>
              <input type="email" id="email" name="email" autoComplete="email" placeholder="admin@gmail.com"
                className=" w-full h-[40px] px-[20px] text-[16px] rounded-l-xl focus:outline-none focus:ring-0 focus:border-none" />
              <div className='w-1/6 flex justify-center items-center bg-[#F37121] rounded-xl'><img src="/assets/images/sign-in/mail.png" alt="mail" /></div>
            </div>
            </div>
            <div>
            <label htmlFor="password" className="block text-white text-[16px]">Password</label>
            <input type="password" id="password" name="password" placeholder="********"
                className=" w-full h-[40px] px-[20px] text-[16px] rounded-xl focus:outline-none focus:ring-0 focus:border-none" />
            </div>
            <button type='submit' className='w-full h-[40px] bg-[#F37121] text-[16px] text-white rounded-lg mt-3'>Submit</button>
          </form>
          </div>
      </div>
    </div>
  )
}