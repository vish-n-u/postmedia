import { Avatar, Box, Button, Image, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo.png"
import { AiFillHome } from "react-icons/ai";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { SearchIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";

const Header = ({user,setSearchText}) => {
  const [screenSize,setScreenSize] =useState({})
  const [showNavbar,setShowNavbar] = useState({})
  useEffect(() => {
    function handleResize() {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Initial screen size
    handleResize();

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("screenSize---", screenSize);
  return (
    <>
    <Box boxShadow='base' bgColor={"white"} height={"24"} display={"flex"} justifyContent={"space-around"} alignItems={"center"}>
        <Box w={{base:"80%",lg:"50%"}}  display={"flex"}  alignItems={"center"}>
        <Image src={logo} alt="logo.png" h={20} w={20} />
        <InputGroup mx={{base:"5",lg:"14"}} w={{base:"50%",lg:"50%"}} minW={44}>
            <InputLeftElement pointerEvents='none'>
            <SearchIcon  color='gray.300' />
            </InputLeftElement>
            <Input type='text' onChange={(e)=>setSearchText(e.target.value)} placeholder='Search Posts/Comments' />
        </InputGroup>
        </Box>
        {/* <Text alignSelf={"self-end"}>Post Media</Text> */}
        {screenSize.width>680?<Box w={"30%"} display={"flex"} alignItems={"center"}  justifyContent={"center"}>
            <AiFillHome size={30}/>
            <IoIosNotificationsOutline  size={34} style={{marginLeft:"25px",marginRight:"25px"}}/>
            { user?
              <Avatar  name={user.userName} src={user.pic}  />:
              <Button > <Link to="/auth">Login</Link></Button>
              }
        </Box>:
            <Text cursor={"pointer"} fontSize={"x-large"} fontWeight={"bold"} onClick={()=>setShowNavbar(!showNavbar)}>=</Text>
        
        }
        
    </Box>
    <Box display={'flex'} flexDir={"column"}>
    {showNavbar&&screenSize.width<680&&<Box w={"full"} p={3} bgColor={"blue.200"} mt={2} display={"flex"} alignItems={"center"}  justifyContent={"center"}>
    <AiFillHome size={30}/>
    <IoIosNotificationsOutline  size={34} style={{marginLeft:"25px",marginRight:"25px"}}/>
    { user?
      <Avatar  name={user.userName} src={user.pic}  />:
      <Button > <Link to="/auth">Login</Link></Button>
      }
</Box>}
</Box>
</>
  )
}

export default Header