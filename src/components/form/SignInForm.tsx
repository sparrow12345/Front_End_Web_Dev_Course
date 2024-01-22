"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const SignInForm = () => {
  const router1 = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    // const session = await useSession(authOptions);
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      // "callbackUrl": '/mytasks'
      redirect: false,
    });
    // console.log(session);
    console.log(signInData);
    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    } else {
      router1.refresh();
      router1.push("/mytasks");
      router1.refresh();
    }

    // if (signInData?.error || signInData?.message) {
    //   console.log(signInData.error);
    //   console.log(signInData?.message);
    // } else {
    //   router1.push("/")
    // }
    // const hashed = await hash(values.password, 10);
    // const response = await fetch("http://localhost:3000/api/(auth)/[...nextauth])", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     "email": values.email,
    //     "password": values.password
    //   })
    // })
    // const result = await response.json();
    // console.log(result);
    // if (response.status == 200) {
    //   const data = await response.json();
    //   console.log(data);
    //   const token = data.token;
    //   // router1.push(`/?token=${token}`);
    // }
  };

  // const onSubmit = async (values: z.infer<typeof FormSchema>) => {
  //   // console.log(values);
  //   const signInData = await signIn("credentials", {
  //       "email": values.email,
  //       "password": values.password
  //     }
  //   );
  //   console.log(signInData);
  //   // if (signInData?.error) {
  //   //   console.log(signInData.error);
  //   // } else {
  //   //   console.log('ksm')
  //   //   router1.push('/about');
  //   // }
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="mail@example.com"
                    className="bg-white text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="bg-white text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign in
        </Button>
      </form>
      <div className="mx-auto my-4 flex max-w-lg text-black items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
