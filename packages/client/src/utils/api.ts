const prodUrl = 'https://game-machine.ya-praktikum.tech';

export const serverUrl = process.env.DOCKER_BUILD === 'true' ? `${prodUrl}:${process.env.SERVER_PORT}` : `http://localhost:${process.env.SERVER_PORT}`;

export const Urls = {
    baseUrl: `${serverUrl}/api/v2`,
    signup: '/auth/signup',
    signin: '/auth/signin',
    userInfo: '/auth/user',
    logout: '/auth/logout',
    chats: '/chats',
    leaderBoard: '/leaderboard',
    leaderBoards: '/leaderboard/all',
    userProfile: '/user/profile',
    userAvatar: '/user/profile/avatar',
    userPassword: '/user/password',
    themeSet: '/local/theme_set',
    themeGet: '/local/theme_get',
    innerUserSet: '/local/user_set',
    innerUserEdit: '/local/user_eidt',
    clientId: '/oauth/yandex/service-id',
    oAuth: '/oauth/yandex',
    redirectUri: prodUrl,
    topics: '/topics',
    comments: '/comments'
}
