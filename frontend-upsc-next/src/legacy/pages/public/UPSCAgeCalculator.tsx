import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "@/lib/navigation";
import { parseISO, isValid } from "date-fns";
import { Calculator, Sparkles } from "lucide-react";
import { AgeForm, type CalculatorFormState } from "../../components/upsc-age-calculator/AgeForm";
import { ResultCard } from "../../components/upsc-age-calculator/ResultCard";
import { EligibilityTimeline } from "../../components/upsc-age-calculator/EligibilityTimeline";
import { FAQSection } from "../../components/upsc-age-calculator/FAQSection";
import { SEOContent } from "../../components/upsc-age-calculator/SEOContent";
import { FAQ_ITEMS } from "../../components/upsc-age-calculator/faqData";
import { Button } from "../../components/ui/button";
import {
  calculateEligibility,
  generateEligibilityTimeline,
} from "../../utils/upsc-age-calculator/calculateAge";
import { isValidCategory } from "../../utils/upsc-age-calculator/upscRules";
const DEFAULT_FORM: CalculatorFormState = {
  dateOfBirth: "",
  category: "GENERAL",
  examYear: "2026",
  attemptsUsed: "0",
};

function scrollToCalculator() {
  document.getElementById("upsc-calculator")?.scrollIntoView({ behavior: "smooth" });
}

function UPSCAgeCalculatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const confettiFired = useRef(false);
  const [form, setForm] = useState<CalculatorFormState>(() => ({
    ...DEFAULT_FORM,
    dateOfBirth: searchParams?.get("dob") || "",
    category: isValidCategory(searchParams?.get("category") || "")
      ? (searchParams.get("category") as CalculatorFormState["category"])
      : DEFAULT_FORM.category,
    examYear: searchParams?.get("year") || DEFAULT_FORM.examYear,
    attemptsUsed: searchParams?.get("attempts") ?? DEFAULT_FORM.attemptsUsed,
  }));

  const updateForm = useCallback((patch: Partial<CalculatorFormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (form.dateOfBirth) params.set("dob", form.dateOfBirth);
    if (form.category) params.set("category", form.category);
    if (form.examYear) params.set("year", form.examYear);
    if (form.attemptsUsed !== "0") params.set("attempts", form.attemptsUsed);
    setSearchParams(params, { replace: true });
  }, [form, setSearchParams]);

  const parsedDob = useMemo(() => {
    if (!form.dateOfBirth) return null;
    const d = parseISO(form.dateOfBirth);
    return isValid(d) ? d : null;
  }, [form.dateOfBirth]);

  const examYear = Number(form.examYear) || 2026;
  const attemptsUsed = Math.max(0, parseInt(form.attemptsUsed, 10) || 0);

  const isValidInput = Boolean(parsedDob && form.category && examYear >= 2000);

  const result = useMemo(() => {
    if (!parsedDob || !isValidCategory(form.category)) return null;
    return calculateEligibility(parsedDob, form.category, examYear, attemptsUsed);
  }, [parsedDob, form.category, examYear, attemptsUsed]);

  const timeline = useMemo(() => {
    if (!parsedDob || !isValidCategory(form.category)) return [];
    return generateEligibilityTimeline(
      parsedDob,
      form.category,
      examYear,
      attemptsUsed,
      8
    );
  }, [parsedDob, form.category, examYear, attemptsUsed]);

  useEffect(() => {
    if (!result?.isEligible || confettiFired.current) return;

    confettiFired.current = true;
    void import("canvas-confetti").then(({ default: confetti }) => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#2563eb", "#4f46e5", "#f59e0b", "#60a5fa"],
        disableForReducedMotion: true,
      });
    });
  }, [result?.isEligible]);

  useEffect(() => {
    if (!result?.isEligible) {
      confettiFired.current = false;
    }
  }, [result?.isEligible]);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-indigo-50/40 dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950">
        {/* Animated background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-indigo-400/12 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 14, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-blue-300/10 blur-3xl"
          />
        </div>

        {/* Hero */}
        <header className="relative mx-auto max-w-5xl px-4 pb-8 pt-10 text-center md:pt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-4 py-1.5 text-sm font-medium text-blue-800 shadow-sm backdrop-blur dark:border-blue-800/50 dark:bg-gray-900/60 dark:text-blue-300">
              <Sparkles className="h-4 w-4 text-blue-600" aria-hidden />
              Free IAS Eligibility Checker
            </span>
            <h1 className="mt-4 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-blue-300 dark:via-blue-400 dark:to-indigo-400 md:text-5xl lg:text-6xl">
              UPSC Age Calculator
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Check your UPSC eligibility, IAS age limit, and remaining attempts instantly.
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-8"
              onClick={scrollToCalculator}
            >
              <Calculator className="h-5 w-5" aria-hidden />
              Calculate Now
            </Button>
          </motion.div>
        </header>

        {/* Calculator */}
        <section
          id="upsc-calculator"
          className="relative mx-auto max-w-6xl px-4 pb-12"
          aria-label="UPSC age and eligibility calculator"
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <AgeForm values={form} onChange={updateForm} />
            <ResultCard
              result={result}
              examYear={examYear}
              isValidInput={isValidInput}
            />
          </div>
          {isValidInput && timeline.length > 0 && (
            <div className="mt-8">
              <EligibilityTimeline timeline={timeline} examYear={examYear} />
            </div>
          )}
        </section>

        <SEOContent />
        <FAQSection />
      </div>
    </>
  );
}

export default memo(UPSCAgeCalculatorPage);
