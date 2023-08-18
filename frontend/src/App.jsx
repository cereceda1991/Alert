import  { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket'],
});

function App() {
  const handleButtonNotification = (message, type) => {
    socket.emit('notification', { message, type });
  };

  useEffect(() => {
    const showNotification = (message, type) => {
      toast[type](message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      });
    };

    const newNotificationHandler = ({ message, type }) => {
      showNotification(message, type);
    };

    socket.on('newNotification', newNotificationHandler);

    return () => {
      socket.off('newNotification', newNotificationHandler);
    };
  }, []);

  const notificationButtons = [
    { label: "Generar Orden de Despacho", message: "La orden de despacho O/D con número 1234 se generó exitosamente.", type: 'success' },
    { label: "Nuevo Producto", message: "¡Nuevo producto agregado con éxito!", type: 'success' },
    { label: "Realizar Venta", message: "¡Tu venta se realizó correctamente!", type: 'success' },
    { label: "Error en la Solicitud", message: "¡Hubo un error al procesar tu solicitud!", type: 'error' },
    { label: "Mostrar Alerta", message: "Mensaje personalizado de la alerta.", type: 'info' },
  ];

  return (
    <div className="app-container">
      {notificationButtons.map((button, index) => (
        <button key={index} onClick={() => handleButtonNotification(button.message, button.type)}>
          {button.label}
        </button>
      ))}
      <ToastContainer />
    </div>
  );
}

export default App;
