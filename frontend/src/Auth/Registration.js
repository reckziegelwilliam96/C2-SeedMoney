import React, { useState, useEffect, useCallback } from "react";
import UserRegistration from "./UserRegistration";
import BusinessRegistration from "./BusinessRegistration";
import FarmRegistration from "./FarmRegistration";
import { signup } from "../store/actions/userActions";
import { registerBusiness } from "../store/actions/businessActions";
import { registerFarm } from "../store/actions/farmActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Registration() {
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userFetched = useSelector((state) => state.user.fetched);
    const businessFetched = useSelector((state) => state.business.fetched);    
    const userLoading = useSelector((state) => state.user.loading);
    const businessLoading = useSelector((state) => state.business.loading);


  const nextStep = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const handleRegistration = useCallback((data) => {
    switch(step) {
      case 1:
        dispatch(signup(data));
        break;
      case 2:
        dispatch(registerBusiness(data));
        break;
      case 3:
        dispatch(registerFarm(data));
        navigate("/");
        break;
      default:
        break;
    }
  }, [dispatch, navigate, step]);

  useEffect(() => {
    if (step === 1 && userFetched && !userLoading) {
      nextStep();
    }
    if (step === 2 && businessFetched && !businessLoading) {
      nextStep();
    }
  }, [step, userFetched, businessFetched, userLoading, businessLoading, nextStep]);

  const renderStep = () => {
    switch(step) {
      case 1:
        return <UserRegistration onSubmit={handleRegistration} />;
      case 2:
        return <BusinessRegistration onSubmit={handleRegistration} />;
      case 3:
        return <FarmRegistration onSubmit={handleRegistration} />;
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
}

export default Registration;
