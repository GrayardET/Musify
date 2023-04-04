import { loader } from '../assets';

const Loader = ({title}) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img src={loader} alt="loading" className="w-32 h-32 object-contain"></img>
    <h2 className="text-3xl text-white font-bold pt-3 ">{title}</h2>
  </div>
  
);

export default Loader;
