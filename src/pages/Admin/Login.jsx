import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../Store/AdminSlice';
import { toast } from 'react-toastify';
const API_BASE = import.meta.env.VITE_API_BASE_URL;


const signupSchema = z.object({
  userName: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is to weak"),
});

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch(`${API_BASE}/adminLogin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), 
      });
      if (!res.ok) {
        const msg = await res.text();
        console.log(msg);
        throw new Error(msg || 'Login failed');
      }
      else {
        let data = await res.json();
        dispatch(setAdmin(data))
        toast.success("Login Success");
        navigate('/admin/dashboard/home');
      }
    }
    catch(error) {
      console.log(error, error.message);
      toast.warning("Invalid Credentials");
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50 min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          <div className="card bg-white shadow-2xl border border-red-100 rounded-3xl overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6">
              <h2 className="text-4xl font-bold text-white text-center">Admin Login</h2>
              <p className="text-red-100 text-center mt-2 text-sm">Blood Bank Management System</p>
            </div>

            <div className="card-body p-8 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Input */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-gray-700">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`input w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none ${
                      errors.userName
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 hover:border-gray-300'
                    }`}
                    {...register('userName')}
                  />
                  {errors.userName && (
                    <span className="text-red-500 text-sm mt-2 font-medium">{errors.userName.message}</span>
                  )}
                </div>

                {/* Password Input */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-gray-700">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className={`input w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none ${
                      errors.password
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 hover:border-gray-300'
                    }`}
                    {...register('password')}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-2 font-medium">{errors.password.message}</span>
                  )}
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg border-0 rounded-xl py-3 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center gap-4 my-2">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="text-gray-400 text-sm">Admin Access Only</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Security Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-700 text-xs text-center font-medium">
                  🔒 Restricted Area - Authorized Personnel Only
                </p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <p className="text-center text-gray-500 text-xs mt-6">
            © 2026 Blood Bank Management. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}




