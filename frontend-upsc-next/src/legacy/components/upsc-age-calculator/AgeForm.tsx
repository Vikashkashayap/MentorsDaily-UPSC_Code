import { memo } from "react";
import { Calendar, Hash, Layers, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  CATEGORY_OPTIONS,
  getExamYearOptions,
  type CategoryKey,
} from "../../utils/upsc-age-calculator/upscRules";

export interface CalculatorFormState {
  dateOfBirth: string;
  category: CategoryKey;
  examYear: string;
  attemptsUsed: string;
}

interface AgeFormProps {
  values: CalculatorFormState;
  onChange: (patch: Partial<CalculatorFormState>) => void;
}

const examYears = getExamYearOptions();

function AgeFormComponent({ values, onChange }: AgeFormProps) {
  return (
    <Card className="h-full border-blue-100/80 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <User className="h-5 w-5 text-blue-600" aria-hidden />
          Enter Your Details
        </CardTitle>
        <CardDescription>
          Age is calculated as on <strong>1 August</strong> of the selected exam year (UPSC
          rule).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="dob" className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" aria-hidden />
            Date of Birth
          </Label>
          <Input
            id="dob"
            type="date"
            value={values.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            max={new Date().toISOString().split("T")[0]}
            aria-required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-600" aria-hidden />
            Category
          </Label>
          <Select
            value={values.category}
            onValueChange={(v) => onChange({ category: v as CategoryKey })}
          >
            <SelectTrigger id="category" aria-label="Select category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exam-year" className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" aria-hidden />
            Target Exam Year
          </Label>
          <Select
            value={values.examYear}
            onValueChange={(v) => onChange({ examYear: v })}
          >
            <SelectTrigger id="exam-year" aria-label="Select exam year">
              <SelectValue placeholder="Select exam year" />
            </SelectTrigger>
            <SelectContent>
              {examYears.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  UPSC CSE {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="attempts" className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-blue-600" aria-hidden />
            Attempts Already Used
          </Label>
          <Input
            id="attempts"
            type="number"
            min={0}
            max={20}
            value={values.attemptsUsed}
            onChange={(e) => onChange({ attemptsUsed: e.target.value })}
            aria-describedby="attempts-hint"
          />
          <p id="attempts-hint" className="text-xs text-gray-500 dark:text-gray-400">
            Enter 0 if this is your first attempt.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export const AgeForm = memo(AgeFormComponent);
