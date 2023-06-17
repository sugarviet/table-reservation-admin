import PropTypes from "prop-types";
import { Table, Modal } from "antd";

const ReservationInfo = (props) => {
  const { selectedTable, isModalVisible, handleModalClose, tables, timeSlots } =
    props;
    
  return (
    <Modal
      title={`Booked Time Slots for Table ${selectedTable}`}
      visible={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
    >
      <Table
        columns={[
          { title: "Time Slot", dataIndex: "time", key: "time" },
          { title: "Customer", dataIndex: "customer", key: "customer" },
        ]}
        dataSource={tables
          .filter((table) => table.id === selectedTable)
          .flatMap((table) =>
            timeSlots.map((time) => ({
              key: time,
              time: time,
              customer: table.reservations.some(
                (reservation) => reservation.time === time
              )
                ? table.reservations.find(
                    (reservation) => reservation.time === time
                  ).customer
                : "Available",
            }))
          )}
        pagination={false}
      />
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
