import React, { useContext, useEffect, useState } from "react";
import LayoutAdmin from "../layout/LayoutAdmin";

import NavabarUser from "../../component/NavabarUser";
import ListUser from "../../component/ListUser";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { URL } from "../../url";
import AddUser from "../../component/AddUser";
import { Button,Result  } from "antd";
import { ExportOutlined } from "@ant-design/icons";

function UserManager() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState("Danh sách");

  const { userToken, userId } = useContext(AuthContext);
  // console.log(userToken);

  const [role, setRole] = useState([]);

  // console.log(userToken);

  const getAllRole = async () => {
    try {
      const token = userToken;
      const response = await axios.get(`${URL}api/v1/user/getall/role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRole(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setRole([]);
    }
  };
  const navigateToList = () => {
    setActiveMenuItem("Danh sách");
  };
  useEffect(() => {
    getAllRole();
  }, [userToken]);

  // console.log(user);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleSubMenu = (index) => {
    setSubMenuVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const renderContent = () => {
    switch (activeMenuItem) {
      case "Danh sách":
        return (
          <div className="text-center text-3xl md:text-4xl w-full font-black overflow-hidden">
            <h1>Danh sách Tài Khoản</h1>
            <ListUser
              //  user={user}
              getAllRole={getAllRole}
              role={role}
            />
          </div>
        );
      // case 'Sửa':
      //   return <h1 className='text-center text-5xl font-black'>Chỉnh sửa</h1>;
      case "Thêm":
        return (
          <div className="text-center justify-center items-center overflow-hidden  flex-col flex text-5xl font-black w-full space-y-4 mb-4">
            <h1>Danh sách Tài Khoản</h1>
            <AddUser
              navigateToList={navigateToList}
              getAllRole={getAllRole}
              role={role}
            />
            <Button
              data-aos="fade-down"
              type="link"
              icon={<ExportOutlined style={{ fontSize: "24px" }} />}
              className="h-12 bg-orange-300 md:w-2/12  justify-center items-center text-center"
              onClick={navigateToList}
            >
              Xem danh sách{" "}
            </Button>
          </div>
        );
      // case 'Xóa':
      //   return <h1 className='text-center text-5xl font-black'>Xóa</h1>;
      case "Thống kê":
        return <h1 className="text-center text-5xl font-black">Thống kê</h1>;
      default:
        return <h1 className="text-center text-5xl font-black">Danh sách</h1>;
    }
  };

  return (
    <LayoutAdmin>
      {parseInt(userId) === 84 ? (
        <div className="flex flex-row mt-[65px] w-full md:mt-0">
          {/* menu */}
          <div
            className={`min-h-screen flex-col flex ${
              menuVisible ? "md:w-2/5 w-full" : "w-[60px]"
            } transition-all duration-500`}
          >
            <NavabarUser
              menuVisible={menuVisible}
              toggleMenu={toggleMenu}
              subMenuVisible={subMenuVisible}
              setActiveMenuItem={setActiveMenuItem}
              toggleSubMenu={toggleSubMenu}
            />
          </div>
          {/* content */}
          <div
            className={`min-h-screen flex-col flex ${
              menuVisible ? "w-0 md:w-4/5" : "w-full"
            } transition-all duration-500`}
          >
            {renderContent()}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
         
          <Result
            status="403"
            title={ <h1 className="text-3xl font-bold text-center text-red-500 uppercase my-4">
              403 Lỗi phân quyền
            </h1>}
            subTitle="Rất tiếc, bạn không được phép truy cập trang này."
            extra={<Button href="/" type="primary">Về Trang Chủ</Button>}
          />
        </div>
      )}
    </LayoutAdmin>
  );
}

export default UserManager;
