"use client";
import { useState } from "react";
import { ProductWithPlan, ProductConfig } from "@/app/client-creation-form/type/step1form";
import { productList } from "../data/data";

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
  const [error, setError] = useState("");

  /* Toggle product selection */
  const toggleProduct = (product: ProductConfig) => {
    const exists = selectedProducts.find(
      (p) => p.product === product.name
    );

    if (exists) {
      setSelectedProducts(
        selectedProducts.filter(
          (p) => p.product !== product.name
        )
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          product: product.name,
          plan: product.plans[0],
        },
      ]);
    }

    setError("");
  };

  /* Update plan */
  const updatePlan = (product: string, plan: string) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.product === product ? { ...p, plan } : p
      )
    );
  };

  /* Next button logic */
  const handleNext = () => {
    if (selectedProducts.length === 0) {
      setError("Please select at least one product");
      return;
    }

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
              const selected = selectedProducts.find(
                (p) => p.product === product.name
              );

              return (
                <button
                  key={product.name}
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
                  <span>{product.name}</span>

                  {selected && (
                    <select
                      value={selected.plan}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        updatePlan(product.name, e.target.value)
                      }
                      className="mt-2 w-full text-xs text-gray-900 border border-white bg-gray-200 rounded px-2 py-1"
                    >
                      {product.plans.map((plan) => (
                        <option key={plan} value={plan}>
                          {plan}
                        </option>
                      ))}
                    </select>
                  )}
                </button>
              );
            })}
          </div>

          {error && (
            <p className="text-red-500 text-[12px] mt-2">{error}</p>
          )}
        </div>

        <h2 className="text-[9px] font-semibold text-gray-600">
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
