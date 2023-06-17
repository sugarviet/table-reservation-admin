import { useState } from "react";
import { Tabs, Table, Button } from "antd";
import styles from "./Home.module.css";
import ReservationInfo from "./components/ReservationInfo/ReservationInfo";
import CreateTable from "../CreateTable/CreateTable";
import UpdateTable from "./components/UpdateTable/UpdateTable";

import { DeleteOutlined, EyeOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

// Sample table data
const tables = [
  {
    id: 1,
    name: "Table 1",
    seats: 4,
    description: "description 1",
    reservations: [{ time: "6pm", customer: "John Doe" }],
  },
  {
    id: 2,
    name: "Table 2",
    seats: 6,
    description: "description 2",
    reservations: [
      { time: "8pm", customer: "Jane Smith" },
      { time: "10pm", customer: "Michael Johnson" },
    ],
  },
  {
    id: 3,
    name: "Table 3",
    seats: 4,
    description: "description 3",
    reservations: [{ time: "6pm", customer: "Emma Davis" }],
  },
  {
    id: 4,
    name: "Table 4",
    seats: 10,
    description: "description 4",
    reservations: [{ time: "8pm", customer: "David Brown" }],
  },
  {
    id: 5,
    name: "Table 5",
    seats: 6,
    description: "description 5",
    reservations: [],
  },
];

const timeSlots = ["6pm", "8pm", "10pm"];

const Home = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalShowTableInfoVisible, setIsShowTableInfoVisible] =
    useState(false);
  const [isModalShowAddTable, setIsModalShowAddTable] = useState(false);
  const [isModalShowUpdateTable, setIsModalShowUpdateTable] = useState(false);
 
  const handleTableDelete = (tableId) => {
    console.log("Deleting table with ID:", tableId);
  };

  const handleTableClick = (tableId) => {
    setSelectedTable(tableId);
    setIsShowTableInfoVisible(true);
  };

  const handleModalShowTableInfoClose = () => {
    setIsShowTableInfoVisible(false);
  };

  const handleModalShowAddTableClose = () => {
    setIsModalShowAddTable(false);
  };

  const handleModalShowUpdateTableClose = () => {
    setIsModalShowUpdateTable(false);
  };

  const handleAddTables = () => {
    setIsModalShowAddTable(true);
  };

  const handleEditTables = () => {
    setIsModalShowUpdateTable(true);
  };

  const renderTableColumns = () => [
    { title: "Table Name", dataIndex: "name", key: "name" },
    { title: "Seats", dataIndex: "seats", key: "seats" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
    
      title: "Action",
      key: "action",
      width: "25%",
      render: (_, table) => (
        <div className={styles.btnWrapper}>
          <Button onClick={() => handleTableClick(table.id)} icon={<EyeOutlined />} type="primary">
            View
          </Button>
          <Button onClick={handleEditTables} icon={<EditOutlined />}>
            Edit 
          </Button>
          <Button onClick={() => handleTableDelete(table.id)} danger  icon={<DeleteOutlined />}>
            Delete 
          </Button>
        </div>
      ),
    },
  ];

  const renderTableTabs = () => (
    <Tabs defaultActiveKey="4" type="card">
      <TabPane tab="4-Person Tables" key="4">
        <Table
          pagination={{ hideOnSinglePage: true }}
          columns={renderTableColumns()}
          dataSource={tables.filter((t) => t.seats === 4)}
          // onRow={(record) => ({
          //   onClick: () => handleTableClick(record.id),
          // })}
        />
      </TabPane>
      <TabPane tab="6-Person Tables" key="6">
        <Table
          columns={renderTableColumns()}
          dataSource={tables.filter((t) => t.seats === 6)}
          // onRow={(record) => ({
          //   onClick: () => handleTableClick(record.id),
          // })}
        />
      </TabPane>
      <TabPane tab="10-Person Tables" key="10">
        <Table
          columns={renderTableColumns()}
          dataSource={tables.filter((t) => t.seats === 10)}
          // onRow={(record) => ({
          //   onClick: () => handleTableClick(record.id),
          // })}
        />
      </TabPane>
    </Tabs>
  );

  return (
    <div style={{ minHeight: "609px" }}>
      {/* {renderTableTabs()} */}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Table Management</h1>
        <Button type="primary" onClick={handleAddTables} icon={<PlusCircleOutlined />}>
          Add Tables
        </Button>
      </div>
      {renderTableTabs()}

      {isModalShowTableInfoVisible ? (
        <ReservationInfo
          handleModalClose={handleModalShowTableInfoClose}
          isModalVisible={isModalShowTableInfoVisible}
          selectedTable={selectedTable}
          tables={tables}
          timeSlots={timeSlots}
        />
      ) : null}

      {isModalShowAddTable ? (
        <CreateTable
          isModalVisible={isModalShowAddTable}
          handleModalClose={handleModalShowAddTableClose}
        />
      ) : null}

      {isModalShowUpdateTable ? (
        <UpdateTable
          isModalVisible={isModalShowUpdateTable}
          handleModalClose={handleModalShowUpdateTableClose}
        />
      ) : null}
    </div>
  );
};

export default Home;
