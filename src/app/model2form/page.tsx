import React from 'react'
import BadgeProgressBar from './components2/BadgeProgressBar'
import CircularStepperMobile from './components2/CircularStepperMobile'

const Model2Form = () => {
  return (
    <div>
      {/* Show horizontal stepper only for >=500px */}
      <div className="hidden min-[500px]:block">
        <BadgeProgressBar />
      </div>

      {/* Show circular stepper only for <500px */}
      <div className="block min-[500px]:hidden">
        <CircularStepperMobile />
      </div>
    </div>
  )
}

export default Model2Form
