import { useState } from "react";
import { Tabs, Table, Button, Modal } from "antd";
import styles from './Home.module.css'

const { TabPane } = Tabs;

// Sample table data
const tables = [
  { id: 1, name: "Table 1", seats: 4 },
  { id: 2, name: "Table 2", seats: 6 },
  { id: 3, name: "Table 3", seats: 4 },
  { id: 4, name: "Table 4", seats: 10 },
  { id: 5, name: "Table 5", seats: 6 },
  // ... additional table data
];

const timeSlots = ["6pm", "8pm", "10pm"];

const Home = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTableDelete = (tableId) => {
    // Handle table deletion logic
    console.log("Deleting table with ID:", tableId);
  };

  const handleTableClick = (tableId) => {
    setSelectedTable(tableId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const renderTableColumns = () => [
    { title: "Table Name", dataIndex: "name", key: "name" },
    { title: "Seats", dataIndex: "seats", key: "seats" },
    {
      title: "Action",
      key: "action",
      render: (_, table) => (
        <Button type="link" onClick={() => handleTableDelete(table.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const renderTableTabs = () => (
    <Tabs defaultActiveKey="4" type="card">
      <TabPane tab="4-Person Tables" key="4">
        <Table
          columns={renderTableColumns()}
          dataSource={tables.filter((t) => t.seats === 4)}
          onRow={(record) => ({
            onClick: () => handleTableClick(record.id),
          })}
        />
      </TabPane>
      <TabPane tab="6-Person Tables" key="6">
        <Table
          columns={renderTableColumns()}
          dataSource={tables.filter((t) => t.seats === 6)}
          onRow={(record) => ({
            onClick: () => handleTableClick(record.id),
          })}
        />
      </TabPane>
      <TabPane tab="10-Person Tables" key="10">
        <Table
          columns={renderTableColumns()}
          dataSource={tables.filter((t) => t.seats === 10)}
          onRow={(record) => ({
            onClick: () => handleTableClick(record.id),
          })}
        />
      </TabPane>
    </Tabs>
  );
  return (
    <div style={{ minHeight: "609px" }}>
      {/* {renderTableTabs()} */}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Table Management</h1>
        <Button type="primary">Add Tables</Button>
      </div>
      {renderTableTabs()}

      <Modal
        title={`Booked Time Slots for Table ${selectedTable}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Table
          columns={timeSlots.map((time) => ({
            title: time,
            dataIndex: time,
            key: time,
          }))}
          pagination={{showSizeChanger: false, hideOnSinglePage: true}}
          dataSource={[
            { "6pm": "Booked", "8pm": "Available", "10pm": "Booked" },
          ]} // Sample data, replace with actual booking data for the selected table
        />
      </Modal>
    </div>
  );
};

export default Home;
