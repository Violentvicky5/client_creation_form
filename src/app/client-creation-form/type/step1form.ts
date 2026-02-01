export type CompanyInfo = {
  companyName: string;
  companyNumber: string;
  deptName: string;
  StreetAddress: string;
  City: string;
  State: string;
  zipCode: string;
  country: string;
};

export type ProductWithPlan = {
  product: string;
  plan: "silver" | "gold" | "platinum";
};

export type SubscriptionSettings = {
  billingCycle: string;
  trialDays: string;
  region: string;
};

export type AdminInfo = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};


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
  subscription_settings: SubscriptionSettings;
  admin_info:AdminInfo;
};

