import { Fragment } from "react";
import { Layout as AntdLayout } from "antd";
import Navbar from "../Navbar";
// import Sider from "../Sider";
import Routers from "../../routes/Routers";
// import useAuth from "../../hooks/useAuth";

// import { useLocation } from "react-router-dom";

const Layout = () => {
  // const { pathname } = useLocation();
  // const token = localStorage.getItem("token");

  // Check if user dont have token will redirect to login
  // useAuth(token);

  return (
    <Fragment>
      <AntdLayout>
        {/* {pathname === "/" ? null : <Navbar />} */}
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
