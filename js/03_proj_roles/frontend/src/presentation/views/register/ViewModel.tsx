import { useState } from "react";
import { Alert } from "react-native";
import { registerUser } from "../api/userApi"; // ✅ importa Axios

const RegisterViewModel = () => {
  const [values, setValues] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',   // ✅ valor inicial
  });

  const [errors, setErrors] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',   // ✅ opcional (por consistencia)
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
    setErrors({ ...errors, [property]: '' });
  };

  const register = async () => {
    const { name, lastname, phone, email, password, confirmPassword, role } = values;
    let newErrors: any = {};

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/;
    if (!nameRegex.test(name)) newErrors.name = "Nombre inválido";

    if (!nameRegex.test(lastname)) newErrors.lastname = "Apellido inválido";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) newErrors.email = "Correo inválido";

    const phoneRegex = /^3\d{9}$/;
    if (!phoneRegex.test(phone)) newErrors.phone = "Teléfono inválido";

    if (password.length < 6) newErrors.password = "Min 6 caracteres";
    if (password !== confirmPassword) newErrors.confirmPassword = "No coincide";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert("Error", "Revisa los campos marcados en rojo.");
      return;
    }

    try {
      const payload = {
        name,
        lastname,
        email,
        password,
        phone,
        role,  // ✅ se envía lo que seleccionó el usuario
      };

      const response = await registerUser(payload);
      Alert.alert("Éxito", "Usuario registrado correctamente.");
      console.log(response);

    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el usuario.");
    }
  };

  return {
    ...values,
    errors,
    onChange,
    register
  };
};

export default RegisterViewModel;
