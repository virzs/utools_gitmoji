import classNames from "classnames";
import { FC } from "preact/compat";
import { useEffect, useState } from "preact/hooks";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch: FC<SwitchProps> = (props) => {
  const { checked, onChange } = props;

  const [privValue, setPrivValue] = useState(false);

  useEffect(() => {
    setPrivValue(checked ?? false);
  }, [checked]);

  return (
    <div className="inline-flex items-start relative">
      <input
        className="absolute m-0 opacity-0 h-full cursor-pointer top-0 left-0 w-full z-10"
        type="checkbox"
        checked={privValue}
        onClick={(e: any) => {
          setPrivValue(e.target?.checked);
          onChange && onChange(e.target?.checked);
        }}
      />
      <div
        className={classNames(
          "border border-solid w-10 m-2 p-[1px] rounded-full transition",
          privValue
            ? "dark:bg-[#62abf5] dark:border-[#62abf5] bg-[#115ea3] border-[#115ea3]"
            : "dark:border-[#bdbdbd] border-switch-light"
        )}
      >
        <svg
          fill="currentColor"
          className={classNames(
            "text-lg transition transform",
            privValue
              ? "translate-x-[18px] text-white dark:text-[#242424]"
              : "text-[#575757] dark:text-[#bdbdbd]"
          )}
          aria-hidden="true"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  );
};

export default Switch;
