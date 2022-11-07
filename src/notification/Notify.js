import { toast } from "react-toastify"

// show the Notification
export const showToastMessage = (message, type)=>{
    toast[type](message, {
        position: toast.POSITION.TOP_RIGHT
    })
}