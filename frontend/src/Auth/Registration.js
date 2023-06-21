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
    console.log("Rendering Registration component, current step: ", step);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userFetched = useSelector((state) => state.user.fetched);
    const businessFetched = useSelector((state) => state.business.fetched);    
    const userLoading = useSelector((state) => state.user.loading);
    const businessLoading = useSelector((state) => state.business.loading);


  const nextStep = useCallback(() => {
    console.log("nextStep is being called");
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
        console.log("Dispatching registerFarm action with data: ", data)
        dispatch(registerFarm(data));
        navigate("/");
        break;
      default:
        break;
    }
  }, [dispatch, navigate, step]);

  useEffect(() => {
    if (step === 1 && userFetched && !userLoading) {
      console.log("userFetched is true and userLoading is false, incrementing step");
      nextStep();
    }
    if (step === 2 && businessFetched && !businessLoading) {
      console.log("businessFetched is true and businessLoading is false, incrementing step");
      nextStep();
    }
  }, [step, userFetched, businessFetched, userLoading, businessLoading, nextStep]);

  const renderStep = () => {
    console.log("Current step: ", step);
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
