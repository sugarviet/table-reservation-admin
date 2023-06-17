import { Layout, theme } from "antd";
import MenuSider from "./components/MenuSider/MenuSider";

const { Sider : AntdSider } = Layout;

const Sider = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log(colorBgContainer);
  return (
    <AntdSider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <MenuSider />
        </AntdSider>
  )
}

export default Sider
