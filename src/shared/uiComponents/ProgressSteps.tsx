interface ProgressStepsProps {
  currentStep: number; // 1 to 5
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1 sm:flex-none">
          <div
            className={`
              w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
              rounded-full flex items-center justify-center font-semibold 
              text-xs sm:text-sm md:text-base
              transition-all duration-300 flex-shrink-0
              ${step <= currentStep 
                ? 'bg-[#4a3728] text-white shadow-md' 
                : 'bg-gray-200 text-gray-500'
              }
            `}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`
                h-0.5 sm:h-1 flex-grow sm:flex-grow-0
                sm:w-8 md:w-12 mx-1 sm:mx-2 md:mx-3
                transition-all duration-300
                ${step < currentStep ? 'bg-[#4a3728]' : 'bg-gray-200'}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}