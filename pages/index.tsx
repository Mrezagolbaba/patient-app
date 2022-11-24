import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Layout, Menu, Button, Modal, Row, Col, Table } from "antd";
import React, { useState } from "react";
import handler from "./api/hello";
import data from "../json/data.json";
const { Header, Sider, Content } = Layout;

export default function Home({ resultsState }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patient, setPatient] = useState<DataType | null>(null);

  const showModal = (data: any) => {
    setIsModalOpen(true);
    setPatient(data);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navItem = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Patient",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Media",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "Upload",
    },
  ];
  const columns: ColumnsType<columns[]> = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Surname",
      dataIndex: "Surname",
      key: "Surname",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "Gender",
    },
    {
      title: "Contact Number",
      dataIndex: "ContactNumber1",
      key: "ContactNumber1",
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      render: (text: string, record: string) => (
        <Button
          onClick={() => showModal(record)}
          shape={"round"}
          type="primary"
        >
          See Details
        </Button>
      ),
    },
  ];
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={navItem}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          <Table
            columns={columns}
            dataSource={data.map((i) => i)}
            // onChange={onChange}
          />
        </Content>
        <Modal
          title="Patient Details"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row>
            <Col span={12}>
              <h3>Alergies</h3>
              {patient &&
                patient?.Medical.Alergies.map((i: Alergy, index: number) => {
                  return <p key={index}>{i.Name}</p>;
                })}
            </Col>

            <Col span={12}>
              <h3>Conditions</h3>

              {patient &&
                patient?.Medical.Conditions.map(
                  (i: Condition, index: number) => {
                    return <p key={index}>{i.Name}</p>;
                  }
                )}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <h3>Medication</h3>
              {patient &&
                patient?.Medical.Medication.map(
                  (i: Medication, index: number) => {
                    return <p key={index}>{i.Name + " " + i.Notes}</p>;
                  }
                )}
            </Col>
            <Col span={12}>
              <h3>NextOfKin</h3>
              {patient &&
                patient?.NextOfKin.map((i: NextOfKin, index: number) => {
                  return <p key={index}>{i.Name + " " + i.Surname}</p>;
                })}
            </Col>
          </Row>
          <Row></Row>
        </Modal>
      </Layout>
    </Layout>
  );
}

export async function getServerSideProps({ resolvedUrl }: any) {
  const resultsState = await handler();
  return {
    props: {
      resultsState: data,
    },
  };
}
