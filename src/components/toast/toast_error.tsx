import { toast, Bounce } from "react-toastify"

function toast_error(message: string) {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: JSON.parse(localStorage.getItem("theme") || "light"),
        transition: Bounce,
    })
}

export default toast_error