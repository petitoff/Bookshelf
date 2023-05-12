import mainStyles from "../../../styles/MainStyles.module.scss";

interface Props {
  isFullHeightOfSite?: boolean;
}

/**
 * Need a 100vh container to center the loading indicator
 */
const LoadingIndicator = ({ isFullHeightOfSite }: Props) => {
  return (
    <div
      className={mainStyles.loadingContainer}
      style={{ height: `${isFullHeightOfSite && "calc(100vh - 100px)"}` }}
    >
      <div className={mainStyles.loading} />
    </div>
  );
};

export default LoadingIndicator;
