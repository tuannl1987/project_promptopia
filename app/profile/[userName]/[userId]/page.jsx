'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation'

import Profile from "@components/profile";

const UserProfile = () => {
    // Route -> /profile/[userName]/[userID]
    // URL -> /profile/ABC/123
    // `params` -> { userName: 'ABC', userId: '123' }
    const {userName, userId} = useParams();

    // get post from user
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch('/api/users/' + userId + '/posts');
          const data = await response.json();
    
          setPosts(data);
        }
    
        if(userId) fetchPosts();
      }, []);

    return (
        <Profile 
            name={userName}
            desc={'Welcome to ' + userName + ' profile'}
            data={posts}
        />
    )
}

export default UserProfile;