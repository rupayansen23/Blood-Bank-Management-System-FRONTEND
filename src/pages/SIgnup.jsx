import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const signupSchema = z.object({
  donorName: z.string().min(3, "Minimum character should be 3"),
  donorEmailId: z.string().email("Invalid Email"),
  donorContactNumber: z.coerce.number()
  .refine((num) => num.toString().length === 10, "Phone number must be 10 digits"),
  password: z.string().min(8, "Password is to weak")
});

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const resp = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), 
      });
      if (!resp.ok) {
        const msg = await resp.text();
        console.log(msg);
        throw new Error(msg || 'Signup failed');
      } 
      else {
        let respData = await resp.json();
        console.log(respData);
        toast.success("Sign up successful! Redirecting to login...");
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    }
    catch(error) {
      console.log(error, error.message);
      toast.error(error.message || "Sign up failed. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50 min-h-screen">
      <div className="flex items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-md">
          <div className="card bg-white shadow-2xl border border-red-100 rounded-3xl overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6">
              <h2 className="text-4xl font-bold text-white text-center">Create Account</h2>
              <p className="text-red-100 text-center mt-2 text-sm">Join our blood donation community</p>
            </div>

            <div className="card-body p-8 space-y-5">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Donor Name Input */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-gray-700">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`input w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none ${
                      errors.donorName
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 hover:border-gray-300'
                    }`}
                    {...register('donorName')}
                  />
                  {errors.donorName && (
                    <span className="text-red-500 text-sm mt-2 font-medium">{errors.donorName.message}</span>
                  )}
                </div>

                {/* Email Input */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-gray-700">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`input w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none ${
                      errors.donorEmailId
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 hover:border-gray-300'
                    }`}
                    {...register('donorEmailId')}
                  />
                  {errors.donorEmailId && (
                    <span className="text-red-500 text-sm mt-2 font-medium">{errors.donorEmailId.message}</span>
                  )}
                </div>

                {/* Phone Number Input */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-gray-700">Phone Number</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter 10-digit phone number"
                    className={`input w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none ${
                      errors.donorContactNumber
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 hover:border-gray-300'
                    }`}
                    {...register('donorContactNumber')}
                  />
                  {errors.donorContactNumber && (
                    <span className="text-red-500 text-sm mt-2 font-medium">{errors.donorContactNumber.message}</span>
                  )}
                </div>

                {/* Password Input */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-gray-700">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter a strong password"
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

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="btn w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg border-0 rounded-xl py-3 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create Account
                </button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center gap-4 my-2">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="text-gray-400 text-sm">Already registered?</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <a 
                  href="/login" 
                  className="text-red-500 hover:text-red-600 font-semibold transition-colors duration-200"
                >
                  Sign in to your account
                </a>
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

export default Signup;



