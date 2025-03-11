export const Footer = () => {
  return (
    <>
      <div className="bg-white border-t-[1px] border-[#454545] py-4 px-10 ">
        <p className="text-sm sm:text-center md:text-start">{`Copyright © ${new Date().getFullYear()} ALIRA`}</p>
      </div>
    </>
  );
};
