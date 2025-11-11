import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
const API_BASE = import.meta.env.VITE_API_BASE_URL;


const signupSchema = z.object({
  userName: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is to weak"),
  role: z.enum(['hospital', 'bloodBank', 'user'], { errorMap: () => ({ message: 'Select a role' }) })
});

export default function UserLogin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    if(data.role == 'user') {
        delete data.role;
        const res = await fetch(`${API_BASE}/donorLogin`, {
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
        let responseText = await res.text();
        console.log(responseText);
      }

    } else if(data.role == 'hospital') {
        
    } else {

    }
  };

  return (
    <div className="bg-white">
      <div>
        <Navbar></Navbar>
      </div>
      <div className="min-h-screen flex items-center justify-center  p-4"> {/* Centering container */}
      <div className="card w-96 shadow-xl bg-white"> {/* Existing card styling */}
        <div className="card-body bg-white text-black rounded-2xl">
          <h2 className="card-title justify-center text-3xl">User Login</h2> {/* Centered title */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Existing form fields */}

            <div className="form-control  mt-4">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered bg-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.emailId && 'input-error'}`}
                {...register('userName')}
              />
              {errors.emailId && (
                <span className="text-error">{errors.emailId.message}</span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered  bg-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 ${errors.password && 'input-error'}`}
                {...register('password')}
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control mt-4">
             <label className="label mb-1">
               <span className="label-text">Login as</span>
             </label>
             <select
               {...register('role')}
               className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
             >
               <option value="user">User</option>
               <option value="hospital">Hospital</option>
               <option value="bloodBank">Blood Bank</option>
             </select>
             {errors.role && <span className="text-error">{errors.role.message}</span>}
           </div>

            <div className="form-control mt-6 flex justify-center">
              <button
                type="submit"
                className="btn bg-red-500 hover:cursor-pointer hover:bg-red-900 text-white font-bold"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}




