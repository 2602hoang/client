import axios from 'axios';
import React from 'react'

function chat() {
    const [value, setValue] = useState({
        option: 0,
        address: '',
        name: '',
        phone: '',
        date: today.format(dateFormat),
        note: '',
        // name1: '',
        // phone1: '',
        email: '',
        address1: '',
        note1: '',
      });
    const handlesendMail = async (e,value) => {
        if (e) e.preventDefault();
       try {
        const fromURL = "https://docs.google.com/forms/d/e/1FAIpQLSdJlikFOI5LBt1sw86UaVA1bzyUF1vDbBOuSmjU1XbpA05ZjQ/formResponse";
        const fromData = new FormData();
        fromData.append("entry.1128230388",value.name);
        fromData.append("entry.1426678992",value.phone);
        fromData.append("entry.181433840",value.email || value.date);
        fromData.append("entry.336963041",value.address ==="DC1"? "HCM": value.address === "DC2" ? "HN" : value.address1 );
        fromData.append("entry.1448006309",value.note);
        fromData.append("entry.1604855911",value.option === 3 ? "Than toán tiền mặt": "Thanh toán chuyển khoản");
        await axios.post(fromURL, fromData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          
        })
        notification.success({
          message: 'Xac Nhận thông thành công ',
          showProgress: true,
          duration: 1.5,
        })
       } catch (error) {
        console.error(error);
       }
  
    }
    // const itemCountsSP = countItemsByIdSP(orderpay);
    const defaultValue = `     
              (Thông Tin Của Bạn) 
              Tên người nhận: ${value.name ? ' ' + value.name : ''}
              ${value.email.length > 0 ? 'Email: ' + value.email : ''}${value.date !== '' ? 'Ngày Nhận: ' + value.date : ''}
              ${value.phone.length > 0 ? 'SDT: ' + value.phone : ''}
              Địa chỉ: ${value.address === 'DC1'
        ? 'xx đường Nguyễn Huệ, quận 1, tp. Hồ Chí Minh'
        : value.address === 'DC2'
          ? 'xx đường Hai Bà Trưng, quận Ba Đình, tp. Hà Nội'
          : value.address1
      }
            ${value.option === 3 ? 'Thanh toán chuyển khoản':"Thanh toán tiền mặt" }
              ${value.note !== '' ? 'Ghi chú: ' + value.note : 'Ghi chú: không có ghi chú'} `
              ;
  return (
    <div>
        <from  className='w-full justify-center items-center flex mt-5 flex-col'>

<TextArea

  style={{ width: window.innerWidth > 768 ? "80%" : "100%", height: "auto", overflow: 'hidden', color: "black" }}
  autoSize={{
    minRows: 6,
    maxRows: 8,
  }} defaultValue={defaultValue} disabled />


</from>
  <button> gửi</button>
    </div>
  )
}

export default chat