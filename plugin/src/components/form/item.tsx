/*
 * @Author: vir virs98@outlook.com
 * @Date: 2023-01-10 14:02:38
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2023-01-10 16:31:33
 */

import { FC } from "preact/compat";

interface FormItemProps {
  label?: string;
  description?: string;
  children?: any;
}

const FormItem: FC<FormItemProps> = (props) => {
  const { label, description, children } = props;

  return (
    <div className="flex justify-between items-center mb-2 border-b pb-2">
      <div className="text-black dark:text-white">
        <p className="text-base">{label}</p>
        <p class="text-xs text-gray-800 dark:text-gray-400">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default FormItem;
