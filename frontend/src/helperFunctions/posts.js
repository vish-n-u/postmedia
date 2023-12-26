import { createCommentsUrl, createPostUrl, getCommentsUrl } from "../url";

export async function createPost(content,setContent,isOpen,setIsOpen,Toast,user,setPosts){

    try{
      if(!content||content.length<10){
        return Toast({
          status: "warning",
          title: "Content Cant be empty or less than 10 characters",
          duration: 3000,
          
        })
      }
  console.log("user",user.token,content)
      const data = await fetch(createPostUrl,{
        method :"POST",
        mode: "cors",
        headers:{
          "Authorization": user.token,
          "Content-Type": "application/json",
        },
        body:JSON.stringify({content})
      })
      const dataJson = await data.json();
      if(data.status==201){
        Toast({
          status: "success",
          title: "Created new post successfully",
          duration: 3000,
        });
        isOpen =false
        setIsOpen(false)
        setContent("")
        setPosts((prevPosts)=>[dataJson.message,...prevPosts])
      }
      else{
        
      return Toast({
        status: "error",
        title: "Internal server error",
        duration: 3000,
      });
      }
    }
    catch(e){
      console.log(e);
      return Toast({
        status: "error",
        title: "Internal server error",
        duration: 3000,
      });
    }
  
  }


  export async function createComment(postId,setCurrPosts,content,setContent,Toast,user,setLoading,setShowCommentInput){

    try{
      if(!content||content.length<1){
        return Toast({
          status: "warning",
          title: "Content Cant be empty or less than 10 characters",
          duration: 3000,
          
        })
      }
//   console.log("user",user.token,content)
      const data = await fetch(createCommentsUrl,{
        method :"POST",
        mode: "cors",
        headers:{
          "Authorization": user.token,
          "Content-Type": "application/json",
        },
        body:JSON.stringify({content,postId})
      })
      const dataJson = await data.json();
      setLoading(false)
      if(data.status==201){
        Toast({
          status: "success",
          title: "Created new comment successfully",
          duration: 3000,
        });
        dataJson.message.commentIds.reverse()
       setCurrPosts(dataJson.message);
       console.log(dataJson.message)
      //  setShowCommentInput(false)
        setContent("")
      }
      else{
        
      return Toast({
        status: "error",
        title: "Internal server error",
        duration: 3000,
      });
      }
    }
    catch(e){
      console.log(e);
      return Toast({
        status: "error",
        title: "Internal server error",
        duration: 3000,
      });
    }
  
  }




  export async function getCommentById(postId,setCurrPosts,Toast,user,setLoading){

    try{
     
//   console.log("user",user.token,content)
      const data = await fetch(getCommentsUrl+`/${postId}`)
      const dataJson = await data.json();
      // setLoading(false)
      if(data.status==200){
        dataJson.message?.commentIds?.reverse()
       setCurrPosts(dataJson.message);
      }
      else{
        
      return Toast({
        status: "error",
        title: "Internal server error in fetching comments",
        duration: 3000,
      });
      }
    }
    catch(e){
      console.log(e);
      return Toast({
        status: "error",
        title: "Internal server error",
        duration: 3000,
      });
    }
  
  }
  