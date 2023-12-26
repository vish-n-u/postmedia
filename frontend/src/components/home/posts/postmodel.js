import { Avatar, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, 
  ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, Toast, useDisclosure,useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { createPostUrl, } from '../../../url'
import { createPost } from '../../../helperFunctions/posts'

const PostModel = ({isModelOpen,setIsModelOpen,user,setPosts}) => {
   
  let { isOpen, onOpen, onClose } = useDisclosure()
  const [content,setContent] = useState("")
  const Toast = useToast()
  console.log("Content",content)
    if(isModelOpen) isOpen=true
    if(!isModelOpen) isOpen=false
    if(!isModelOpen) return
        return (
          <>
            <Button hidden={true} w={"50%"} position={"absolute"} top={50}  onClick={onOpen}>Open Modal</Button>
      
            <Modal size="3xl" isOpen={isOpen} onClose={()=>{
                onClose()
                setIsModelOpen(false)
            }}>
              <ModalOverlay />
              <ModalContent >
                {/* <ModalHeader>Modal Title</ModalHeader> */}
                <ModalCloseButton />
                <ModalBody display={'flex'} flexDir={"column"}>
                    <Box display={"flex"} alignItems={"center"}  my={10}>
                        <Avatar   mx={5} name={user.userName} src={user.pic} />
                        <Text fontSize='lg' fontWeight={"bold"}>{user.userName}</Text>
                    </Box>
                    <Textarea onChange={(e)=>{
                      setContent(e.target.value);
                    }} my={5} placeholder='Here is a sample placeholder' value={content}/>
                </ModalBody>
      
                <ModalFooter>
                  <Button variant='ghost' mr={3} onClick={()=>{
                onClose()
                setIsModelOpen(false)
            }}>
                    Close
                  </Button>
                  <Button isDisabled={content.length>10?false:true} onClick={()=>{
                    createPost(content,setContent,isOpen,setIsModelOpen,Toast,user,setPosts)
                  }} colorScheme='blue'>Post</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      

}





export default PostModel