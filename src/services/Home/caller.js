import { API } from "./api_path";
import { request } from "../../utils/request";

export const getAllTables = async () => {
  const res = await request.get(API.GET_ALL);
  return res.data.listTable;
};

export const getTablesWithCapacity = async (capacity) => {
  const res = await request.get(`${API.GET_WITH_CAPACITY}/${capacity}`);
  return res.data.list;
};

export const addTable = async (data) => {
  const res = await request.post(API.ADD_TABLE, data);
  return res.data;
};

export const updateTable = async (data) => {
  const res = await request.post(API.EDIT_TABLE, data);
  return res;
};

export const updateStatusTable = async (tableNumber) => {
  const res = await request.delete(`${API.EDIT_STATUS_TABLE}/${tableNumber}`);
  return res;
};

export const getTableByNumber = async (tableNumber) => {
  const res = await request.get(`${API.GET_TABLE_BY_NUMBER}/${tableNumber}`);
  return res.data.listTable;
};
