import React, { useEffect, useState } from 'react'
import Header from '../components/home/header'
import { Box, Spinner, Text } from '@chakra-ui/react'

import Post from '../components/home/posts/post'
import { getPostsUrl, getSearchResultsUrl } from '../url'
import LruCache from '../lruCache'
const lruCache = new LruCache()


const Home = () => {
    const [isModelOpen,setIsModelOpen] = useState(false)
    const [posts,setPosts] = useState([])
    const [searchText,setSearchText] = useState("")
    const [allPost,setAllPost] = useState([])
    const user = JSON.parse(localStorage.getItem('user')) || null
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
     fetchPosts(setPosts,setAllPost)
    },
    [])
    useEffect(()=>{
      if(searchText=="") {
        setPosts(allPost)
        return
      }
      
        let data = lruCache.retrieveData(searchText)
        console.log("data"+data,lruCache)
        if(data!=null){
          setPosts(data)
          return
        }
        
      
      let timeout = setTimeout(()=>{
        setLoading(true)
      getSearchResults(setPosts,searchText,lruCache,setLoading)},200)

      return()=>{
          clearTimeout(timeout)
      }
    },[searchText])
    console.log("posts",searchText,posts)
  return (
    <Box minH={"100vh"} bgColor={"gray.200"} display={"flex"} flexDir={"column"}>
        <Header user={user} setSearchText={setSearchText}/>
        {<Box bgColor={loading?"black":"none"} opacity={loading?"10%":""}>
           <Post posts={posts} setPosts={setPosts} searchText={searchText} isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} user={user}/>
           
           </Box>
           }
        {searchText&&!posts.length&&<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
         <Text  alignSelf={"center"} fontSize={"x-large"} fontWeight={"semibold"}> Be the First To write about this....</Text>
        </Box>}
       {loading&& <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.900'
              size='xl'
              zIndex={"10px"}
              position={"fixed"}
              top={"20%"}
              left={"50%"}
/>}
    </Box>
  )
}

export default Home


async function fetchPosts(setPosts,setAllPost,){
  try{
      let data = await fetch(getPostsUrl)
      let dataJson = await data.json()
     if(data.status==200) {
      let arr =dataJson.message.reverse()
      setPosts(arr)
      setAllPost(arr)
    
    }
      console.log(dataJson?.message)
  }
  catch(e){ console.log(e)}

}


async function getSearchResults(setPosts,searchText,lruCache,setLoading){
  try{
    let data = await fetch(getSearchResultsUrl+searchText)
    let dataJson = await data.json()
    setLoading(false)
    
   if(data.status==200) {
    // dataJson.message.map((data)=>{
    //   const regex = new RegExp(`(${searchText})`, 'gi');
    //   console.log("regex: " + regex)
    //   const highlightedText = data?.content?.replace(regex, '<span style="background-color: red;">$1</span>' )
    //   delete data.content
    //   data.content = highlightedText
    // })
   lruCache.addData(searchText,dataJson.message)
    setPosts(dataJson.message)}
    console.log(dataJson?.message)
}
catch(e){
  setLoading(false)
  console.log(e)}
}