import { jwtDecode } from "jwt-decode"

const getUserFromToken = () => {
    // console.log('masuk')
    const token = localStorage.token

    if (!token) return null

    try {
        const decode = jwtDecode(token)
        return decode // balikin juga userId nya
    } catch (error) {
        return null
    }
}

export default getUserFromToken;