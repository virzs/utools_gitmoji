import { FC } from "preact/compat";

interface CommandIconProps {
  color?: string;
  size?: number;
}

const CommandIcon: FC<CommandIconProps> = (props) => {
  const { color = "#333", size = 16 } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size}>
      <path
        fill={color}
        d="M0 96C0 43 43 0 96 0s96 43 96 96v32H320V96c0-53 43-96 96-96s96 43 96 96s-43 96-96 96H384V320h32c53 0 96 43 96 96s-43 96-96 96s-96-43-96-96V384H192v32c0 53-43 96-96 96s-96-43-96-96s43-96 96-96h32V192H96C43 192 0 149 0 96zm128 32V96c0-17.7-14.3-32-32-32S64 78.3 64 96s14.3 32 32 32h32zm64 192H320V192H192V320zm-64 64H96c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32V384zm256 0v32c0 17.7 14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32H384zm0-256h32c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32v32z"
      />
    </svg>
  );
};
export default CommandIcon;
