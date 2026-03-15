import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@heroui/react";
import { useParams } from "react-router-dom";
import formatPostTime from './../PostCard/formateDate';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from './../PostCard/PostCard';
import PlaceHolder from './../PlaceHolder/PlaceHolder';
import { Helmet } from "react-helmet";

export default function PostDetail() {
  const { _id } = useParams();


  function getPostDetails(id){

    return axios.get(`https://route-posts.routemisr.com/posts/${id}` ,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('userToken')}`
        }
    })
  }

  const {data , isLoading} = useQuery({
    queryKey:['getPostDetails' ,_id ],
    queryFn: ()=>getPostDetails(_id),
    select:(data)=>data.data.data.post
  })



 if(isLoading){

    return <PlaceHolder/>
 }

  return (
    <>
    <Helmet>
      <title>{data.user?.name}'s Posts</title>
    </Helmet>
      <PostCard post={data} isPostDetails/>
    </>
  );
}
