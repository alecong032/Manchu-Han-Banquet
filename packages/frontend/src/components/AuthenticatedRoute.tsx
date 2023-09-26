import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

export default function AuthenticatedRoute({children,}: {children:ReactElement}): ReactElement{
    const { pathname, search } = useLocation();
    const { isAuthenticated } = useAppContext();

    if(!isAuthenticated) {
        //keep the url before login
        //go to this url after login
        return <Navigate to={`/login?redirect=${pathname}${search}`} />
    }

    return children;
}