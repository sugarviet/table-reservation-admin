import {
  LineChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const MenuSider = () => {
  function getItem(label, key, icon, path, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
      path,
    };
  }

  const items = [
    getItem("Home", "1", <LineChartOutlined />, "/", null),
  ];
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuSider;
