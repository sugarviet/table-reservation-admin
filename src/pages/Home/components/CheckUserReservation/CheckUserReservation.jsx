import PropTypes from "prop-types";
import { Table, Modal, Tag, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { UseGetReservationByTableAndTimeRangeWithStatusBooked } from "../../../../services/Home/services";

const CheckUserReservation = (props) => {
  const {
    isModalVisible,
    selectedTableCheck,
    handleModalClose,
    timeRangeType,
  } = props;
  const { data, isLoading } =
    UseGetReservationByTableAndTimeRangeWithStatusBooked({
      selectedTableCheck,
      timeRangeType,
    });
  console.log("dataDetail", data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Modal
      title={`Booked Time Slots for Table ${selectedTableCheck}`}
      visible={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
    >
      <Table
        columns={[
          {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
          },
          {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
          },
        ]}
        dataSource={data}
        pagination={false}
      />
    </Modal>
  );
};

CheckUserReservation.propTypes = {
  selectedTableCheck: PropTypes.number,
  isModalVisible: PropTypes.bool,
  handleModalClose: PropTypes.func,
  timeRangeType: PropTypes.string,
};

export default CheckUserReservation;
