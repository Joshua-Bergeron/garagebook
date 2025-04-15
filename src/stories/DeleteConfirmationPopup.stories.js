import DeleteConfirmationPopup from "@/components/DeleteConfirmationPopup";

export default {
  title: "Delete Confirmation Popup",
  component: DeleteConfirmationPopup,
};

export const DeleteConfirmation = {
  args: {
    isOpen: true,
    onClose: () => {},
    onDelete: () => {},
  },
};
