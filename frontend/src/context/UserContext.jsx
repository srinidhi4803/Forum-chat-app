import { createContext, useState } from "react";
import PropTypes from "prop-types";
const UserContext = createContext();

const UserProvider = ({children}) => {
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <UserContext.Provider value={{ userData, setUserData, isLogin, setIsLogin }}>
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default { UserContext, UserProvider };
