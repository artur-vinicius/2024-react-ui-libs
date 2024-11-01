import { useState } from 'react';
import { Link } from 'react-router-dom';
import eyeIcon from '../img/eye-icon.png';
import eyeSlash from '../img/eye-slash.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const data = await response.json();
    if (response.ok) {
      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }
      console.log('Login bem-sucedido!');
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Login</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
        <div className="relative">
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
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            style={{ width: '20px', height: '20px' }}
          />
        </div>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          Lembre-me
        </label>
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-purple-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
