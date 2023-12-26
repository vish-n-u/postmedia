import React, { useEffect, useState } from 'react'

import {Avatar, Box, Text, Textarea} from "@chakra-ui/react"
import SiglePostComponent from './siglePostComponent';
const PostBody = ({posts,user,searchText}) => {
    console.log("updated posts","search text",searchText)
    
  return (
   <Box  mt={10} display={"flex"} flexDir={"column"}  alignItems={"center"}>
    {
        posts?.length>0&&
        <Box w={{lg:"50%",md:"50%",base:"100%"}}  display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
            {
                posts.map((post)=>{
                    console.log("post",post)
                    return <SiglePostComponent   key={post._id} post={post} user={user}/>
                }
                
                )
            }
        </Box>
    }
    
   </Box>
  )
}




export default PostBody