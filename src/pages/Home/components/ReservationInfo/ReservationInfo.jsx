import PropTypes from "prop-types";
import { Table, Modal, Tag } from "antd";
import { useGetTableByNumber } from "../../../../services/Home/services";

// const timeSlotData = ["6h", "8h", "10h"];

const ReservationInfo = (props) => {
  const { selectedTable, isModalVisible, handleModalClose } =
    props;
    
    const {data, isLoading} = useGetTableByNumber(selectedTable);

    console.log('dataDetail', data);

    if(isLoading){
      return <div>Loading...</div>
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
          // { title: "Time Slot", dataIndex: "time", key: "time" },
          { title: "Time Slot", dataIndex: "timeRangeType", key: "timeRangeType" },
          { title: "Status", dataIndex: "isAvailable", key: "isAvailable",
          render: (status) => {
            return status === true ? <Tag color="green">Available</Tag> : <Tag color="red">Unavailable</Tag>;
          }, },
        ]}
        // dataSource={tables
        //   .filter((table) => table.id === selectedTable)
        //   .flatMap((table) =>
        //     timeSlots.map((time) => ({
        //       key: time,
        //       time: time,
        //       customer: table.reservations.some(
        //         (reservation) => reservation.time === time
        //       )
        //         ? table.reservations.find(
        //             (reservation) => reservation.time === time
        //           ).customer
        //         : "Available",
        //     }))
        //   )}
        dataSource={data}
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
