import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavLinks = () => {
  const modeprev = localStorage.getItem("mode");
  const [mode, setMode] = useState<boolean>(true);
  const location = useLocation();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.state) {
  //     toggleAuthentication();
  //   }
  // }, [location]);

  // const toggleAuthentication = () => {
  //   setIsAuthenticated((prev) => !prev);
  // };

  return (
    <ButtonGroup gap={4}>
      <>
        <Button colorScheme="teal">
          <Link to="/users">Users</Link>
        </Button>
        <Button colorScheme="teal">
          <Link to="/todo">Todo</Link>
        </Button>
      </>
    </ButtonGroup>
  );
};

export default NavLinks;
