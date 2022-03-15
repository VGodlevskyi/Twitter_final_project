const useToken = () => {
    return localStorage.getItem('authToken');
}

export default useToken;