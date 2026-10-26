import type { User } from "../../types/user";
import { getProfileImageUrl } from "../../utils/imageUtils";

interface Props {
  user: User;
  className?: string;
  alt?: string;
  onClick?: () => void;
}

const Avatar = ({
  user,
  className = "profile-picture",
  alt = "Profile Picture",
  onClick,
}: Props) => {
  return (
    <img
      className={className}
      src={getProfileImageUrl(user.profileImageUrl)}
      alt={alt}
      onClick={onClick}
    />
  );
};

export default Avatar;
