import { useState } from "react";
import { Tabs, Table, Button, Tag } from "antd";
import styles from "./Home.module.css";
import ReservationInfo from "./components/ReservationInfo/ReservationInfo";
// import CreateTable from "../CreateTable/CreateTable";
import AddTable from "./components/AddTable/AddTable";
import UpdateTable from "./components/UpdateTable/UpdateTable";

import {
  EyeOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  useGetTableBasedOnCapacity,
  useUpdateOneTableStatus,
} from "../../services/Home/services";

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
  const { mutate: changeStatusTable } = useUpdateOneTableStatus();
  const [selectedCapacity, setSelectedCapacity] = useState(4);
  const { data, isLoading } = useGetTableBasedOnCapacity(selectedCapacity);
  const [selectedTable, setSelectedTable] = useState(null);
  //
  const [selectedTableNumber, setSelectedTableNumber] = useState(null);
  //
  const [isModalShowTableInfoVisible, setIsShowTableInfoVisible] =
    useState(false);
  const [isModalShowAddTable, setIsModalShowAddTable] = useState(false);
  const [isModalShowUpdateTable, setIsModalShowUpdateTable] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleTabChange = (activeKey) => {
    console.log(activeKey);
    setSelectedCapacity(+activeKey);
  };

  const handleTableDelete = (tableId) => {
    console.log("change status table with ID:", tableId);
    changeStatusTable(tableId);
  };

  const handleTableClick = (tableId) => {
    setSelectedTable(tableId);
    setIsShowTableInfoVisible(true);
    setSelectedTableNumber(tableId);
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

  const handleEditTables = (tableNumber) => {
    setIsModalShowUpdateTable(true);
    setSelectedTableNumber(tableNumber);
  };

  const renderTableColumns = () => [
    { title: "Table number", dataIndex: "tableNumber", key: "tableNumber" },
    { title: "Capacity", dataIndex: "capacity", key: "capacity" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return status === 1 ? (
          <Tag color="green">Available</Tag>
        ) : (
          <Tag color="red">Unavailable</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "25%",
      render: (_, table) => (
        <div className={styles.btnWrapper}>
          <Button
            onClick={() => handleTableClick(table.tableNumber)}
            icon={<EyeOutlined />}
            type="primary"
            disabled={table.status === 0}
          >
            View
          </Button>
          <Button
            onClick={() => handleEditTables(table.tableNumber)}
            icon={<EditOutlined />}
            disabled={table.status === 0}

          >
            Edit
          </Button>

          {table.status === 1 ? (
            <Button
              onClick={() => handleTableDelete(table.tableNumber)}
              danger
              type="primary"
            >
              Disable
            </Button>
          ) : (
            <Button
              onClick={() => handleTableDelete(table.tableNumber)}
              type="primary"
              style={{backgroundColor: '#0bce5d'}}
            >
              Enable
              {/* Change status */}
            </Button>
          )}
        </div>
      ),
    },
  ];

  const renderTableTabs = () => (
    <Tabs
      type="card"
      onChange={handleTabChange}
      activeKey={selectedCapacity.toString()}
    >
      <TabPane tab="4-Person Tables" key="4">
        <div style={{ height: "500px" }}>
          <Table
            pagination={{ hideOnSinglePage: true, pageSize: 5 }}
            columns={renderTableColumns()}
            // dataSource={tables.filter((t) => t.seats === 4)}
            dataSource={data}
          />
        </div>
      </TabPane>

      <TabPane tab="6-Person Tables" key="6">
        <div style={{ height: "500px" }}>
          <Table
            pagination={{ hideOnSinglePage: true, pageSize: 5 }}
            columns={renderTableColumns()}
            // dataSource={tables.filter((t) => t.seats === 6)}
            dataSource={data}
          />
        </div>
      </TabPane>
      <TabPane tab="10-Person Tables" key="10">
        <div style={{ height: "500px" }}>
          <Table
            pagination={{ hideOnSinglePage: true, pageSize: 5 }}
            columns={renderTableColumns()}
            // dataSource={tables.filter((t) => t.seats === 10)}
            dataSource={data}
          />
        </div>
      </TabPane>
    </Tabs>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ minHeight: "609px" }}>
      {/* {renderTableTabs()} */}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Table Management</h1>
        <Button
          type="primary"
          onClick={handleAddTables}
          icon={<PlusCircleOutlined />}
        >
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
        <AddTable
          isModalVisible={isModalShowAddTable}
          handleModalClose={handleModalShowAddTableClose}
        />
      ) : null}

      {isModalShowUpdateTable ? (
        <UpdateTable
          selectedTableNumber={selectedTableNumber}
          isModalVisible={isModalShowUpdateTable}
          handleModalClose={handleModalShowUpdateTableClose}
        />
      ) : null}
    </div>
  );
};

export default Home;
