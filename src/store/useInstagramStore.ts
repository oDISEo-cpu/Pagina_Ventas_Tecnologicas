import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface InstagramPost {
  id: number;
  image: string;
  likes: number;
  comments: number;
}

const defaultPosts: InstagramPost[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=400&q=80", likes: 234, comments: 18 },
  { id: 2, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80", likes: 189, comments: 12 },
  { id: 3, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", likes: 312, comments: 25 },
  { id: 4, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80", likes: 156, comments: 8 },
  { id: 5, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80", likes: 428, comments: 34 },
  { id: 6, image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&q=80", likes: 267, comments: 21 },
];

interface InstagramStore {
  posts: InstagramPost[];
  updatePost: (id: number, image: string) => void;
  addPost: (image: string) => void;
  removePost: (id: number) => void;
}

export const useInstagramStore = create<InstagramStore>()(
  persist(
    (set) => ({
      posts: defaultPosts,
      
      updatePost: (id, image) => set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, image } : post
        ),
      })),
      
      addPost: (image) => set((state) => {
        const maxId = state.posts.reduce((max, post) => Math.max(max, post.id), 0);
        const newPost: InstagramPost = {
          id: maxId + 1,
          image,
          likes: Math.floor(Math.random() * 300) + 50,
          comments: Math.floor(Math.random() * 30) + 5,
        };
        return { posts: [...state.posts, newPost] };
      }),
      
      removePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      })),
    }),
    {
      name: 'iphonelecheria-instagram',
    }
  )
);
