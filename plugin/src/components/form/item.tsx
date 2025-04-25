import { FC } from "preact/compat";

interface FormItemProps {
  label?: string;
  description?: string;
  children?: any;
}

const FormItem: FC<FormItemProps> = (props) => {
  const { label, description, children } = props;

  return (
    <div className="flex justify-between items-center mb-2 border-b pb-2 border-b-[#e7eaed] dark:border-b-[#2b2c2d] select-none last:border-b-0 last:mb-0 last:pb-0">
      <div className="text-black dark:text-white">
        <p className="text-sm">{label}</p>
        <p class="text-xs text-gray-800 dark:text-gray-400">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default FormItem;
