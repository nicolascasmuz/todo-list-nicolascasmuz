import Button from "@mui/material/Button";

export function LoginButton({ children, onClick }: any) {
  return (
    <Button variant="contained" onClick={onClick}>
      {children}
    </Button>
  );
}
