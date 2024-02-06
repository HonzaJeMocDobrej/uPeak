import axios from "axios";

const groupPayload = (res) => {
    return {
        msg: res.data.msg,
        data: res.data.payload,
        status: res.status
    }
}