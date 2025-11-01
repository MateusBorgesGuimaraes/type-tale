import AuthLayout from "@/components/ui/auth-layout/auth-layout";
import LoginForm from "@/components/ui/forms/login-form";

export default async function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] h-full flex items-center justify-center">
      <AuthLayout title="Welcome back to Typetale">
        <LoginForm />
      </AuthLayout>
    </div>
  );
}
