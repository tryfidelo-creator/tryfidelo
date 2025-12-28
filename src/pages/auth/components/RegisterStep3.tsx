import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

interface RegisterStep3Props {
  formData: { password: string }
  setFormData: (data: any) => void
  isLoading: boolean
  setStep: (step: number) => void
  onSubmit: (e: React.FormEvent) => void
}

export function RegisterStep3({ formData, setFormData, isLoading, setStep }: RegisterStep3Props) {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Label htmlFor="password" className="text-gray-900 font-semibold mb-2 block">
          Create Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter a strong password"
            className="h-12 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 transition-all"
            required
            minLength={6}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">Minimum 6 characters</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-sm text-amber-900"
      >
        <p className="font-semibold mb-2">Password tips:</p>
        <ul className="space-y-1 text-xs">
          <li>• Use a mix of uppercase and lowercase letters</li>
          <li>• Include numbers and special characters</li>
          <li>• Avoid common words or personal information</li>
        </ul>
      </motion.div>

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={() => setStep(2)}
          variant="outline"
          className="flex-1 h-12 rounded-xl border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 cursor-pointer"
        >
          Back
        </Button>
        <Button type="submit" disabled={isLoading} className="btn-primary flex-1 h-12 text-lg justify-center">
          {isLoading ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </>
  )
}
