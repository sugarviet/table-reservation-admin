import jwt_decode from 'jwt-decode';

function useDecodeToken(){
  const token = localStorage.getItem('token')
const decodedToken = jwt_decode(token);


    if(!token){
        return null;
    }

    return {
        decodedToken
    }
}

export default useDecodeToken