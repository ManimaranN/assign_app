import "./App.css";
import "antd/dist/antd.css";

import { Layout } from "antd";
import Board from "./components/Board";

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <Layout className="app-container">
      <Sider width={300} style={{ minHeight: "100vh" }}></Sider>
      <Layout>
        <Header
          className="navigation_container"
          style={{ backgroundColor: "white" }}
        ></Header>
        <Content className="content_container">
          <Board />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
