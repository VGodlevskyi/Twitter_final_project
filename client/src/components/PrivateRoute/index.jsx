import React from "react"
import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoute = ({ isPublic, isAdminRoute, ...route }) => {
  const { authorized, user:{isAdmin} } = useSelector((state) => state.auth)

  if ((route.notFound || ['/login', '/signup'].includes(route.path)) && authorized) return <Redirect to={'/home'}/>

  if(isAdminRoute){
    return isAdmin ? <Route {...route} /> : <Redirect to="/login" />
  }

  if (authorized || isPublic) {
    return <Route {...route} />;
  }

  return <Redirect to="/login" />
}

export default PrivateRoute;
