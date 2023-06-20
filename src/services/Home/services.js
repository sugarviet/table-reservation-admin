import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { getAllTables, addTable, updateTable, getTableByNumber, getTablesWithCapacity, updateStatusTable } from "./caller";
import {  notification } from "antd";

export const useGetAllTables = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: () => getAllTables(),
  }, {
    staleTime: '100000'
  });
};

export const useGetTableBasedOnCapacity = (capacity) => {
  return useQuery({
    queryKey: ["tableByCapacity", capacity],
    queryFn: () => getTablesWithCapacity(capacity),
  }, {
    staleTime: '10000',
    // keepPreviousData: true
  });
}

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
    onError: (data) => {
      console.log(data);
      notification.error({
        message: "Table Not Added",
        description: "The table has not been added successfully.",
      });
    }
  });
};

export const useGetTableByNumber = (tableNumber) => {
  return useQuery({
    queryKey: ["table", tableNumber],
    queryFn: () => getTableByNumber(tableNumber),
  }, {
    staleTime: '100000'
  });
};

export const useUpdateOneTable = () => {
  const queryClinet = useQueryClient();

  return useMutation(updateTable, {
    onSuccess: () => {
      // console.log('data', data);
      notification.success({
        message: "Table Updated",
        description: "The table has been updated successfully.",
      });

      queryClinet.invalidateQueries("tableByCapacity");

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
  });
};

