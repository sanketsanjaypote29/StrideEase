import { useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import { UseContextProvider } from "../contexts/StepperContext";

import Account from "../components/steps/Account";
import Details from "../components/steps/Details";
import Payment from "../components/steps/Payment";
import Final from "../components/steps/Final";

function StepperSample() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Account Information",
    "Personal Details",
    "Payment",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Payment />;
      case 4:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="pb-2 mx-auto bg-white shadow-xl rounded-2xl md:w-1/2">
      {/* Stepper */}
      <div className="container mt-5 horizontal ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="p-10 my-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}

export default StepperSample;