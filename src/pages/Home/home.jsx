import './home.css'
import { Link } from 'react-router-dom';
import Menu from './Menu/menu';

const Home = () => {
  return (
    <div className='homewrapper h-screen w-screen'>
      <Menu /> 
    </div>
  );
};

export default Home;