import AuthLayout from "@/components/ui/auth-layout/auth-layout";
import RegisterForm from "@/components/ui/forms/register-form";

export default async function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] h-full flex items-center justify-center wrapper">
      <AuthLayout title="Welcome to Typetale">
        <RegisterForm />
      </AuthLayout>
    </div>
  );
}
