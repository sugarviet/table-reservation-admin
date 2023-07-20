import PropTypes from "prop-types";
import { Table, Modal, Tag, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useGetTableByNumber } from "../../../../services/Home/services";
import CheckUserReservation from "../CheckUserReservation/CheckUserReservation";
import { useState } from "react";

const ReservationInfo = (props) => {
  const { selectedTable, isModalVisible, handleModalClose } = props;
  const { data, isLoading } = useGetTableByNumber(selectedTable);
  const [isModalShowTableInfoVisible, setIsShowTableInfoVisible] =
    useState(false);
  const [selectedTableCheck, setSelectedTableCheck] = useState(null);
  const [timeRangeType, setTimeRangeType] = useState(null);

  console.log("dataDetail", data);

  const handleTableClick = (tableId, timeRangeType) => {
    setSelectedTableCheck(tableId);
    setIsShowTableInfoVisible(true);
    setTimeRangeType(timeRangeType);
  };
  const handleModalShowTableInfoClose = () => {
    setIsShowTableInfoVisible(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Modal
      title={`Booked Time Slots for Table ${selectedTable}`}
      visible={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
    >
      <Table
        columns={[
          {
            title: "Time Slot",
            dataIndex: "timeRangeType",
            key: "timeRangeType",
          },
          {
            title: "Status",
            dataIndex: "isAvailable",
            key: "isAvailable",
            render: (status) => {
              return status === true ? (
                <Tag color="green">Available</Tag>
              ) : (
                <Tag color="RGB(246 199 107)">Booked</Tag>
              );
            },
          },
          {
            title: "Action",
            key: "action",
            width: "25%",
            render: (_, table) => (
              <div>
                <Button
                  onClick={() =>
                    handleTableClick(table.tableNumber, table.timeRangeType)
                  }
                  icon={<EyeOutlined />}
                  disabled={table.isAvailable === true}
                >
                  Check
                </Button>
              </div>
            ),
          },
        ]}
        dataSource={data}
        pagination={false}
      />
      {isModalShowTableInfoVisible ? (
        <CheckUserReservation
          handleModalClose={handleModalShowTableInfoClose}
          isModalVisible={isModalShowTableInfoVisible}
          selectedTableCheck={selectedTableCheck}
          timeRangeType={timeRangeType}
        />
      ) : null}
    </Modal>
  );
};

ReservationInfo.propTypes = {
  selectedTable: PropTypes.string,
  isModalVisible: PropTypes.bool,
  handleModalClose: PropTypes.func,
  tables: PropTypes.array,
  timeSlots: PropTypes.array,
};

export default ReservationInfo;
