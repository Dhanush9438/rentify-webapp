"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { zodErrorHandler } from "@/lib/zodErrorHandler";
import { signIn } from "next-auth/react";
import { ArrowBottomLeftIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const LoginForm =  () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const result = LoginSchema.safeParse(values);
    if (!result.success) {
      const errorMessage = zodErrorHandler(result.error.issues);
      console.log(errorMessage);
      return;
    }

    // Next Auth login
    const res = await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirect: false,
    });
    if (res?.error) {
      toast.error("Invalid Credentials")
    } else {
      toast.success("Login Successful");
      router.push("/"); 
    }

  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isPending} type="submit" size="lg" className="w-full bg-black">
  Sign in
</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between flex-col">
        <Link className="text-xs" href="/auth/register">
          Dont have an account?
        </Link>
        <Link className="text-xs" href="../">
          <span className="flex gap-1"><ArrowLeftIcon/> Back</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
