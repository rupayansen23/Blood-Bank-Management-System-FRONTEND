import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const signupSchema = z.object({
  donorName: z.string().min(3, "Minimum character should be 3"),
  donorEmailId: z.string().email("Invalid Email"),
  donorContactNumber: z.coerce.number()
  .refine((num) => num.toString().length === 10, "Phone number must be 10 digits"),
  password: z.string().min(8, "Password is to weak")
});

function Signup() {
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
        throw new Error(msg || 'Login failed');
      } 
      else {
        let respData = await resp.json();
        console.log(respData);
      }
    }
    catch(error) {
      console.log(error, error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"> {/* Centering container */}
      <div className="card w-96 bg-base-100 shadow-xl"> {/* Existing card styling */}
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">User Registration</h2> {/* Centered title */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Existing form fields */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text">Donor Name</span>
              </label>
              <input
                type="text"
                placeholder="John"
                className={`input input-bordered ${errors.donorName && 'input-error'}`}
                {...register('donorName')}
              />
              {errors.donorName && (
                <span className="text-error">{errors.donorName.message}</span>
              )}
            </div>

            <div className="form-control  mt-4">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered ${errors.donorEmailId && 'input-error'}`}
                {...register('donorEmailId')}
              />
              {errors.donorEmailId && (
                <span className="text-error">{errors.donorEmailId.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label mb-1 mt-4">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="number"
                placeholder="912345678"
                className={`input input-bordered ${errors.donorContactNumber && 'input-error'}`}
                {...register('donorContactNumber')}
              />
              {errors.donorContactNumber && (
                <span className="text-error">{errors.donorContactNumber.message}</span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered ${errors.password && 'input-error'}`}
                {...register('password')}
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control mt-6 flex justify-center">
              <button
                type="submit"
                className="btn bg-red-500 hover:cursor-pointer text-white font-bold"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;



