import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import logo from '../../assets/images/logo3.png';
import { Mail } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


//import * as RadioGroup from '@radix-ui/react-radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

import {INewUser} from '@/types';
import { ID } from 'appwrite';
import { account } from '../../lib/appwrite/config';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { SignUpValidation } from '@/lib/validation';
import Loader from '@/components/ui/shared/Loader';
import { createUserAccount, signInAccount } from '@/lib/appwrite/app';
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations';


const SignupForm = () => {


  const { toast } = useToast();
  let navigate = useNavigate();

  const changToSignUp = () => {
    let path = '/sign-in';
    navigate(path);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({

    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      email: ''
    },
  });

 

  const {
    isLoading: isCreatingUser,  
    mutateAsync: createUserAccount, 
          } 
          = useCreateUserAccount();

  const { mutateAsync: signInAccount,
          isLoading: isSignIn } = useSignInAccount();



  
   async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

     const newUser = await createUserAccount(values);

     if(!newUser){
        return toast({
          title: ' Sign up failed. Please try again.'
        })
     }

     const session = await signInAccount({
      email:  values.email,
      password: values.password
     });

     if(!session){
      return toast({ title: "Sign in Failed. Please Try Again! "})
     }
    
  }

  return (
    <div className='h-screen'>
      <img src={logo} alt='brick city' className='w-3/4 mx-auto' />

      <Form {...form}>
        <p className='text-xl text-white text-center mt-0'>Sign Up</p>
        <p className='h3-bold md:h2-bold  text-center mb-1'>
          Create a new account.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' flex flex-col w-3/4 mx-auto mb-20 '
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white captalize text-xs '>
                  {' '}
                Name
                </FormLabel>
                <FormControl>
                  <Input className='text-black h-8' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white captalize text-xs '>
                  {' '}
                Username
                </FormLabel>
                <FormControl>
                  <Input className='text-black h-8' {...field} />
                </FormControl>
              </FormItem>
            )}
          />



          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white captalize'>Email</FormLabel>
                <FormControl>
                  <Input className='text-black h-8' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white captalize'>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='text-black h-8' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

      

          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white captalize '>Zipcode</FormLabel>
              <FormControl>
                <Input  className='text-black h-8' {...field} />
              </FormControl>
             
             
            </FormItem>
            )}
          />


         

          <Button type='submit' className='bg-red-800 w-full mt-5'>
            {isCreatingUser ? (
              <div className='flex flex-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
          <Button
            type='submit'
            onClick={changToSignUp}
            className='bg-white w-full mt-5 text-red-800'
          >
            Login
          </Button>
          <FormDescription className='w-full text-center text-xs mt-2 '>
            By signing up, you agree to your <a className='text-bold'>Terms</a> 
            & <a className='text-bold'>Privacy Policy</a>
          </FormDescription>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
