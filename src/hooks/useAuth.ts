import { register as registerApi } from "../api/authApi";
import { login as loginApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore"


export const useAuth = () => {
    const { token, user, setAuth, logout} = useAuthStore();

    const register = async (username: string, email: string, password: string) => {
        const res = await registerApi({username, email, password});

        // console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setAuth(res.data.token, res.data.user);
    }

    const login = async (username: string, password: string) => {
        const res = await loginApi({username, password});

        localStorage.setItem("token", res.data.token);
        setAuth(res.data.token, res.data.user);
    }

    return { token, user, register, login};
}