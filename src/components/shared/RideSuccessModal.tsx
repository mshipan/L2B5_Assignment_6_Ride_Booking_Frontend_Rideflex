import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: string;
  buttonLabel?: string;
  onButtonClick: () => void;
}

const RideSuccessModal = ({
  open,
  onOpenChange,
  title = "Status",
  message,
  buttonLabel = "Okay",
  onButtonClick,
}: SuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center">
          <p>{message}</p>
        </div>
        <DialogFooter>
          <Button onClick={onButtonClick} className="w-full cursor-pointer">
            {buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RideSuccessModal;
