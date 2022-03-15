import api from "../../services/API";
import { toast } from 'react-toastify';

const uploadPostImgAction = (file) => {
    const formData = new FormData()
    formData.append('file', file)

    return api
        .post(`/images/upload/post`, formData,
            {
                headers: {'content-type': 'multipart/form-data'}
            })
        .then((res) => res.data) // here we get postImgPublicId
        .catch(err => {
            const errorMsg = err.response.data.message
            toast.error(errorMsg)
        })
}


export const authActions = {
    uploadPostImgAction,
}
