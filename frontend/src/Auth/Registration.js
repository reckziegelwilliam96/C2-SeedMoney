import React, { useEffect, useCallback } from "react";
import UserRegistration from "./UserRegistration";
import { signup } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userFetched = useSelector((state) => state.user.fetched);
  const userLoading = useSelector((state) => state.user.loading);

  const handleRegistration = useCallback(
    (data) => {
      dispatch(signup(data));
    },
    [dispatch]
  );

  useEffect(() => {
    if (userFetched && !userLoading) {
      navigate("/");
    }
  }, [ userFetched, userLoading, navigate]);

  return (
    <div>
      <UserRegistration onSubmit={handleRegistration} />;
    </div>
  )
}

export default Registration;
