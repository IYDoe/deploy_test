import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '../../../types/user'
import {
    changeAvatar,
    changePassword,
    changeUser,
    getUserInfo,
    registerUser,
    logoutUser,
    signinUser,
    saveTheme,
    getTheme,
    saveInnerUser,
    oAuthYandex,
    getClientId
} from './actions'

interface User {
    isAuth: boolean
    userData: UserData
    isLoading: boolean
    error: string
    isLightTheme: boolean
    innerId: number | null
}

interface Data {
    data: boolean
}

interface InnerUser {
    userId: number
}

const initialState: User = {
    isAuth: false,
    userData: {
        id: null,
        first_name: '',
        second_name: '',
        display_name: '',
        login: '',
        email: '',
        phone: '',
        avatar: '',
    },
    innerId: null,
    isLightTheme: false,
    isLoading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserEmail: (state, { payload }) => {
            state.userData.email = payload
        },
        changeTheme: (state, { payload }) => {
            state.isLightTheme = payload
        },
    },
    extraReducers: {
        [registerUser.fulfilled.type]: (
            state: User,
            action: PayloadAction<UserData>
        ) => {
            state.isLoading = false
            const { id } = action.payload
            state.userData.id = id
            state.error = '';
        },
        [registerUser.pending.type]: (state: User) => {
            state.isLoading = true
            state.error = '';
        },
        [registerUser.rejected.type]: (state: User, action) => {
            state.isLoading = false
            state.error = action.error.message;
        },

        [oAuthYandex.fulfilled.type]: (
            state: User
        ) => {
            state.isLoading = false
            state.error = '';
        },
        [oAuthYandex.pending.type]: (state: User) => {
            state.isLoading = true
            state.error = '';
        },
        [oAuthYandex.rejected.type]: (state: User, action) => {
            state.isLoading = false
            state.error = action.error.message;
        },

        [getClientId.fulfilled.type]: (
            state: User
        ) => {
            state.isLoading = false
            state.error = '';
        },
        [getClientId.pending.type]: (state: User) => {
            state.isLoading = true
            state.error = '';
        },
        [getClientId.rejected.type]: (state: User, action) => {
            state.isLoading = false
            state.error = action.error.message;
        },

        [signinUser.fulfilled.type]: (state: User) => {
            state.isLoading = false
            state.isAuth = true
            state.error = '';
        },
        [signinUser.pending.type]: (state: User) => {
            state.isLoading = true
            state.error = '';
        },
        [signinUser.rejected.type]: (state: User, action) => {
            state.isLoading = false
            state.error = action.error.message;
        },

        [logoutUser.fulfilled.type]: (state: User) => {
            state.isLoading = false
            state.isAuth = false
        },
        [logoutUser.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [logoutUser.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [getUserInfo.fulfilled.type]: (
            state: User,
            action: PayloadAction<UserData>
        ) => {
            state.isLoading = false
            state.userData = action.payload
            state.isAuth = Boolean(action.payload)
        },
        [getUserInfo.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [getUserInfo.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [changeUser.fulfilled.type]: (
            state: User,
            action: PayloadAction<UserData>
        ) => {
            state.isLoading = false
            state.userData = action.payload
        },
        [changeUser.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [changeUser.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [changeAvatar.fulfilled.type]: (
            state: User,
            action: PayloadAction<UserData>
        ) => {
            state.isLoading = false
            state.userData.avatar = action.payload.avatar
        },
        [changeAvatar.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [changeAvatar.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [changePassword.fulfilled.type]: (state: User) => {
            state.isLoading = false
        },
        [changePassword.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [changePassword.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [saveTheme.fulfilled.type]: (
            state: User,
            action: PayloadAction<Data>
        ) => {
            state.isLightTheme = action.payload.data
        },

        [getTheme.fulfilled.type]: (
            state: User,
            action: PayloadAction<Data>
        ) => {
            state.isLightTheme = action.payload.data
        },

        [saveInnerUser.fulfilled.type]: (
            state: User,
            action: PayloadAction<InnerUser>
        ) => {
            state.innerId = action.payload.userId
        },
    },
})

export const { changeUserEmail, changeTheme } = userSlice.actions

export const userReducer = userSlice.reducer
