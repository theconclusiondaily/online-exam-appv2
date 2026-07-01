"use client";

interface Props {
  step: number;
}

const steps = [
  "Details",
  "Paper",
  "Schedule",
  "Rewards",
  "Preview",
  "Publish",
];

export default function StepIndicator({
  step,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-6">

      <div className="grid grid-cols-6 gap-4">

        {steps.map((title, index) => {

          const current = index + 1;

          const active = current === step;

          const completed = current < step;

          return (

            <div
              key={title}
              className="text-center"
            >

              <div
                className={`
                  h-12
                  w-12
                  mx-auto
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                  transition-all

                  ${
                    completed
                      ? "bg-green-500 text-white"
                      : active
                      ? "bg-tcd-blue text-white"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {current}
              </div>

              <div className="mt-3 text-sm font-semibold">

                {title}

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}