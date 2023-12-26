import { loginUrl, registerUrl } from "../url";

/**
 * Logs in the user and handles success and failure scenarios.
 *@returns {Object} An object containing either token and user details (in case of success) or an error message (in case of failure).
 * If login is successful, the token and user details are stored in localStorage and a success Toast is displayed.
 *  If login fails due to incorrect email or password, the corresponding input field will be cleared and an error Toast will be displayed.
 *
 */
 export async function handleSubmit(
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
  ) {
    setIsLoading(true);
  
    if (
      email === "" ||
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
    ) {
      setError({ ...error, email: "Invalid Email!" });
      Toast({
        status: "error",
        title: "Error",
        description: "Invalid Email!",
        duration: 5000,
      });
      setIsLoading(false);
      return;
    } else if (password === "") {
      setError({ ...error, password: true });
      Toast({
        title: "Error",
        description: "Password cant be empty!",
        status: "error",
        duration: 5000,
      });
      setIsLoading(false);
      return;
    } else {
      const data = await fetch(loginUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const dataJson = await data.json();
  
      setIsLoading(false);
      if (data.status === 200) {
        Toast({
          status: "success",
          title: "Success",
          description: "Login Successful",
          duration: 5000,
        });
        
        localStorage.setItem("user", JSON.stringify(dataJson.message));
        window.location.href = "/"
      } else if (data.status === 400) {
        if (dataJson.message.email) {
          setError({
            ...error,
            email: "Email doesnt exists try registering in!",
          });
          let arr = [...triedEmail];
          arr.push(email);
          setTriedEmail(arr);
          setEmail("");
          Toast({
            status: "error",
            title: "error",
            description: " Email doesnt exists try registering in",
            duration: 5000,
          });
        } else if (dataJson.message.password) {
          setError({ ...error, password: "Incorrect Password!" });
          let arr = [...triedPassword];
          arr.push(triedPassword);
          setTriedPassword(arr);
          setPassword("");
          Toast({
            status: "error",
            title: "error",
            description: "Incorrect Password!",
            duration: 5000,
          });
        }
      } else if (data.status === 500) {
        Toast({
          status: "error",
          title: "Server Error",
          description: "Please refresh and retry",
          duration: 5000,
        });
        setIsLoading(false);
        return;
      }
    }
  }
  /**
   * Logs in the Guest User and handles success and failure scenarios.
   *@returns {Object} An object containing either token and user details (in case of success) or an error message (in case of failure).
   * If login is successful, the token and user details are stored in localStorage and a success Toast is displayed.
   *  If login fails because of internal server err, an err message is displayed
   *
   */
   


   /**
 * Registers in the Guest User and handles success and failure scenarios.
 *@returns {Object} An object containing a message of the error (in case of failure) .
 * If register is successful, a success Toast is displayed.
 * If register fails because of some err, the err is added into th err State variable.
 *
 */
export async function handleSubmitRegister(
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    picture,
    setPicture,
    error,
    setError,
    triedEmail,
    setTriedEmail,
    setLoading,
    setIndex,
    Toast
  ) {
    setLoading(true);
    // check if name is empty , if yes then show err
    if (name === "") {
      setError({ ...error, name: true });
      setLoading(false);
      return;
    }
    // check if email is incorrect or check whether it was tried earlier,if yes then show err
    else if (
      email === "" ||
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
    ) {
      setError({ ...error, email: true });
      setLoading(false);
      return;
    } // same as above
    else if (password === "") {
      setError({ ...error, password: true });
      setLoading(false);
      return;
    } else if (password !== confirmPassword) {
      setError({
        ...error,
        confirmPassword: "confirm password does not match your password.",
      });
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      return;
    } else {
      // make a request to the server
      const data = await fetch(registerUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
          pic: picture,
        }),
      });
      const dataJson = await data.json();
      setLoading(false);
  
      if (data.status === 201) {
        Toast({
          status: "success",
          title: "Registered successfully",
          duration: 3000,
        });
  
        // setIndex(0);
        localStorage.setItem("user", JSON.stringify(dataJson.message));
  
        window.location.href ="/"
      } else if (data.status === 400) {
        if (dataJson.message.email) {
          setError({ ...error, email: "Email already exists try logging in!" });
          let arr = [...triedEmail];
          arr.push(email); // makes sure that a call request is not sent
          setTriedEmail(arr);
          setEmail("");
          Toast({
            status: "error",
            title: "Email Id already exists!", 
            duration: 3000,
          });
        }
        
      } else if (data.status === 500) {
        setLoading(false);
        Toast({
          status: "error",
          title: "Internal server error",
          duration: 3000,
        });
  
        return;
      }
    }
  }