import { createContext, useState } from "react";
import { Dialog } from "@headlessui/react";

export const FeedbackContext = createContext();

export default function FeedbackContextProvider({ children }) {
  const [modalData, setModalData] = useState({ state: false });

  function createModal(modalContent) {
    setModalData({
      state: true,
      content: modalContent,
    });
  }

  function closeModal() {
    setModalData({ state: false });
  }

  return (
    <>
      <FeedbackContext.Provider value={{ createModal, closeModal }}>
        {children}
        <Dialog
          open={modalData?.state}
          onClose={() => setModalData({ state: false })}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/20">
            <Dialog.Panel className="shadow-md bg-white rounded">
              {modalData?.content}
            </Dialog.Panel>
          </div>
        </Dialog>
      </FeedbackContext.Provider>
    </>
  );
}
