import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/post-details/:id" element={<PostDetailsPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Frontend/
// │
// ├── src/
// │   ├── api/
// │   │   ├── axios.ts
// │   │   ├── authApi.ts
// │   │   └── postApi.ts
// │   │
// │   ├── components/
// │   │   ├── common/
// │   │   │   ├── Button.tsx
// │   │   │   └── Input.tsx
// │   │   │
// │   │   ├── posts/
// │   │   │   ├── PostCard.tsx
// │   │   │   └── PostComposer.tsx
// │   │   │
// │   │   └── users/
// │   │
// │   ├── pages/
// │   │   ├── HomePage.tsx
// │   │   ├── ProfilePage.tsx
// │   │   ├── LoginPage.tsx
// │   │   └── RegisterPage.tsx
// │   │
// │   ├── hooks/
// │   │   ├── useAuth.ts
// │   │   └── usePosts.ts
// │   │
// │   ├── store/
// │   │   └── authStore.ts
// │   │
// │   ├── types/
// │   │   ├── Post.ts
// │   │   └── User.ts
// │   │
// │   ├── utils/
// │   │
// │   ├── App.tsx
// │   └── main.tsx
