import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  FormErrorMessage,
  VStack,
  useToast,
  Toast,
} from "@chakra-ui/react";
import { loginUrl } from "../../url";
import { handleSubmit } from "../../helperFunctions/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [triedEmail, setTriedEmail] = useState([]); // stores set of email which have been tried
  const [triedPassword, setTriedPassword] = useState([]); // stores set of passwords which have been tried
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();
  const Toast = useToast();

  /**
   *
   * email and password empty check
   */
  function isTrue() {
    if (Object.values(error).includes(true)) return true;
    else if (error.email !== "" || error.password !== "") return true;
    else return false;
  }
  return (
    <VStack spacing="5px">
      <FormControl isRequired isInvalid={error.email}>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                e.target.value
              ) === false
            ) {
              setError({ ...error, email: "invalid Email-Id" });
            } else if (triedEmail.includes(e.target.value)) {
              setError({
                ...error,
                email: "User with this emailId doesnt exists! try registering",
              });
            } else {
              setError({ ...error, email: "" });
            }
          }}
        />
        <FormErrorMessage>{error.email}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={error.password}>
        <FormLabel>Password</FormLabel>
        <Input
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value === "")
              setError({ ...error, password: "password cant be empty" });
            else setError({ ...error, password: "" });
          }}
        />
        <FormErrorMessage>{error.password}</FormErrorMessage>
      </FormControl>

      <Button
        mt="5"
        w="100%"
        colorScheme="blue"
        type="submit"
        isDisabled={isTrue() ? true : false}
        isLoading={isLoading}
        onClick={() => {
          handleSubmit(
            email,
            setEmail,
            password,
            setPassword,
            error,
            setError,
            triedEmail,
            setTriedEmail,
            triedPassword,
            setTriedPassword,
            setIsLoading,
            Toast,
            Navigate
          );
        }}
      >
        Submit
      </Button>
      
    </VStack>
  );
};


export default Login;