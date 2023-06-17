import { Fragment } from "react";
import { Layout as AntdLayout } from "antd";
import Navbar from "../Navbar";
// import Sider from "../Sider";
import Routers from "../../routes/Routers";

const Layout = () => {
  return (
    <Fragment>
      <AntdLayout>
        <Navbar />
        <AntdLayout>
          {/* <Sider /> */}
          <AntdLayout.Content style={{ flex: "1 1 auto", padding: "24px" }}>
            <Routers />
          </AntdLayout.Content>
        </AntdLayout>
      </AntdLayout>
    </Fragment>
  );
};

export default Layout;
