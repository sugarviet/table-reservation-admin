import { useGetAllTables } from "../../../services/Home/services";

function useHome() {
  const { data, isLoading } = useGetAllTables();

  return {
    data,
    isLoading
  }
}

export default useHome;
