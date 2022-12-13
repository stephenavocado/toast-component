import React from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");
  const [toasts, setToasts] = React.useState([]);

  useEscapeKey(() => {
    setToasts([]);
  });

  function createToast(event) {
    event.preventDefault();

    const newToast = {
      id: Math.random(),
      variant: variant,
      message: message,
    };

    setToasts([newToast, ...toasts]);
    setMessage("");
    setVariant("notice");
  };

  function clearToast(id) {
    const newToasts = toasts.filter(toast => toast.id !== id);
    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        message, 
        setMessage,
        variant, 
        setVariant,
        toasts, 
        setToasts,
        createToast,
        clearToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
