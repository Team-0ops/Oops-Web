import { useEffect, useState } from "react";
import { getMyPosts } from "../../apis/Post/postMy";
import {MyPost} from "../../types/post";

const useGetMyPost = () => {
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // 마운트 시 내 게시물 불러오기
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        const res = await getMyPosts();

        setPosts(res.result);
      } catch (e) {
        console.error(e);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);
    return { posts, loading };
};

export default useGetMyPost;