import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../auth/AxiosInterceptor';
import { UserPlus, Waves } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="text-center text-primary mb-4">
            <Waves size={48} />
            <h2 className="mt-3 fw-bold text-dark">Join Pick my Laundry</h2>
            <p className="text-muted">Create an account to track your orders</p>
          </div>

          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label className="form-label fw-medium text-dark">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="John Doe"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium text-dark">Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium text-dark">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="••••••••"
                  />
                </div>

                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg d-flex justify-content-center align-items-center gap-2"
                  >
                    <UserPlus size={20} />
                    Register
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <hr className="text-muted" />
                <p className="text-muted small mb-2">Already have an account?</p>
                <Link
                  to="/login"
                  className="btn btn-outline-primary w-100 mt-2"
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
