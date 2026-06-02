import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/apiService';
import toast from 'react-hot-toast';
import { InputField, Button, Card } from '../components/CommonComponents';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(formData.email, formData.password);
      const { token, user } = response.data.data;

      login(user, token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-600">
      <Card className="w-full max-w-md shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-600">Agent Task Distribution System</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="admin@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <Button type="submit" loading={loading} className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don&apos;t have an admin account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </Card>
    </div>
  );
};
