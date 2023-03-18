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
import { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavLinks from "../layouts/NavLinks";
import { Todo } from "../store/express";
import { todosUpdate } from "../types";
import { Todos } from "../types";

const Todoss = () => {
  const [displayModifier, setDisplayModifier] = useState<boolean>(false);
  
  const [displayModiTod, setDisplayModiTod] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const [todo, setTodo] = useState<Todos[]>([]);
  const [todoUpdate, setTodoUpdate] = useState<Todos>();
 

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3009/todo/", {}).then((res) => {
      setTodo(res.data);
    });
    
  }, []);

  function CreateTodo() {
    axios
      .post("http://localhost:3009/todo/", {
        title: titleRef?.current?.value,
        username: usernameRef?.current?.value,
        
      })
      .then((res) => {
        // console.log(res);
        navigate(0);
      });
  }
  
  function deleteTodo(id: number) {
    axios.delete(`http://localhost:3009/todo/${id}`).then((res) => {
      navigate(0);
    });
  }

  function updateTodo(id: number, data: todosUpdate) {
    axios.put(`http://localhost:3009/todo/${id}`, data).then((res) => {
      navigate(0);
    });
  }
  


  return (
    <>
      <HStack>
        <NavLinks />
      </HStack>
      <Heading>Welcome Todo Page</Heading>
      <Button
        onClick={() => {
          setDisplayModifier(true);
        }}
      >
        Créer un todo
      </Button>
      {displayModifier && !displayModiTod && todo &&
         (
          <Center>
            <h1>Creation de todo</h1>

            <VStack gap="5">
              <Input
                ref={titleRef}
                type="text"
                maxW={"100%"}
                placeholder={"Title"}
              />
              <Input
                ref={usernameRef}
                type="text"
                maxW={"100%"}
                placeholder={"Username"}
              />
              

              <Button
                colorScheme="teal"
                onClick={() => {
                  CreateTodo();
                }}
              >
                CRÉER
              </Button>
            </VStack>
          </Center>
        )}
     
      <List>
        <div>
          <b>Todo :</b>
        </div>
        {todo &&
          todo.map((todo) => (
            <Fragment key={todo.id}>
              <HStack>
                <ListItem>{todo.id}</ListItem>
                <ListItem>{todo.username}</ListItem>
                <ListItem>{todo.title}</ListItem>
               
                <Button onClick={() => deleteTodo(todo.id)}>🗑️</Button>
                <Button
                  onClick={() => {
                    setTodoUpdate(todo);
                    setDisplayModiTod(true);
                  }}
                >
                  🛠️
                </Button>
              </HStack>
            </Fragment>
          ))}
        {todoUpdate &&
          
          !displayModifier && displayModiTod && (
            <Center>
              <h1>
                MODIFICATION DE {todoUpdate.title}
                {todoUpdate.username}
              </h1>

              <VStack gap="5">
                <Input
                  type="text"
                  maxW={"100%"}
                  value={todoUpdate.title}
                  onChange={(e) => {
                    setTodoUpdate({
                      ...todoUpdate,
                      title: e.target.value,
                    });
                  }}
                />
                <Input
                  type="text"
                  maxW={"100%"}
                  value={todoUpdate.username}
                  onChange={(e) => {
                    setTodoUpdate({
                      ...todoUpdate,
                      username: e.target.value,
                    });
                  }}
                />

                

                <Button
                  colorScheme="teal"
                  onClick={() => {
                    updateTodo(todoUpdate.id, {
                      title: todoUpdate.title,
                      username: todoUpdate.username,
                      
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

export default Todoss;
