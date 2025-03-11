function AnnualPricing() {
    return (
        <div className="flex items-center justify-center p-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 max-w-4xl w-full">
          {/* Professional Card */}
          <div className="bg-white shadow-price-white-shadow rounded-3xl p-8 min-h-[60vh] ">
            <div className="flex flex-col justify-evenly items-center space-y-8 h-full">
              <h2 className="text-4xl font-medium text-gray-800 mb-4">Professional</h2>
              <p className="text-black text-center ">Advanced AI insights, CRM tools & integrations.</p>
              <div className="">
                <div className="flex items-baseline justify-center ">
                  <span className="text-4xl font-medium text-gray-900">$155</span>
                  <span className="text-black ml-2">/month</span>
                </div>
               
              </div>
            </div>
          </div>
  
          {/* Enterprise Card */}
          <div className="bg-gradient-custom shadow-custom-shadow rounded-3xl p-8 min-h-[60vh]">
            <div className="flex flex-col justify-evenly items-center space-y-10 h-full">
              <h2 className="text-4xl font-medium text-white ">Enterprise</h2>
              <p className="text-gray-200 text-center ">Priority support.</p>
              <div className="">
                <button className="w-full bg-white text-[#454545B8] py-2 px-10 rounded-full hover:bg-white/30 transition-colors border border-white/40">
                  Contact for quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  export default AnnualPricing;