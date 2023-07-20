import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTables,
  addTable,
  updateTable,
  getTableByNumber,
  getTablesWithCapacity,
  updateStatusTable,
  getReservationByTableAndTimeRangeWithStatusBooked,
} from "./caller";
import { notification } from "antd";

export const useGetAllTables = () => {
  return useQuery(
    {
      queryKey: ["tables"],
      queryFn: () => getAllTables(),
    },
    {
      staleTime: "100000",
    }
  );
};

export const useGetTableBasedOnCapacity = (capacity) => {
  return useQuery(
    {
      queryKey: ["tableByCapacity", capacity],
      queryFn: () => getTablesWithCapacity(capacity),
    },
    {
      staleTime: "10000",
      // keepPreviousData: true
    }
  );
};

export const useAddOneTable = () => {
  const queryClinet = useQueryClient();
  return useMutation(addTable, {
    onSuccess: () => {
      notification.success({
        message: "Table Added",
        description: "The table has been added successfully.",
      });

      queryClinet.invalidateQueries("tableByCapacity");
    },
    onError: (error) => {
      if (error.response.status === 404) {
        return notification.error({
          message: error.response.data.error.message,
        });
      }
      notification.error({
        message: "Add Table failed",
      });
    },
  });
};

export const useGetTableByNumber = (tableNumber) => {
  return useQuery(
    {
      queryKey: ["table", tableNumber],
      queryFn: () => getTableByNumber(tableNumber),
    },
    {
      staleTime: "100000",
    }
  );
};

export const useUpdateOneTable = () => {
  const queryClinet = useQueryClient();

  return useMutation(updateTable, {
    onSuccess: () => {
      notification.success({
        message: "Table Updated",
        description: "The table has been updated successfully.",
      });

      queryClinet.invalidateQueries("tableByCapacity");
    },
    onError: (error) => {
      if (error.response.status === 404) {
        return notification.error({
          message: error.response.data.error.message,
        });
      }
      notification.error({
        message: "Update Table failed",
      });
    },
  });
};

export const useUpdateOneTableStatus = () => {
  const queryClinet = useQueryClient();

  return useMutation(updateStatusTable, {
    onSuccess: () => {
      // console.log('data', data);
      notification.success({
        message: "Table Updated",
        description: "The table has been updated successfully.",
      });

      queryClinet.invalidateQueries("tableByCapacity");
    },
    onError: (error) => {
      if (error.response.status === 404) {
        return notification.error({
          message: error.response.data.error.message,
        });
      }
      notification.error({
        message: "Update Table failed",
      });
    },
  });
};
export const UseGetReservationByTableAndTimeRangeWithStatusBooked = ({
  selectedTableCheck,
  timeRangeType,
}) => {
  return useQuery(
    {
      queryKey: ["tableCheck", { selectedTableCheck, timeRangeType }],
      queryFn: () =>
        getReservationByTableAndTimeRangeWithStatusBooked({
          selectedTableCheck,
          timeRangeType,
        }),
    },
    {
      staleTime: "100000",
    }
  );
};
