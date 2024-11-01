import { useState } from 'react';
import { Link } from 'react-router-dom';
import eyeIcon from '../img/eye-icon.png';
import eyeSlash from '../img/eye-slash.png';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não correspondem');
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Cadastro realizado com sucesso!');
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Cadastro</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <img
            src={showPassword ? eyeIcon : eyeSlash}
            alt="Toggle Password Visibility"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            style={{ width: '20px', height: '20px' }} 
          />
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? 'text' : 'password'} 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a senha"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <img
            src={showConfirmPassword ? eyeIcon : eyeSlash}
            alt="Toggle Confirm Password Visibility"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            style={{ width: '20px', height: '20px' }}
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          Cadastrar
        </button>

        <p className="mt-4 text-center">
          Já tem uma conta?{' '}
          <Link to="/" className="text-purple-600 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
