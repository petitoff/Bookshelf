import mainStyles from "../../../styles/MainStyles.module.scss";

const LoadingIndicator = () => {
  return (
    <div className={mainStyles.loadingContainer}>
      <div className={mainStyles.loading} />
    </div>
  );
};

export default LoadingIndicator;
