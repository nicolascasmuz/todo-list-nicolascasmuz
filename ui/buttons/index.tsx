import Button from "@mui/material/Button";

export function LoginButton(props) {
  return (
    <Button
      variant={props.variant}
      color={props.color}
      size={props.size}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
