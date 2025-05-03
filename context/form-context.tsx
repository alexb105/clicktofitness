"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Package = "STARTER" | "GROWTH" | "ELITE"

interface FormData {
  brandName: string
  industry: string
  targetAudience: string
  serviceDescription: string
  socialMediaLinks: {
    instagram?: string
    tiktok?: string
    youtube?: string
    facebook?: string
  }
  selectedPackage: Package
  contactEmail: string
  contactPhone: string
  contactName: string
}

interface FormContextType {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  isFormOpen: boolean
  openForm: () => void
  closeForm: () => void
}

const defaultFormData: FormData = {
  brandName: "",
  industry: "",
  targetAudience: "",
  serviceDescription: "",
  socialMediaLinks: {},
  selectedPackage: "GROWTH",
  contactEmail: "",
  contactPhone: "",
  contactName: "",
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [currentStep, setCurrentStep] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const openForm = () => setIsFormOpen(true)
  const closeForm = () => {
    setIsFormOpen(false)
    setCurrentStep(0)
    setFormData(defaultFormData)
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        isFormOpen,
        openForm,
        closeForm,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
