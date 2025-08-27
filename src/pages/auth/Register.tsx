import { RegisterForm } from "@/components/RegisterForm";
import signupImg from "@/assets/images/register.jpg";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="text-2xl md:text-4xl font-bold ml-3 text-orange-500">
              Rideflex
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={signupImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover "
        />
      </div>
    </div>
  );
};

export default Register;
