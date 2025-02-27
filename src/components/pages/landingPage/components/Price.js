import SmoothTabs from "@/common/Tabs/Tabs";
import MonthlyPricing from "./Monthly";
import AnnualPricing from "./Yearly";
export default function Price() {
  const tabItems = [
    {
      label: "Monthly",
      content: <MonthlyPricing />,
    },
    {
      label: "Annual",
      content: <AnnualPricing />,
    },
  ];

  return (
    <div className="relative bg-price-bg sm:min-h-[200vh] md:min-h-[135vh] w-full">
      {/* Content Layer */}
      <div className="relative flex flex-col  sm:py-24 md:py-36 p-4">
        <div className="flex justify-center">
          <p className="text-white font-medium text-center text-4xl">
            Simple Pricing for Every Real Estate{" "}
            <br className="hidden sm:block" /> Professional
          </p>
        </div>
        <div className="mt-20">
          <SmoothTabs tabs={tabItems} />
        </div>
      </div>
    </div>
  );
}
