import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
  classes?: {
    dialogContent?: string;
  };
}

export default function Modal({ open, children, onOpenChange, classes }: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn("sm:max-w-[650px]", classes?.dialogContent)}
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
