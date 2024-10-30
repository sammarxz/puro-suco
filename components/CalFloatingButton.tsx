import { Button } from "@/components/Button.tsx";

export function CalFloatingButton() {
  return (
    <Button
      as="a"
      buttonSize="lg"
      href=""
      variant="secondary"
      className="fixed bottom-12 right-12 z-50"
    >
      Reserve sua mentoria
    </Button>
  );
}
