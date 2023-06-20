import { useGetTableByNumber } from "../../../../../services/Home/services";

function useUpdateTable(selectedTableNumber){
    const {data, isLoading} = useGetTableByNumber(selectedTableNumber);
    // const {mutate} = useUpdateOneTable();

    return {
        data,
        isLoading,
        // mutate
    }
}

export default useUpdateTable;