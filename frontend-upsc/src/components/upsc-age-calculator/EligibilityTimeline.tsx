import { memo } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import type { TimelineYear } from "../../utils/upsc-age-calculator/calculateAge";

interface EligibilityTimelineProps {
  timeline: TimelineYear[];
  examYear: number;
}

function EligibilityTimelineComponent({ timeline, examYear }: EligibilityTimelineProps) {
  if (!timeline.length) return null;

  return (
    <Card className="border-blue-100/80 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900/70">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">
          Eligibility Timeline
        </CardTitle>
        <CardDescription>
          Year-wise UPSC CSE eligibility from {examYear} (age on 1 August each year)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {timeline.map((item, index) => (
            <motion.li
              key={item.year}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-center justify-between rounded-xl border px-4 py-3",
                item.eligible
                  ? "border-blue-200/80 bg-blue-50/80 dark:border-blue-800/50 dark:bg-blue-950/30"
                  : "border-red-200/60 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20"
              )}
            >
              <span className="font-bold text-gray-900 dark:text-white">{item.year}</span>
              <span className="flex items-center gap-2">
                {item.eligible ? (
                  <>
                    <Check className="h-5 w-5 text-blue-600" aria-hidden />
                    <span className="sr-only">Eligible</span>
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                      Eligible
                    </span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5 text-red-500" aria-hidden />
                    <span className="sr-only">Not eligible</span>
                    <span
                      className="text-xs font-medium text-red-600 dark:text-red-400"
                      title={item.reason}
                    >
                      Not eligible
                    </span>
                  </>
                )}
              </span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export const EligibilityTimeline = memo(EligibilityTimelineComponent);
