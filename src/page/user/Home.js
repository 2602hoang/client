import React, { useEffect, useRef } from 'react'
import Layout from '../layout/Layout.js'
import 'keen-slider/keen-slider.min.css';
import emailjs from '@emailjs/browser';
import { notification } from 'antd';

function Home() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    const email = form.current.email.value.trim();
    if (!validateEmail(email)) {
      notification.error({
        message: 'Lỗi định dạng email',
        description: 'Vui lòng nhập định dạng email hợp lệ',
      })
      return;
    }

    emailjs.sendForm('service_aw59fbd', 'template_fyuxrdd', form.current, {
      publicKey: 'h5_X9EnatlgBbFUa7',
    })
      .then(
        () => {
          // console.log('SUCCESS!');
          notification.success({
            message: 'Yeah! Gửi thành công!',
            description: email + " "+ 'Đã được gửi đến chúng tôi. Cảm ơn bạn! '
          })
          // alert(`${email} +1 Subscribe. Successful!!!`)
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
    <Layout>
      <div className=' min-h-screen overflow-hidden w-full '>

            <section className="bg-gray-900 text-white">
              <div    className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div  data-aos="zoom-in-up" className="mx-auto max-w-3xl text-center">
                  <h1
                    className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                  >
                    Chào mừng quý khách đến với cửa hàng sách của chúng tôi!

                    <span className="sm:block">  Hãy để chúng tôi giúp bạn khám phá thế giới tri thức qua từng trang sách.</span>
                  </h1>

                  <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                    "Cuốn Sách là cánh cửa mở ra thế giới vô tắn của tri thức và sự tưởng tượng"
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <a
                      className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                      href="/product"
                    >
                      Xem sách
                    </a>

                    <a
                      className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                      href="#lienhe"
                    >
                      Liên Hệ
                    </a>
                  </div>
                </div>
              </div>
            </section>


            <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div data-aos="fade-right" className="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
              Đọc sách không chỉ là một hoạt động giải trí mà còn là một phương tiện mạnh mẽ để trau dồi kiến thức và kỹ năng sống.
              </h2>

              {/* <p className="hidden text-white/90 sm:mt-4 sm:block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam
                sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet
                volutpat quisque ut interdum tincidunt duis.
              </p> */}

              <div className="mt-4 md:mt-8">
                <a
                  href="/product"
                  className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Hãy tìm kiếm cuốn sách phù hợp với bạn
                </a>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />

            <img
              alt=""
              src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />
          </div>
        </div>
      </div>
            </section>




             <section className="bg-gray-50">
                <div data-aos="flip-up" className="p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-lg text-center">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                 Hãy để lại email nếu bạn muốn biết thêm thông tin gì về chúng tôi
                </h2>

                <p className="hidden text-gray-500 sm:mt-4 sm:block">
                  Chúng tôi sẽ liên hệ với bạn sớm nhất! Cảm ơn bạn đã quan tâm.
                </p>
              </div>
             
    

        

              <div className="mx-auto mt-8 max-w-xl">
                <form ref={form} onSubmit={sendEmail} className="sm:flex sm:gap-4">
                  <div className="sm:flex-1">
                    <label htmlFor="email" 
                    
                    className="sr-only">Email</label>

                    <input
                      type="text"
                      required  
                     
                      name="email"
                      placeholder="Email address"
                      className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-rose-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
                  >
                    <span className="text-sm font-medium"> Gửi </span>

                    <svg
                      className="size-5 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </form>
              </div>
          </div>
        </section>









      </div>
    </Layout>
  )
}

export default Home