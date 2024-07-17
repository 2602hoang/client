
import Layout from '../layout/Layout'
import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import axios from 'axios';
// import Aos from 'aos';
import { CloseCircleOutlined, SendOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

function About() {
  const label = 'Label';

  // Define min and max values or retrieve them from somewhere
  const min = 10;
  const max = 10;

  const validateMessages = {
      required: ` is required`,
      types: {
          email: ` is not a valid email`,
          number: ` is not a valid number`,
      },
      number: {
          range: `${label} 'must be between' ${min} 'and' ${max}`,
      },
  };
  // useEffect(() => {
  //     Aos.init({
  //         duration: 3000, // Adjust the duration to your preference
  //     });
  // }, []);
  const [form] = Form.useForm();
  const onFinish = async (values, e) => {
      if (e) e.preventDefault();
      try {
          const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSdqmTV_KURUpUDL5qcoZfTb_FIzcI2LdMP3NiNRj-qXkljDoQ/formResponse"; // Google Form URL
          const formData = new FormData();

          // Append form values to formData
          formData.append("entry.550024018", values.name);
          formData.append("entry.1516466819", values.phone);
          formData.append("entry.431800140", values.email);
          formData.append("entry.2013422363", values.message);

          // Submit formData to Google Form URL
          await axios.post(formURL, formData, {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          });

          // Reset form fields after successful submission
          // form.resetFields();

          // Show success message to user
          alert("Your message has been sent to the site administrator via email. Messages are saved in google sheets. Thank you for contacting me!!!");
          // console.log(formData);
          resetFields(['name', 'phone', 'email', 'message']);

      }

      catch (error) {
          // form.resetFields();  
          console.error('Error submitting form:', error);
          resetFields(['name', 'phone', 'email', 'message']);
          alert("Your message has been sent to the site administrator via email. Messages are saved in google sheets. Thank you for contacting me!!!");
          // form.resetFields();

      }
  };


  const resetFields = (fields) => {
      fields.forEach(field => {
          form.setFieldsValue({ [field]: undefined });
      });
  };
  return (
    <Layout>
    <div className='flex min-h-screen overflow-hidden w-full'>
    <div className='min-h-screen h-auto w-full mt-[65px]'>
        <div data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                className='my-5 md:mx-64 mx-2  min-h-screen flex-col h-auto flex justify-center items-center '>


                <div className=
                    {`shadow-sky-200 
                    bg-[#cfe887]
                container4
                rounded-tl-3xl rounded-br-3xl border-yellow-300 border-2 
                shadow-2xl p-5 flex flex-col justify-center items-center `}

                >

                    <Form className='flex flex-col md:mx-0 md:w-[800px] h-auto'
                        form={form} name="nest-messages" onFinish={onFinish}
                        validateMessages={validateMessages}>
                        <h1 className='flex justify-center items-center text-center my-14 uppercase font-normal text-black text-3xl'>Nội Dung Tin Nhắn</h1>
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full md:w-2/5 px-4 mb-4">
                                <Form.Item name="name"

                                    label={<p className="">
                                        Họ và tên </p>}
                                    rules={[{ required: true }]}>
                                    <Input allowClear={{
                                        clearIcon: <CloseCircleOutlined style={{color:'black'}}/>,
                                    }} prefix={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                                    </svg>

                                    } autoSize={{ minRows: 1, maxRows: 2 }} />
                                </Form.Item>
                            </div>
                            <div className="w-full md:w-3/5 px-4  mb-4 md:pr-8">
                                <Form.Item name="phone" label={<p className="">Số ĐT</p>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your phone number!',
                                        },
                                        {
                                            pattern: /^\d{10}$/,
                                            message: 'Please input a valid 10-digit phone number!',
                                        },
                                    ]}>
                                    <Input
                                        allowClear={{
                                            clearIcon: <CloseCircleOutlined style={{color:'black'}}/>,
                                        }}
                                        prefix={

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                                            </svg>

                                        }
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="w-full md:w-full md:pl-8 mb-4 md:pr-4">
                            <Form.Item name="email" label={<p className="">Email</p>} rules={[{ type: 'email', required: true }]}>
                                <Input
                                    allowClear={{
                                        clearIcon: <CloseCircleOutlined style={{color:'black'}}/>,
                                    }}
                                    prefix={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                    </svg>
                                    } />
                            </Form.Item>
                        </div>
                        <div className='w-full md:pl-3 md:pr-4 '>
                            <Form.Item name="message" label={<p className="">Tin Nhắn</p>}
                                rules={[{ required: true, message: 'Please input your message!' }]}>
                                <TextArea allowClear={{
                                    clearIcon: <CloseCircleOutlined style={{color:'black'}}/>,
                                }} prefix={
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                        <path fill-rule="evenodd" d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z" clip-rule="evenodd" />
                                    </svg>


                                }

                                // autoSize={{ minRows: 3, maxRows: 6 }} 
                                />
                            </Form.Item>
                        </div>
                        <Form.Item className="flex justify-center">
                            <Button className='btn  ' type='default' htmlType="submit"
                                icon={<SendOutlined />}>

                                Gửi Tin Nhắn</Button>




                        </Form.Item>
                        <h1 className={`text-center font-thin text-sm `} >
                            (Tin Nhắn Bạn gửi sẽ đến được với chúng tôi)
                        </h1>
                    </Form>


                </div>



            </div>
          

        </div>
        
    </div>
    </Layout>
  )
}

export default About