import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  List,
  ListItem,
  Select,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "../layouts/NavLinks";
import { userUpdate, User } from "../types/index";


const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userUpdate, setUserUpdate] = useState<User>();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  


  const [displayModifier, setDisplayModifier] = useState<boolean>(false);

  function deleteUser(id: number) {
    axios.delete(`http://localhost:3009/users/${id}`).then((res) => {
      navigate(0);
    });
  }

  function updateUser(id: number, data: userUpdate) {
    axios.put(`http://localhost:3009/users/${id}`, data).then((res) => {
      navigate(0);
    });
  }
  function CreateUser() {
    axios
      .post("http://localhost:3009/users/", {
        
        username: usernameRef?.current?.value,
        
      })
      .then((res) => {
        // console.log(res);
        navigate(0);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3009/users", {
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  

  return (
    <>
      <HStack>
        <NavLinks />
      </HStack>
      <Heading>Welcome Users Page</Heading>
      <Button
        onClick={() => {
          setDisplayModifier(true);
        }}
      >
        Créer un user
      </Button>
      {displayModifier && users &&
         (
          <Center>
            <h1>Creation de user</h1>

            <VStack gap="5">
              
              <Input
                ref={usernameRef}
                type="text"
                maxW={"100%"}
                placeholder={"Username"}
              />
              

              <Button
                colorScheme="teal"
                onClick={() => {
                  CreateUser();
                }}
              >
                CRÉER
              </Button>
            </VStack>
          </Center>
        )}
      <List>
        {users &&
          users.map((user) => (
            <Fragment key={user.id}>
              <HStack>
                <ListItem>{user.id}</ListItem>
                <ListItem>{user.username}</ListItem>
                
                
                <Button onClick={() => deleteUser(user.id)}>🗑️</Button>
                <Button
                  onClick={() => {
                    setUserUpdate(user);
                    setDisplayModifier(true);
                  }}
                >
                  🛠️
                </Button>
              </HStack>
            </Fragment>
          ))}
        {userUpdate && !displayModifier && (
          <Center>
            <h1>MODIFICATION DE {userUpdate.username}</h1>

            <VStack gap="5">
              <Input
                type="username"
                maxW={"70%"}
                value={userUpdate.username}
                onChange={(e) => {
                  setUserUpdate({ ...userUpdate, username: e.target.value });
                }}
              />
            
              
             

              <Button
                colorScheme="teal"
                onClick={() => {
                  updateUser(userUpdate.id, {
                    username: userUpdate.username,
                    
                  });
                }}
              >
                Update
              </Button>
            </VStack>
          </Center>
        )}
      </List>
    </>
  );
};
export default Users;
