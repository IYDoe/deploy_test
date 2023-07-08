import React, { JSX } from 'react'
import { Paths } from './paths'
import { RegisterPage } from '../pages/RegisterPage'
import { LoginPage } from '../pages/LoginPage'
import { MainPage } from '../pages/MainPage'
import { ErrorPage } from '../pages/ErrorPage'
import { LeaderBoardPage } from '../pages/LeaderBoardPage'
import { GamePage } from '../pages/GamePage'
import { StartPage } from '../pages/StartPage'
import { ForumPage } from '../pages/ForumPage/ForumPage'
import { EndScreenPage } from '../pages/EndScreenPage'
import { ProfilePage } from '../pages/ProfilePage'
import { EditProfilePage } from '../pages/EditProfilePage'
import { EditPasswordPage } from '../pages/EditPasswordPage'
import { AppDispatch } from '../store/store'

export interface Routes {
    path: string,
    element: JSX.Element,
    protected: boolean,
    loader?: (dispatch: AppDispatch) => void
}

export const routes: Routes[] = [
    {
        path: Paths.main,
        element: <MainPage />,
        protected: false,
    },
    {
        path: Paths.register,
        element: <RegisterPage />,
        protected: false,
    },
    {
        path: Paths.login,
        element: <LoginPage />,
        protected: false,
    },
    {
        path: Paths.notFound,
        element: <ErrorPage title="404" text="Не туда попали." />,
        protected: false,
    },
    {
        path: Paths.error,
        element: <ErrorPage title="500" text="Ошибка сервера, мы уже фиксим." />,
        protected: false,
    },
    {
        path: Paths.endScreen,
        element: <EndScreenPage />,
        protected: true,
    },
    {
        path: Paths.feed,
        element: <ForumPage />,
        protected: true,
    },
    {
        path: Paths.game,
        element: <GamePage />,
        protected: true,
    },
    {
        path: Paths.startScreen,
        element: <StartPage />,
        protected: true,
    },
    {
        path: Paths.profile,
        element: <ProfilePage />,
        protected: true,
    },
    {
        path: Paths.editProfile,
        element: <EditProfilePage />,
        protected: true,
    },
    {
        path: Paths.editPassword,
        element: <EditPasswordPage />,
        protected: true,
    },
    {
        path: Paths.leaderBoard,
        element: <LeaderBoardPage />,
        protected: true,
    }
]
