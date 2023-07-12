import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFarm } from '../store/actions/farmActions';
import { setBusiness } from '../store/actions/businessActions';
import { login } from '../store/actions/userActions';
import SeedMoneyApi from '../SeedMoneyApi';
import Form from '../components/Form';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const userId = user ? user.id : null;

    const formFields = [
        {name: 'email', type: 'email', label: 'Email'},
        {name: 'password', type: 'password', label: 'Password'},
    ];

    const handleLogin = async (formData) => {
        try {
          await dispatch(login(formData));
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        const fetchData = async () => {
          if (userId) {
            try {
              const userFarm = await SeedMoneyApi.getUserFarms(userId);
              await dispatch(setFarm(userFarm));
              const userBusiness = await SeedMoneyApi.getUserBusinesses(userId);
              await dispatch(setBusiness(userBusiness));
              navigate('/');
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          }
        };
    
        fetchData();
      }, [userId, dispatch]);

    return (
        <Form fields={formFields} onSubmit={handleLogin} buttonText="Login" />
    );
};

export default Login;
