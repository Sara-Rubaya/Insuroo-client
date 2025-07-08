import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Components/ LoadingSpinner';
import { ImSpinner9 } from 'react-icons/im';


const Login = () => {
    const {register, handleSubmit, formState:{errors} } = useForm();
    const {signIn, signInWithGoogle,loading} =  useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
      

    const onSubmit = data =>{
        signIn(data.email, data.password)
        .then(result =>{
          console.log(result.user)
          navigate(from);
        })
        .catch(error => console.log(error))
    }

     // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle()
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
    return (
        <div className='flex justify-center items-center min-h-screen bg-white '>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl  dark:text-gray-800">
	<h1 className="text-5xl p-5 font-bold text-center bg-gradient-to-r from-purple-400 to-purple-900 bg-clip-text text-transparent">
  Login
</h1>
	<form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="space-y-6">
		<div className="space-y-1 text-sm">
			<label className="label">Email</label>
          <input 
          type="email"
           {...register('email')} 
           
            placeholder="Email"  
                className="input w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
		</div>
		<div className="space-y-1 text-sm">
			<label htmlFor="password" className="block dark:text-gray-600">Password</label>
			<input
             type="password"
              {...register('password', {required: true, minLength:6})} 
              name="password"
               id="password" 
               placeholder="Password" 
               className="input w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
			<div className="flex justify-end text-xs dark:text-gray-600">
				<a rel="noopener noreferrer" href="#">Forgot Password?</a>

                {
            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
           }
           {
            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
           }
			</div>
		</div>
		<button
              type='submit'
              className='bg-violet-800 hover:bg-gradient-to-r from-purple-500 to-purple-900 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <ImSpinner9 className='animate-spin m-auto' />
              ) : (
                'Login'
              )}
            </button>
	</form>
	<div className="flex items-center pt-4 space-x-1">
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
		<p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
		<div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
	</div>
	<div className="flex justify-center space-x-4">
		<button onClick={handleGoogleSignIn} aria-label="Log in with Google" className="p-3 rounded-sm">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
			</svg>
		</button>
		
		
	</div>
	<p className="px-6 text-sm text-center text-gray-400">Don't have an account? 
		<Link to="/register">
    <a className='hover:underline hover:text-violet-600 text-gray-600'> Sign up</a>
    </Link>
	</p>
</div>
        </div>
    );
};

export default Login;