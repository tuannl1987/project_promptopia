'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
    
        if(session?.user.id) fetchPosts();
      }, []);


    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to detele this prompt?");

      if(hasConfirmed) {
        try {
          const promptId = post._id.toString();

          await fetch(`/api/prompt/${promptId}`, {
            method: 'DELETE'
          });

          const filterPosts = posts.filter((p) => p._id !== post._id);

          setPosts(filterPosts);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
        <Profile 
            name="My"
            desc="Welcome to your personalized profile"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;