export type CompanyFormValues = {
  companyName: string;
  companyNumber: string;
  deptName: string;
  StreetAddress: string;
  City: string;
  State: string;
  zipCode: string;
  country: string;
  products: ProductWithPlan[]; 
};

export type ProductWithPlan = {
  product: string;
  plan: "silver" | "gold" | "platinum";
};
