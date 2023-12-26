import { Avatar, Box, Button, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'

const AddPost = ({setIsModelOpen,user}) => {
  return (
    <Box  mt={10} w={"100%"} h={28} display={"flex"} justifyContent={"center"}>
        <Box w={"xl"} p={5} bgColor={"white"} display={'flex'} alignItems={"center"} borderWidth={1} borderRadius={20} borderColor={"gray.300"}>
        {user&&<Avatar  name={user?.userName} src={user.pic} />}
       {user? <Button  onClick={()=>setIsModelOpen(true)} colorScheme='gray' variant={"outline"} borderRadius={44} mx={5} w={"80%"} p={6} textAlign={'end'} display={"flex"} justifyContent={"flex-start"}>
            <Text textAlign={'left'}  color={"gray.600"}>
                Start a post
            </Text>
        </Button>
      :
            <Tooltip label="Sign-In to create a new post" fontSize={"lg"} aria-label='A tooltip' borderRadius={5}  variant={"outline"} p={5} w={"80%"} >
                <Text w="80%" mx={8} textAlign={'left'}  color={"gray.600"}>
                              Start a post
                </Text>
            </Tooltip>  
      
      }
        </Box>

    </Box>
  )
}

export default AddPost