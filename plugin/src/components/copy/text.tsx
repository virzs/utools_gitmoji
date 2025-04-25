import { css } from "@emotion/css";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "preact/compat";

interface CopyTextProps {
  children?: string;
}

const CopyText: FC<CopyTextProps> = (props) => {
  const { children } = props;

  return (
    <span
      className={css`
        &:hover > span {
          opacity: 100;
        }
      `}
    >
      {children}
      {children && (
        <span
          className="ml-1 text-xs cursor-pointer opacity-0 transition-all"
          title="复制"
          onClick={() => {
            if (!children) return;
            utools.copyText(children);
            utools.showNotification(`复制成功 ${children}`);
          }}
        >
          <FontAwesomeIcon icon={faCopy} />
        </span>
      )}
    </span>
  );
};

export default CopyText;
