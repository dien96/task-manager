import Input from "@/components/Inputs/Input";
import ProfilePhotoSelector from "@/components/Inputs/ProfilePhotoSelector";
import AuthLayout from "@/components/layout/AuthLayout";
import { validateEmail } from "@/utils/helper";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState<string | null>(null);

  // Handle SignUp Form Submit
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // SignUp API Call
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs texe-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                setEmail(target.value)
              }
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />

            <Input
              value={password}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                setPassword(target.value)
              }
              label="Password"
              placeholder="Min. 8 Characters"
              type="password"
            />

            <Input
              value={adminInviteToken}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                setAdminInviteToken(target.value)
              }
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="text"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
