import { toast } from 'react-toastify';

const ShowToast = ({ position = "top-center", message = "", variant = "success", msgCode = "", cb = () => { }, time = 2000 }) => {
    const params = {
        position,
        autoClose: time,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // type: "default",
        style: { borderRadius: "8px", color: "#fff" },
        theme: "colored",
        // icon: "🚀",
        onClick: () => {
            if (msgCode) {
                if (cb) cb();
            }
        }
    }
    function ProvideColor(type) {
        switch (type) {
            case 'success':
                return ({ bg: '#37A353' })
            case 'warning':
                return ({ bg: '#f1c30b' })
            case 'error':
                return ({ bg: '#DE3C34' })
            case 'info':
                return ({ bg: '#3498d9' })
            default:
                return ({ bg: '#37A353' })
        }
    }

    // variant :"success" || "error" || "warning" || "info"
    if (message) {
        toast[variant](<div><p>{message}</p></div>, params);
    }
};

export default ShowToast;