interface Props {
  username: string;
  customStyle?: React.CSSProperties;
}

const UserReadingListHeader = ({ username, customStyle = {} }: Props) => {
  const styles: React.CSSProperties = {
    color: "#4a80f0",
    ...customStyle,
  };

  return (
    <h1>
      <span style={styles}>@{username}</span> reading list
    </h1>
  );
};

export default UserReadingListHeader;
