import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface InstagramPost {
  id: number;
  image: string;
  likes: number;
  comments: number;
}

interface InstagramState {
  posts: InstagramPost[];
  initialized: boolean;
  initialize: () => void;
  addPost: (post: Omit<InstagramPost, 'id'>) => void;
  updatePost: (id: number,  { image?: string; likes?: number; comments?: number }) => void;
  deletePost: (id: number) => void;
}

const defaultPosts: InstagramPost[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=400&q=80", likes: 234, comments: 18 },
  { id: 2, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80", likes: 189, comments: 12 },
  { id: 3, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", likes: 312, comments: 25 },
  { id: 4, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80", likes: 156, comments: 8 },
  { id: 5, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80", likes: 428, comments: 34 },
  { id: 6, image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&q=80", likes: 267, comments: 21 },
];

export const useInstagramStore = create<InstagramState>()(
  persist(
    (set, get) => ({
      posts: defaultPosts,
      initialized: false,

      initialize: () => {
        if (get().initialized) return;
        set({ initialized: true });
      },

      addPost: (postData) => {
        const posts = get().posts;
        const maxId = posts.reduce((max, p) => Math.max(max, p.id), 0);
        const newPost: InstagramPost = {
          ...postData,
          id: maxId + 1,
        };
        set({ posts: [...posts, newPost] });
      },

      updatePost: (id, data) => {
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        }));
      },

      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
        }));
      },
    }),
    {
      name: 'iphonelecheria-instagram',
    }
  )
);
