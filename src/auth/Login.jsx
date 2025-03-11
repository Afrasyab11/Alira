import React, { useState } from "react";
import { checkNullOrEmpty } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../constants/routes.constant";
import useEncryptionHook from "../hooks/useEncryptionHook";
import { userToLOgin } from "../services/auth.services";
import { icons } from "../assets";
import Error from "../common/Error";
import InputField from "../common/Input";
import Button from "../common/Button";
import Image from "../common/image/Image";
import Text from "../common/Typography/Text";
import { useSession } from "../sessionManager/SessionContext";
import { LANG_ENUM_KEY } from "../constants/global.constants";
import LanguageBtn from "../common/button/LanguageBtn";
import { LOGIN_TRANSALATION } from "../localization/login/loginTranslate";
import VerificationCode from "./VerificationCode/Verification";
const Login = () => {
  const navigate = useNavigate();
  const { language, isLoading, login, loginError } = useSession();
  const { encrypt, decrypt } = useEncryptionHook();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [validation, setValidation] = useState({
    username: { error: false, msg: "" },
    password: { error: false, msg: "" },
  });
  const [type, setType] = useState("verification");

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validationHandler({ ...formData, [name]: value }, name);
  };

  const validationHandler = (data, name) => {
    let usernameError = false;
    let passError = false;

    let usernameMsg = "";
    let passwordMsg = "";

    if (checkNullOrEmpty(name) || name === "username") {
      usernameError = checkNullOrEmpty(data.username);
      if (usernameError) {
        usernameMsg = LOGIN_TRANSALATION[language]?.errors.usernameRequired;
      }
    }

    if (checkNullOrEmpty(name) || name === "password") {
      passError = checkNullOrEmpty(data.password);
      if (passError) {
        passwordMsg = LOGIN_TRANSALATION[language]?.errors.passwordRequired;
      }
    }

    setValidation({
      username: { error: usernameError, msg: usernameMsg },
      password: { error: passError, msg: passwordMsg },
    });
    return !usernameError && !passError;
  };

  const onLoginClick = async (e) => {
    e.preventDefault();
    let isValid = validationHandler(formData);
    if (isValid) {
      login(formData);
    }
  };

  return (
    <>
      <div
        className={`h-full sm:bg-[#f8f8f8] bg-cover ${
          language === "ar"
            ? "md:bg-[url('src/assets/images/login-bg.jpg')]"
            : "md:bg-[url('src/assets/images/login-bg-en.jpg')]"
        } `}
      >
        <div className="w-full bg-primary border-b-4 border-golden text-end">
          <div className="sm:px-3 md:px-28">
            <LanguageBtn />
          </div>
        </div>
        <div className="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 sm:px-1 md:px-16 sm:mt-10 md:mt-10 lg:mt-24 pb-16">
          <div className="sm:col-span-12 md:col-span-12 lg:col-span-6 sm:px-2 md:px-12 ">
            <div className="flex justify-between gap-x-4 md:gap-x-12 max-h-28">
              <div>
                <Image
                  src={language === "ar" ? icons?.sharkLogo : icons.sharkEnLogo}
                  alt="sharek logo"
                  title="شعار نظام شارك"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <Image src={icons?.logoLarg} title="شعار جامعة الملك فيصل" />
              </div>
            </div>
            {type == "login" ? (
              <div className="bg-white bg-opacity-50 rounded-lg sm:shadow-md md:shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] sm:px-3 sm:py-8 md:p-8 lg:px-0 lg:py-8 xl:p-8 sm:mt-10 md:mt-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex-grow h-[0.5px] bg-golden"></div>
                  <Text className="mx-4 sm:text-[20px] lg:text-[28px] text-primary">
                    {/* تسجيل الدخول */}
                    {LOGIN_TRANSALATION[language]?.title}
                  </Text>
                  <div className="flex-grow h-[1px] bg-golden"></div>
                </div>
                <Error
                  error={loginError?.error}
                  className="flex justify-center text-red-600 w-full"
                  msg={loginError?.msg ?? ""}
                />
                <form
                  className="flex flex-col gap-y-4 sm:px-2 lg:px-8 pb-6"
                  onSubmit={(e) => onLoginClick(e)}
                >
                  {/* Username Field */}
                  <div className="flex flex-col gap-2">
                    <Text className="block text-gray-700">
                      {" "}
                      {LOGIN_TRANSALATION[language]?.username}{" "}
                    </Text>
                    <InputField
                      type="text"
                      name="username"
                      value={formData.username ?? ""}
                      onChange={onChange}
                      error={validation.username.error}
                      msg={
                        LOGIN_TRANSALATION[language]?.errors?.usernameRequired
                      }
                      className="text-center"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Text className="block text-gray-700 mb-2">
                      {LOGIN_TRANSALATION[language]?.password}
                    </Text>
                    <InputField
                      type="password"
                      name="password"
                      value={formData.password ?? ""}
                      onChange={onChange}
                      error={validation.password.error}
                      msg={
                        LOGIN_TRANSALATION[language]?.errors?.passwordRequired
                      }
                      className="text-center w-full"
                    />
                  </div>

                  <div className="">
                    <Link
                      href="#"
                      className="text-primary hover:text-golden font-semibold text-sm"
                    >
                      {LOGIN_TRANSALATION[language]?.forgotPassword}
                    </Link>
                  </div>

                  <Button
                    type="subbmit"
                    className="w-full bg-primary min-h-[44px] text-white flex justify-center items-center py-2 rounded-md hover:bg-golden text-lg"
                    isLoading={isLoading}
                  >
                    {LOGIN_TRANSALATION[language]?.loginBtnText}
                  </Button>

                  <div className="text-end mt-5">
                    <Link
                      to="https://gate.kfu.edu.sa"
                      target="_blank"
                      className={`inline-flex gap-x-2 items-center text-primary hover:text-golden text-sm`}
                    >
                      <i className="fa-duotone fa-solid fa-square-question fa-xl" />

                      <Text className="font-bold">
                        {LOGIN_TRANSALATION[language]?.support}
                      </Text>
                    </Link>
                  </div>
                </form>
              </div>
            ) : (
              <VerificationCode setType={()=>setType("login")} />
            )}
            {/* Footer */}
            <Text className="mt-8 text-center text-[16px] font-medium text-[#6D767E]">
              {LOGIN_TRANSALATION[language]?.footer}
            </Text>
          </div>
          <div className=" sm:col-span-12 md:col-span-12 lg:col-span-6"></div>
        </div>
      </div>
    </>
  );
};
export default Login;
