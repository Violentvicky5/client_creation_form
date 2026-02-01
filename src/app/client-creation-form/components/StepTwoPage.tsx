"use client";

import { useEffect, useState } from "react";

type Plan = "silver" | "gold" | "platinum";

type ProductWithPlan = {
  product: string;
  plan: Plan;
};

export default function StepTwoPage({
  onNext,
  onPrevious,
  selectedProducts,
  setSelectedProducts,
}: {
  onNext: () => void;
  onPrevious: () => void;
  selectedProducts: ProductWithPlan[];
  setSelectedProducts: (products: ProductWithPlan[]) => void;
}) {
  const productList = [
    "HR Management",
    "Inventory Management",
    "CRM",
    "Accounting",
    "Project Management",
    "IT Support",
    "Sales Tracking",
    "Marketing Tools",
    "Customer Support",
    "Analytics Dashboard",
  ];

  const [localSelected, setLocalSelected] =
    useState<ProductWithPlan[]>(selectedProducts);

  const [error, setError] = useState("");

  /* Sync when user navigates back */
  useEffect(() => {
    setLocalSelected(selectedProducts);
  }, [selectedProducts]);

  /* Toggle product selection */
  const toggleProduct = (product: string) => {
    setLocalSelected((prev) => {
      const exists = prev.find((p) => p.product === product);

      if (exists) {
        return prev.filter((p) => p.product !== product);
      }

      return [...prev, { product, plan: "silver" }];
    });

    setError("");
  };

  /* Update plan */
  const updatePlan = (product: string, plan: Plan) => {
    setLocalSelected((prev) =>
      prev.map((p) => (p.product === product ? { ...p, plan } : p)),
    );
  };

  /* Next button logic */
  const handleNext = () => {
    if (localSelected.length === 0) {
      setError("Please select at least one product");
      return;
    }

    setSelectedProducts(localSelected);
    onNext();
  };

  return (
    <div className="flex justify-center py-6 mt-2">
      <div className="w-full max-w-[1200px] bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md">
        <h2 className="mb-2 text-xs font-semibold text-gray-600">
          Product Selection
        </h2>
        <hr className="my-3 border-gray-200" />

        <div className="mb-8 text-sm text-gray-600">
          <div
            className="
              grid gap-4
            grid-cols-2
min-[475px]:grid-cols-3
min-[768px]:grid-cols-3
min-[1024px]:grid-cols-3
min-[1280px]:grid-cols-5

            "
          >
            {productList.map((product) => {
              const selected = localSelected.find((p) => p.product === product);

              return (
                <button
                  key={product}
                  type="button"
                  onClick={() => toggleProduct(product)}
                  className={`
                    flex flex-col 
                    items-center
                    justify-between
                    min-h-[90px] 
                    px-3 py-3
                    text-xs sm:text-sm
                    font-semibold
                    rounded-lg
                    border
                    shadow-sm
                    transition-all duration-200
                    hover:scale-105 hover:shadow-lg
                    ${
                      selected
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }
                  `}
                >
                  <span>{product}</span>

                  {selected && (
                    <select
                      value={selected.plan}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        updatePlan(product, e.target.value as Plan)
                      }
                      className="mt-2 w-full text-xs  text-gray-700  border border-white bg-gray-400 rounded px-2 py-1"
                    >
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                      <option value="platinum">Platinum</option>
                    </select>
                  )}
                </button>
              );
            })}
          </div>

          {error && <p className="text-red-500 text-[12px] mt-2">{error}</p>}
        </div>
<h2 className=" text-[9px] font-semibold text-gray-600">
          Important: Ensure Selected Products Before Move to Next Step
        </h2>
        <hr className="mb-6 border-gray-200" />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="w-16 h-7 py-1.5 bg-gray-500 text-white rounded text-xs hover:bg-gray-400 transition"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="w-16 h-7 py-1.5 bg-blue-700 text-white rounded text-xs hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
