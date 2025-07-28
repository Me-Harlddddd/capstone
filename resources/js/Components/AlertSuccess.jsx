// resources/js/Components/AlertSuccess.jsx
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function AlertSuccess(message = 'Room added successfully') {
  return MySwal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    confirmButtonColor: '#4ecdc4',
    customClass: {
      popup: 'swal2-border-radius'
    }
  });
}
