"use client";
import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("logged in");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login with your account' />
      <Input
        disabled={isLoading}
        id='email'
        label='Email'
        register={register}
        errors={errors}
        required
        watch={watch}
      />

      <Input
        disabled={isLoading}
        id='password'
        label='Password'
        type='password'
        register={register}
        errors={errors}
        required
        watch={watch}
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-3 mt-3'>
      <hr />
      <Button
        label='Continue with google'
        outlined
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <Button
        label='Continue with github'
        outlined
        icon={AiFillGithub}
        onClick={() => {
          signIn("github");
        }}
      />
      <div
        className='
      text-neutral-500 
      txt-center mt-4 font-light'
      >
        <div className='flex justify-center flex-row items-center gap-2'>
          <div>Already have and account</div>
          <div
            onClick={registerModal.onClose}
            className='text-neutral-800 hover:underline cursor-pointer'
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
