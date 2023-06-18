import { Layout, Avatar, Dropdown } from "antd";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/')
  }

  const items = [
    {
      label: 
      <div>
        <h4>
          Jaydon Frankie
        </h4>
        <small>demo@minimals.cc</small>
      </div>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <a href="#">Home</a>,
      key: "1",
    },
    {
      label: <a href="#">Profile</a>,
      key: "2",
    },
    {
      label: <a href="#">Settings</a>,
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: <p onClick={handleLogout}>Logout</p>,
      key: "4",
    },
  ];

  return (
    <Header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="https://seeklogo.com/images/A/ant-design-logo-EAB6B3D5D9-seeklogo.com.png" alt="logo" />
        </div>
        <div className={styles.actions}>
          <ul className={styles.actionsList}>
            <li>
              <SearchOutlined />
            </li>
            <li>
              <BellOutlined />
            </li>
            <li>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" style={{cursor: 'pointer'}}/>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
    </Header>
  );
};

export default Navbar;
