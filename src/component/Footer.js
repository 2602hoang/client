
import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { FloatButton } from 'antd';
function Footer() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    const email = form.current.email.value.trim();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    emailjs.sendForm('service_aw59fbd', 'template_fyuxrdd', form.current, {
        publicKey: 'h5_X9EnatlgBbFUa7',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert(`${email} +1 Subscribe. Successful!!!`)
          form.current.email.value = '';
         
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  const validateEmail = (email) => {
    // Basic regex for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };



  return (
    <div className='flex h-auto flex-col w-full bg-[#539ba9]  justify-center items-center'>
     
    <div className='flex font-mono w-full h-auto text-white md:px-20  flex-col md:flex-row justify-start items-start space-y-3'>
          {/* phần 1 */}
         <div className='flex justify-start items-start w-full mx-2 md:w-1/3 flex-col'>
         <h1 className='font-serif  text-3xl mt-2'>H 3.</h1>
         <div className='flex text-start flex-col'>
         <p>
          Hãy Trải Nghiệm mọi tiện ích tại đây<br/>
          Chúng tôi luôn lắng nghe phát triển<br/>
           để tăng trải nghiệm cho khách hàng 
         </p>
         <br/>
         
         <p>Liên hệ với chúng tôi</p>
         <a className='flex flex-row gap-5 mt-4'>
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M14 9.3v2.9h2.6c.2 0 .3.2.3.4l-.4 1.9c0 .1-.2.2-.3.2H14V22h-3v-7.2H9.3c-.2 0-.3-.1-.3-.3v-1.9c0-.2.1-.3.3-.3H11V9c0-1.7 1.3-3 3-3h2.7c.2 0 .3.1.3.3v2.4c0 .2-.1.3-.3.3h-2.4c-.2 0-.3.1-.3.3Z" stroke="#d9e3f0" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"></path><path d="M15 22H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h6c5 0 7 2 7 7v6c0 5-2 7-7 7Z" stroke="#d9e3f0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M17 20H7c-3 0-5-2-5-5V9c0-3 2-5 5-5h10c3 0 5 2 5 5v6c0 3-2 5-5 5Z" stroke="#d9e3f0" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="m11.4 9.5 2.5 1.5c.9.6.9 1.5 0 2.1l-2.5 1.5c-1 .6-1.8.1-1.8-1v-3c0-1.3.8-1.7 1.8-1.1Z" stroke="#d9e3f0" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path clip-rule="evenodd" d="M4.5 2h17v12l-5 5h-5l-2 3h-3v-3h-4V5l2-3Z" stroke="#d9e3f0" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 7H9v6h2V7ZM16 7h-2v6h2V7Z" stroke="#d9e3f0" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M21.6 10.2h-9.4v3.7h5.5c-.1.9-.7 2.3-2 3.2-.8.6-2 1-3.5 1-2.6 0-4.9-1.7-5.7-4.2-.2-.6-.3-1.3-.3-2s.1-1.4.3-2c.1-.2.1-.4.2-.5.9-2.1 3-3.6 5.5-3.6 1.9 0 3.1.8 3.9 1.5l2.8-2.8C17.2 3 14.9 2 12.2 2 8.3 2 4.9 4.2 3.3 7.5c-.7 1.4-1.1 2.9-1.1 4.5s.4 3.1 1.1 4.5c1.6 3.3 5 5.5 8.9 5.5 2.7 0 5-.9 6.6-2.4 1.9-1.7 3-4.3 3-7.4 0-.8-.1-1.4-.2-2Z" stroke="#d9e3f0" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
         </a>
       
         </div>
         </div>
          {/* phần 2 */}
         <div className='flex justify-start items-start w-full md:w-1/3 mx-2 flex-wrap  flex-col'>
      
         <h1 className='font-serif  text-3xl'>ĐỊA CHỈ</h1>
         
         <div className='flex w-11/12 mt-7 space-y-5  flex-col justify-start items-start text-start'>
         <a className='flex flex-wrap   '>
         <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" 
         viewBox="0 0 24 24" fill="none"><path d="M12 13.43a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z"
          stroke="#d9e3f0" stroke-width="1.5">
            </path><path d="M3.62 8.49c1.97-8.66 14.8-8.65
             16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 
             0 0 1-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05Z" stroke="#d9e3f0" stroke-width="1.5"></path></svg>
         <span className='underline '>CN 1:</span> xx đường Nguyễn huệ, quận 1, tp. Hồ Chí Minh
         </a>
         <a className='flex flex-wrap '>
         <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" 
         viewBox="0 0 24 24" fill="none"><path d="M12 13.43a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z"
          stroke="#d9e3f0" stroke-width="1.5">
            </path><path d="M3.62 8.49c1.97-8.66 14.8-8.65
             16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 
             0 0 1-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05Z" stroke="#d9e3f0" stroke-width="1.5"></path></svg>
           <span className='underline'>CN 2:</span>xx đường Hai Bà Trưng, quận Ba Đình, tp. Hà Nội
         </a>
         </div>
         
         
       
         {/* <div>
          <h1 className='font-serif  text-3xl  mt-2'>TRANG</h1>
          <h1 className='flex md:flex-row  space-x-2 '><a className='border-b-2'>Trang Chủ</a><a className='border-b-2'>Nước uống</a> 
          <a className='border-b-2'>Món ăn</a> <a className='border-b-2'>Đơn Hàng</a> <a className='border-b-2'>Liên Hệ</a></h1>
         </div> */}
         </div>

          {/* phần 3 */}
         <div className='flex justify-start items-start w-full md:w-1/3 mx-2 md:ml-10
         flex-wrap  flex-col'>
         <h1 className='font-serif  text-3xl '>LIÊN HỆ</h1>
         <div className='flex text-start flex-col  '>
         <form
        ref={form} onSubmit={sendEmail}
          class="text-neutral-800
          
          md:py-6 overflow-hidden relative justify-center 
          items-center  flex flex-col md:w-full w-[95%] h-44 
          border border-neutral-500 rounded-lg bg-neutral-50 p-3 md:px-6"
        >
          <div
            class="before:absolute before:w-32
             before:h-20 before:right-2 before:bg-rose-300
              before:-z-10 before:rounded-full
             before:blur-xl before:-top-12 z-10 after:absolute
              after:w-24 after:h-24 after:bg-purple-300
              after:-z-10 after:rounded-full after:blur after:-top-12 after:-right-6"
          >
            <span class="font-extrabold text-2xl text-violet-600"
            >Hãy để email của bạn lại...</span
            >
            <p class="text-neutral-700">
              Chúng tôi sẽ liên hệ với bạn sớm nhất !🤗🤗🤗
            </p>
          </div>
          <div class="flex gap-1">
            <div
              class="relative rounded-lg w-64 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg"
            >
              <input
                type="text"
                required  
                // ref={emailInputRef} 
                name="email"
                class="relative bg-transparent ring-0 outline-none border text-red-500 border-neutral-500 font-semibold placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                placeholder="Email..."
              />
            </div>
            <button className="bg-violet-500 text-neutral-50 md:p-2 p-0 rounded-lg hover:bg-violet-400" type="submit">
              Gửi
            </button>
          </div>
        </form>

        
          </div>
         </div>

    </div>
    <div className='flex justify-center items-center mt-5 border-t-2'>
    <p className="text-center text-base text-white">Copyright &copy; 2024 by Vu Hoang  
      <span>Dev</span> | All Rights Reserved</p>
      <FloatButton.BackTop style={{ height: '60px', width: '60px' }} tooltip={<b>Về Đầu Trang</b>} />
    </div>
    </div>
  )
}

export default Footer