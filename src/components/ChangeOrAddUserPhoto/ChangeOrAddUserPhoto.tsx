import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ChangeEvent, useRef } from "react";
import useUpdateUserProfilePhoto from "../../hooks/dataHooks/userDataHooks/useUpdateUserProfilePhoto";
import { useAppSelector } from "../../hooks/hooks";

const StyledUserImage = styled.div`
  position: relative;
  padding: 16px;

  .user-icon-when-userImg-is-empty {
    width: 5rem;
    height: 5rem;
    cursor: pointer;

    &:hover {
      color: #007bff;
    }
  }

  .plusIcon {
    display: none;
    position: absolute;
    font-size: 24px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 39px;
    z-index: 1;
    top: 15px;
    left: 15px;
    cursor: pointer;
  }

  img {
    position: relative;
    width: 100px;
    height: 100px;
    margin-right: 16px;
    margin-bottom: 10px;
    border-radius: 50%;
    object-fit: cover;
  }

  img:hover {
    cursor: pointer;
    box-shadow: 0 0 0 3px #007bff;
  }

  img:hover ~ .plusIcon,
  .plusIcon:hover {
    display: inline-flex;
    box-shadow: 0 0 0 3px #007bff;
  }
`;

export const ChangeOrAddUserPhoto = () => {
  const user = useAppSelector((state) => state.auth.user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { updateUserProfilePhoto } = useUpdateUserProfilePhoto();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user?.UID) {
      await updateUserProfilePhoto(file);
    }
  };

  const handleUserPhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <StyledUserImage>
      {user?.imageUrl && user?.imageUrl !== "" ? (
        <img src={user.imageUrl} alt="" onClick={handleUserPhotoClick} />
      ) : (
        <AccountCircleIcon
          className="user-icon-when-userImg-is-empty"
          onClick={handleUserPhotoClick}
        />
      )}
      <i className="plusIcon">
        <FaPlusCircle />
      </i>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </StyledUserImage>
  );
};
