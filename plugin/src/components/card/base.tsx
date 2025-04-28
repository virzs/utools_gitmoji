import { FC } from "preact/compat";

interface BaseCardProps {
  children: any;
  title?: string;
}

const BaseCard: FC<BaseCardProps> = (props) => {
  const { children, title } = props;

  return (
    <div className="dark:bg-dark-active bg-white dark:text-white mb-2 rounded p-3">
      {title && <h1 className="font-bold mb-2">{title}</h1>}
      {children}
    </div>
  );
};

export default BaseCard;
