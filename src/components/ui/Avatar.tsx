import type { User } from "../../types/user";
import { getProfileImageUrl } from "../../utils/imageUtils";

interface Props {
  user: User;
  className?: string;
  alt?: string;
}

const Avatar = ({
  user,
  className = "profile-picture",
  alt = "Profile Picture",
}: Props) => {
  return (
    <img
      className={className}
      src={getProfileImageUrl(user.profileImageUrl)}
      alt={alt}
    />
  );
};

export default Avatar;
