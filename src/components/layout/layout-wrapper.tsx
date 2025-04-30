import { Outlet } from "react-router-dom";

const LayoutWrapperComponent = () => {
  
  return (
    <> 
    <p>Your Header</p>
    <Outlet />
    </>
    
  );
};

export default LayoutWrapperComponent;
