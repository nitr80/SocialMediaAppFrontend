import { useAuth } from "../hooks/useAuth";


const FeedPage = () => {
    const { user }  = useAuth();
    console.log(user);
  return (
    <div>FeedPage</div>
  )
}

export default FeedPage;