import AdminPage from "./pages/AdminPage";
import MyRequests from "./pages/MyRequests";
import Schedule from "./pages/Schedule";
import Auth from "./pages/Auth";
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, REQUESTS_ROUTE, SCHEDULE_ROUTE } from "./utils/consts";


export const publicRoutes = [
    {
        path: SCHEDULE_ROUTE,
        Component: Schedule
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]

export const authRoutes = [
    {
        path: REQUESTS_ROUTE,
        Component: MyRequests
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
]
