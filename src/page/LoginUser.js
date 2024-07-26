import React, { useContext, useEffect, useState } from "react";
import bg from "../assets/background.png";
import bg1 from "../assets/background.png";
import { notification } from "antd";
import { AuthContext } from "../contexts/AuthContextProvider";

function LoginUser() {
  const [check, setCheck] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Load remember state from localStorage on component mount
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    setChecked(rememberMe);
  }, []);

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setChecked(checked);

    // Save remember state to localStorage
    localStorage.setItem("rememberMe", checked.toString());
  };

  useEffect(() => {
    // Ensure useEffect runs only once by providing an empty dependency array
    setCheck(true);
  }, []);

  const [err, setErr] = useState("");
  const { Login, Register, setError } = useContext(AuthContext);
  const validatePhone = (phone) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };
  const HandleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const phone = form.phone.value;
    const password = form.password.value;
    if (phone.length === 0 || password.length === 0) {
      notification.warning({
        message: "Lỗi rỗng",
        description: `Vui lòng nhập thông tin`,
        showProgress: true,
        duration: 1,
      });
      return;
    }
    if (!validatePhone(phone)) {
      notification.warning({
        message: "Lỗi SDT",
        description: `SĐT phải là 10 ký tự định dạng 0XXX-XXXXXXX`,
        showProgress: true,
        duration: 1,
      });
      return;
    }

    if (!validatePassword(password)) {
      notification.warning({
        message: "Lỗi mật khẩu",
        description: `Mật khẩu phải từ 6 ký tự`,
      });
      return;
    }

    try {
      const LoginData = await Login({ phone, password });
      if (LoginData && LoginData.success) {
        setError("Thành Công");
        setTimeout(() => setErr(""), 500);
        notification.success({
          message: "Thành công",
          description: `Đăng nhập thành công! phone ${phone}`,
          showProgress: true,
          duration: 1,
        });
      } else if (
        LoginData.success === false &&
        LoginData.message === "Tài khoản đã bị khóa"
      ) {
        notification.error({
          message: "Thất Bại",
          description: "Tài khoản của bạn đã bị khóa",
          showProgress: true,
          duration: 1,
        });
      } else {
        setErr(
          LoginData.success === false ||
            LoginData.message === "thông tin không hợp lệ"
        );

        notification.error({
          message: "Thất Bại",
          description: "Số ĐT hoặc mật khẩu không đúng, vui lòng thử lại!",
          showProgress: true,
          duration: 1,
        });
      }
    } catch (error) {
      console.log(error);
      // setErr("số ĐT hoặc mật khẩu không đúng, vui lòng thử lại!");

      setTimeout(() => setErr(""), 3000);
      // notification.error({
      //     message: 'Thất Bại',
      //     description: `số ĐT hoặc mật khẩu không đúng, vui lòng thử lại!`,
      // });
    }
  };
  const HandleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const phone = form.phone.value;
    const password = form.password.value;

    if (!validatePhone(phone)) {
      notification.warning({
        message: "Lỗi SDT",
        description: `SĐT phải là 10 ký tự định dạng 0XXX-XXXXXXX`,
        showProgress: true,
        duration: 1,
      });
      return;
    }

    if (!validatePassword(password)) {
      notification.warning({
        message: "Lỗi mật khẩu",
        description: `Mật khẩu phải từ 6 ký tự`,
        showProgress: true,
        duration: 1,
      });
      return;
    }

    try {
      const RegisterData = await Register({ username, phone, password });
      if (RegisterData.success) {
        setErr(RegisterData.message);
        setCheck(true);
        setTimeout(() => setErr(""), 3000);
        notification.success({
          message: "Thành công",
          description: `Đăng ký thành công! phone ${phone}`,
          showProgress: true,
          duration: 1,
        });
        form.reset();
        // if (toggleRef.current) {
        //     toggleRef.current.checked = false;
        // }
      } else {
        setErr(RegisterData.message);
        setTimeout(() => setErr(""), 3000);
        notification.error({
          message: "Thất bại",
          description: `Số điện thoại ${phone} đã được đăng ký `,
          showProgress: true,
          duration: 1,
        });
      }
    } catch (error) {
      console.log(error);
      setErr("Đăng ký thất bại, vui lòng thử lại");
      setTimeout(() => setErr(""), 3000);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          window.innerWidth >= 768 ? `url(${bg})` : `url(${bg1})`,
        backgroundSize: window.innerWidth >= 768 ? "100% 100%" : "100% 110%",
      }}
      className="w-full justify-center items-center overflow-hidden h-screen flex"
    >
      {check ? (
        <div className=" w-[350px] bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
          <h2 className="text-center text-4xl font-extrabold text-white">
            Chào Mừng
          </h2>
          <p className="text-center text-gray-200">
            Đăng nhập bằng tài khoản của bạn
          </p>
          <form onSubmit={HandleLogin} className="space-y-6">
            <div className="relative bg-gradient-to-r from-blue-800 to-purple-600">
              <input
                placeholder="0XXX-XXXXXXX"
                className="peer h-10 w-full bg-gradient-to-r from-blue-800 to-purple-600 border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                required=""
                id="phone"
                name="phone"
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-500  text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
            </div>
            <div className="relative">
              <input
                placeholder="Mật khẩu"
                className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                required=""
                id="password"
                name="password"
                type="password"
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                htmlFor="password"
              >
                Mật khẩu
              </label>
            </div>
            <div className="flex items-center justify-between">
              {/* <label className="flex items-center text-sm text-gray-200">
                                <input
                                    className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
                                    type="checkbox"
                                    checked={checked}
                                 onChange={handleCheckboxChange}
                                />
                                <span className="ml-2">Remember me</span>
                            </label> */}
            </div>
            <button
              className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
              type="submit"
            >
              Đăng Nhập
            </button>
          </form>

          <div className="text-center text-gray-300">
            Bạn chưa có tài khoản?
            <a
              onClick={() => setCheck(false)}
              className="text-purple-300 hover:underline"
              href="#"
            >
              Đăng Ký
            </a>
          </div>
        </div>
      ) : (
        <div className="max-w-md md:w-full w-3/5 bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
          <h2 className="text-center text-4xl font-extrabold text-white">
            Chào Mừng
          </h2>
          <p className="text-center text-gray-200">Đăng ký tài khoản của bạn</p>
          <form onSubmit={HandleRegister} className="space-y-6">
            <div className="relative">
              <input
                placeholder="tên tài khoản"
                className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                required=""
                id="username"
                name="username"
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                htmlFor="username"
              >
                Tên của bạn
              </label>
            </div>
            <div className="relative">
              <input
                placeholder="0XXX-XXXXXXX"
                className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                required=""
                id="phone"
                name="phone"
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
            </div>
            <div className="relative">
              <input
                placeholder="Mật khẩu"
                className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                required=""
                id="password"
                name="password"
                type="password"
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                htmlFor="password"
              >
                Mật khẩu
              </label>
            </div>
            <div className="flex items-center justify-between">
              {/* <a className="text-sm text-purple-200 hover:underline" href="#">
                                Forgot your password?
                            </a> */}
            </div>
            <button
              className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
              type="submit"
            >
              Đăng Ký
            </button>
          </form>
          <div className="text-center text-gray-300">
            Quay lại đăng nhập?
            <a
              onClick={() => setCheck(true)}
              className="text-purple-300 hover:underline"
              href="#"
            >
              Đăng Nhập
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginUser;
