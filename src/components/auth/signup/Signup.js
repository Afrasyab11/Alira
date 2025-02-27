import { Icons } from "@/assets/Icons";
import Image from "next/image";
import Typography from "@/common/Typography";
import InputField from "@/common/Inputs/Inputs";
import Button from "@/common/Button";
import Link from "next/link";
export const Signup = ({setType}) => {
  return (
    <>
      <div className="bg-light flex justify-center items-center  min-h-screen">
        <div className="bg-white sm:w-full md:min-w-[423px] max-w-lg flex flex-col space-y-5 py-10 sm:px-2 md:px-14 rounded-xl">
          <div className="flex justify-center items-center w-full">
            <Image src={Icons?.alira} alt="logo" className="h-auto w-auto" />
          </div>
          <div className="w-full text-center">
            <Typography variant="p">Login to continue</Typography>
          </div>
          <div className="flex gap-x-3 justify-center">
            <Image src={Icons?.google} alt="google" className="h-auto w-auto cursor-pointer" />
            <Image src={Icons?.apple} alt="apple" className="h-auto w-auto cursor-pointer" />
          </div>
          <div className="flex justify-center items-center gap-x-3 text-[#A0A0A0]">
            <span className="border-t-[2px] border-[#A0A0A0] w-16"></span>
            <Typography variant="p">or login with</Typography>
            <span className="border-t-[2px] border-[#A0A0A0] w-16"></span>
          </div>
          <div className="flex flex-col gap-y-7">
            <InputField type="text" placeholder="Enter your name" />
            <InputField type="text" placeholder="Enter your email" />
            <InputField type="password" placeholder="Enter your password" />
          </div>
          <div className="flex flex-col ">
            <div className="mt-5 w-full">
              <Button label="Sign Up" onClick={setType} className="w-full bg-blue" />
            </div>
            <div className="flex justify-center gap-x-2 mt-5">
              <p className="text-[#A0A0A0]">Already have an account?</p>
              <Link onClick={setType}  href={"#"} className="text-[#454545]">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
