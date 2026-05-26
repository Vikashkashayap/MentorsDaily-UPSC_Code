import { memo } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  Hash,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import type { EligibilityResult } from "../../utils/upsc-age-calculator/calculateAge";
import { format } from "date-fns";

interface ResultCardProps {
  result: EligibilityResult | null;
  examYear: number;
  isValidInput: boolean;
}

function StatRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl px-4 py-3",
        highlight
          ? "bg-white/20 dark:bg-white/5"
          : "bg-black/5 dark:bg-black/20"
      )}
    >
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}

function ResultCardComponent({ result, examYear, isValidInput }: ResultCardProps) {
  if (!isValidInput || !result) {
    return (
      <Card className="flex h-full min-h-[320px] items-center justify-center border-dashed border-white/40 bg-white/50 dark:bg-gray-900/40">
        <CardContent className="text-center text-gray-500 dark:text-gray-400">
          <CalendarClock className="mx-auto mb-3 h-10 w-10 text-blue-500/70" />
          <p className="font-medium">Fill in your details to see eligibility results</p>
        </CardContent>
      </Card>
    );
  }

  const eligible = result.isEligible;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card
        className={cn(
          "h-full overflow-hidden border-2",
          eligible
            ? "border-blue-400/50 bg-gradient-to-br from-blue-50/90 via-white/80 to-indigo-50/70 dark:from-blue-950/40 dark:via-gray-900/70 dark:to-indigo-950/30"
            : "border-red-400/50 bg-gradient-to-br from-red-50/90 via-white/80 to-orange-50/70 dark:from-red-950/30 dark:via-gray-900/70 dark:to-orange-950/20"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Eligibility Result — CSE {examYear}
            </CardTitle>
            {eligible ? (
              <CheckCircle2 className="h-8 w-8 shrink-0 text-blue-600" aria-hidden />
            ) : (
              <XCircle className="h-8 w-8 shrink-0 text-red-500" aria-hidden />
            )}
          </div>
          <p
            className={cn(
              "mt-2 flex items-center gap-2 text-sm font-semibold",
              eligible ? "text-blue-700 dark:text-blue-400" : "text-red-600 dark:text-red-400"
            )}
            role="status"
            aria-live="polite"
          >
            {eligible ? (
              <ShieldCheck className="h-4 w-4" aria-hidden />
            ) : (
              <AlertCircle className="h-4 w-4" aria-hidden />
            )}
            {result.eligibilityMessage}
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <StatRow label="Exact Age (on 1 Aug)" value={result.formattedAge} highlight />
          <StatRow
            label="Cut-off Date"
            value={format(result.cutoffDate, "d MMMM yyyy")}
          />
          <StatRow label="Max Age Allowed" value={`${result.maxAgeAllowed} years`} />
          <StatRow label="Attempts Used" value={result.attemptsUsed} />
          <StatRow
            label="Attempts Remaining"
            value={result.attemptsRemaining}
          />
          <StatRow
            label="Eligible Till Year"
            value={result.eligibleTillYear ?? "—"}
            highlight
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export const ResultCard = memo(ResultCardComponent);
