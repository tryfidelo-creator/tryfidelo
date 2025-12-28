import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { UserRole } from "@/types/user"

interface RoleOption {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  borderColor: string
}

interface RegisterStep2Props {
  formData: { role: UserRole }
  setFormData: (data: any) => void
  roleOptions: RoleOption[]
  setStep: (step: number) => void
  onSubmit: (e: React.FormEvent) => void
}

export function RegisterStep2({ formData, setFormData, roleOptions, setStep }: RegisterStep2Props) {
  return (
    <>
      <RadioGroup value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {roleOptions.map((option) => {
            const Icon = option.icon
            return (
              <motion.label
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer border-2 rounded-2xl p-4 sm:p-6 transition-all ${
                  formData.role === option.id
                    ? `border-orange-500 bg-gradient-to-br ${option.color} shadow-lg`
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-5 w-5 text-gray-700" />
                      <h3 className="font-bold text-gray-900">{option.label}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </motion.label>
            )
          })}
        </div>
      </RadioGroup>

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={() => setStep(1)}
          variant="outline"
          className="flex-1 h-12 rounded-xl border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 cursor-pointer"
        >
          Back
        </Button>
        <Button type="submit" className="btn-primary flex-1 h-12 text-lg justify-center">
          Continue
        </Button>
      </div>
    </>
  )
}
