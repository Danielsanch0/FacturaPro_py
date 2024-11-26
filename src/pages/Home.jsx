
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Login');
    }, 1000); // Redirigir después de 5 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
  }, [navigate]);

  return (
    
  <div className="home-container">
    
    <img src="/img/loginPro.jpeg" alt="Logo" className="logo" />

  </div>
);


};

export default Home;

