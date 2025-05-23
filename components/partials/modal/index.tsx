import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
  className?: {
    dialogContent?: string;
  };
}

export default function Modal({ open, children, onOpenChange }: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-[650px]"
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only"></DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-6 md:p-10" aria-describedby={undefined}>
        <DialogTitle className="sr-only"></DialogTitle>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
