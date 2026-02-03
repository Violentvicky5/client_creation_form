export type HorizontalStepProgressProps = {
  currentStep: number;
  maxReachedStep: number;
  onStepChange: (step: 1 | 2 | 3 | 4) => void;
  isStepFourSubmitted:boolean;
};

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
  plan: string;
};

export type ProductConfig = {
  name: string;
  plans: string[];
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

export type SuccessPageProps = {
  clientName?: string;
};

export type CompanyFormValues = {
    company_info: CompanyInfo;
  products: ProductWithPlan[]; 
  subscription_settings: SubscriptionSettings;
  admin_info:AdminInfo;
};

