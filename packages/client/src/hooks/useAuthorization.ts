import { useAppDispatch, useAppSelector } from '../store/hooks'
import { SigninData } from '../interfaces'
import { logoutUser, signinUser } from '../store/slices/userSlice/actions'

export const useAuthorization = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const isLoading = useAppSelector((state) => state.user.isLoading);
    const dispatch = useAppDispatch();

    const signin = async (data: SigninData) => {
        await dispatch(signinUser(data));
    }

    const logout = () => {
        dispatch(logoutUser());
    }

    return { isAuth, signin, logout, isLoading }
}
