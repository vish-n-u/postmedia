import { Avatar, Box,Text } from '@chakra-ui/react'
import React from 'react'

const Comment = ({comment}) => {
  return (
    <Box key={comment._id} display={"flex"} my={{lg:4,md:4,base:1}} p={{lg:4,md:4,base:1}}  w={"90%"} >
                    <Avatar   mx={{lg:4,md:4,base:1}} mr={2} name={comment.userId.userName} src={comment.userId.userPic} />
                    <Box bgColor={"gray.100"} p={4} pt={0} w={"90%"} borderRadius={5} display={"flex"} flexDir={"column"}>
                      <Text mt={2} fontSize={"large"} fontWeight={"semibold"}>{comment.userId.userName}</Text>
                      <Text  fontSize="lg" p={4} whiteSpace="pre-line">{comment.comment}</Text>
                    </Box>
          </Box>
  )
}

export default Comment