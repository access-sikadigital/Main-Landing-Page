import { useEffect, useRef, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CtaButton } from "./CtaButton";
import { MultiSelect } from "./MultiSelect";
import { SITE, CTA_LABEL, quoteForm, quoteServiceOptions, timingOptions } from "@/lib/site-data";
import { quoteSchema, type QuoteValues } from "@/lib/quote-schema";
import { submitLead } from "@/lib/lead.functions";
import { captureTracking, getTracking } from "@/lib/tracking";
import { uploadPhotos, validateFiles } from "@/lib/photo-upload";

const baseInput =
  "w-full rounded-md transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:outline-none";

/** Every colour decision lives here, so one form serves both panels. */
const TONE = {
  light: {
    input:
      "border border-black/10 bg-white text-charcoal placeholder:text-muted-foreground/70 shadow-sm hover:border-black/20 focus:border-primary",
    label: "mb-1 block text-[0.8rem] font-semibold text-charcoal sm:mb-1.5 sm:text-sm",
    hint: "text-charcoal/60",
    muted: "text-charcoal/50",
    error: "text-destructive",
    dropzone: "border-dashed border-black/20 bg-white text-charcoal hover:border-primary/50",
    panel: "border-black/10 bg-white text-charcoal",
    option: "text-charcoal hover:bg-black/[0.04]",
  },
  onGreen: {
    // White fields on the green panel. Charcoal ones read as disabled boxes
    // rather than something to type into.
    input:
      "border border-white/20 bg-white text-charcoal placeholder:text-charcoal/45 shadow-sm hover:border-white focus:border-white",
    label: "mb-1 block text-[0.8rem] font-semibold text-primary-foreground sm:mb-1.5 sm:text-sm",
    hint: "text-primary-foreground/80",
    muted: "text-primary-foreground/65",
    error: "text-white",
    dropzone: "border-dashed border-white/40 bg-white text-charcoal hover:border-white",
    panel: "border-white/20 bg-white text-charcoal",
    option: "text-charcoal hover:bg-black/[0.04]",
  },
} as const;

/** Full-width fields sit on their own row; the short ones pair up. */
const WIDE = "sm:col-span-2";

/**
 * The single-step quote form from copy deck v8, section 02.
 *
 * Field order is the deck's and is deliberate: identity first, then the job.
 *
 * `compact` only tightens the spacing — it is what lets the whole form sit in
 * the hero card without running off the fold. The optional fields are switched
 * separately, because the modal is a quick-capture surface where every extra
 * field costs completions, and that is a different decision from density.
 */
export function QuoteForm({
  compact = false,
  tone = "light",
  photos = true,
  comments = true,
}: {
  compact?: boolean;
  tone?: keyof typeof TONE;
  photos?: boolean;
  comments?: boolean;
}) {
  const t = TONE[tone];
  const labelClass = t.label;
  const inputClass = `${baseInput} ${t.input} ${
    compact
      ? "px-4 py-2.5 text-[0.95rem]"
      : // Mobile gets the compact metrics whether or not `compact` was asked
        // for, and only grows from sm. Eight fields at 16px of vertical padding
        // each, plus a label and a 20px gutter apiece, ran the hero form past
        // two full phone screens — and a form you cannot see the end of reads as
        // longer than it is, which is the thing that stops people starting it.
        "px-4 py-2.5 text-[0.95rem] sm:px-5 sm:py-3.5 sm:text-base"
  }`;

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    // Validate each field as soon as the visitor leaves it, matching the
    // service pages — so bad phone numbers, empty names etc. flag immediately.
    mode: "onTouched",
    defaultValues: { services: [], timing: "" },
  });

  // The service picker is a custom control rather than a native input, so it is
  // driven through the field controller instead of `register`.
  const servicesField = useController({ control, name: "services" });

  // Record first-touch ad/campaign attribution as soon as the form mounts.
  useEffect(() => {
    captureTracking();
  }, []);

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    const problem = validateFiles(picked);
    setFileError(problem);
    setFiles(problem ? [] : picked);
  }

  /** Photo failures are logged for the crew, never allowed to block the lead. */
  function noteFor(reason: "not-configured" | "failed", count: number) {
    const why = reason === "not-configured" ? "uploads are not configured" : "the upload failed";
    return `Customer attached ${count} photo(s) but ${why}. Follow up for them.`;
  }

  const onSubmit = async (values: QuoteValues) => {
    setErrorMsg(null);

    let photoUrls: string[] = [];
    let photoNote = "";
    if (photos) {
      const upload = await uploadPhotos(files);
      if (upload.ok) photoUrls = upload.urls;
      else photoNote = noteFor(upload.reason, files.length);
    }

    try {
      await submitLead({
        data: {
          ...values,
          photoUrls,
          photoNote,
          website: honeypotRef.current?.value ?? "",
          page: window.location.pathname,
          pageUrl: window.location.href,
          referrer: document.referrer,
          tracking: getTracking(),
        },
      });
      setSubmitted(true);
    } catch {
      setErrorMsg(
        `Something went wrong sending your request. Please try again, or call us on ${SITE.phone} and we'll sort it straight away.`,
      );
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center rounded-lg bg-light px-6 py-16 text-center sm:px-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary"
            >
              <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
                <motion.path
                  d="M2 13 12 23 32 3"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
              </svg>
            </motion.div>
            <h3 className="font-heading mt-8 text-2xl text-light-foreground">Got it</h3>
            <p className="mt-4 max-w-md text-light-foreground/70">
              Your fixed price is on its way. Itemised, in writing, within 24 hours. If it is
              urgent, call us on{" "}
              <a href={SITE.phoneHref} className="font-semibold text-primary hover:underline">
                {SITE.phone}
              </a>
              .
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            exit={{ opacity: 0, y: -12 }}
            className={`grid sm:grid-cols-2 ${compact ? "gap-3" : "gap-3 sm:gap-5"}`}
          >
            {/* Honeypot: hidden from real users; bots that fill it are dropped server-side. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="q-website">Website</label>
              <input
                id="q-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                ref={honeypotRef}
              />
            </div>

            <div>
              <label htmlFor="q-name" className={labelClass}>
                Name
              </label>
              <input
                id="q-name"
                autoComplete="name"
                placeholder="First and last name"
                className={inputClass}
                {...register("name")}
              />
              {errors.name && <p className={`mt-1.5 text-sm ${t.error}`}>{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="q-email" className={labelClass}>
                Email
              </label>
              <input
                id="q-email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                className={inputClass}
                {...register("email")}
              />
              {errors.email && (
                <p className={`mt-1.5 text-sm ${t.error}`}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="q-phone" className={labelClass}>
                Phone
              </label>
              <input
                id="q-phone"
                type="tel"
                autoComplete="tel"
                placeholder="04xx xxx xxx"
                className={inputClass}
                {...register("phone")}
              />
              {errors.phone && (
                <p className={`mt-1.5 text-sm ${t.error}`}>{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="q-suburb" className={labelClass}>
                Suburb or postcode
              </label>
              <input
                id="q-suburb"
                autoComplete="address-level2"
                placeholder="e.g. South Yarra"
                className={inputClass}
                {...register("suburb")}
              />
              {errors.suburb && (
                <p className={`mt-1.5 text-sm ${t.error}`}>{errors.suburb.message}</p>
              )}
            </div>

            {/* Multi-select. It looks and opens like the timing dropdown beside
                it, but each row toggles instead of closing the menu — see
                MultiSelect for why neither a checkbox grid nor a native
                `<select multiple>` was usable here. */}
            <div className={WIDE}>
              <label htmlFor="q-services" className={labelClass}>
                What needs to come out?{" "}
                <span className={`font-normal ${t.muted}`}>(select all that apply)</span>
              </label>
              <MultiSelect
                id="q-services"
                options={quoteServiceOptions}
                value={servicesField.field.value ?? []}
                onChange={servicesField.field.onChange}
                onBlur={servicesField.field.onBlur}
                invalid={Boolean(errors.services)}
                triggerClassName={inputClass}
                panelClassName={t.panel}
                optionClassName={t.option}
                chipClassName="bg-primary text-primary-foreground"
              />
              {errors.services && (
                <p id="q-services-error" className={`mt-1.5 text-sm ${t.error}`}>
                  {errors.services.message}
                </p>
              )}
            </div>

            <div className={WIDE}>
              <label htmlFor="q-timing" className={labelClass}>
                When are you looking to start?
              </label>
              <select id="q-timing" className={inputClass} {...register("timing")}>
                <option value="" disabled>
                  Select…
                </option>
                {timingOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {errors.timing && (
                <p className={`mt-1.5 text-sm ${t.error}`}>{errors.timing.message}</p>
              )}
            </div>

            {/* Step 01 of the process promises "attach any photos for a faster,
                more accurate quote" — this is the field that makes that true.
                Uploads straight to Cloudinary; only the URLs go on to GoHighLevel. */}
            {photos && (
              <div className={WIDE}>
                <label htmlFor="q-photos" className={labelClass}>
                  Photos of the job{" "}
                  <span className={`font-normal ${t.muted}`}>(optional, speeds up your price)</span>
                </label>
                <input
                  id="q-photos"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  multiple
                  onChange={onFilesChange}
                  className={`w-full cursor-pointer rounded-md border px-4 py-3 text-sm file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary-foreground ${t.dropzone}`}
                />
                {fileError ? (
                  <p className={`mt-1.5 text-sm ${t.error}`}>{fileError}</p>
                ) : (
                  files.length > 0 && (
                    <p className={`mt-1.5 text-xs ${t.hint}`}>
                      {files.length} photo{files.length > 1 ? "s" : ""} ready to send
                    </p>
                  )
                )}
              </div>
            )}

            {comments && (
              <div className={WIDE}>
                <label htmlFor="q-comments" className={labelClass}>
                  Comments <span className={`font-normal ${t.muted}`}>(optional)</span>
                </label>
                <textarea
                  id="q-comments"
                  rows={4}
                  placeholder="Rooms, access, upper floors, anything pre-1990…"
                  className={inputClass}
                  {...register("comments")}
                />
              </div>
            )}

            <div className={WIDE}>
              <CtaButton
                type="submit"
                disabled={isSubmitting}
                fullWidth
                icon={!isSubmitting}
                size={compact ? "md" : "lg"}
                variant={tone === "onGreen" ? "solidLight" : "solid"}
                className={compact ? "" : "sm:w-auto"}
              >
                {isSubmitting ? "Sending…" : CTA_LABEL}
              </CtaButton>
              {errorMsg && (
                <p role="alert" className={`mt-4 text-sm ${t.error}`}>
                  {errorMsg}
                </p>
              )}
              {/* Deck note 2: "We do not chase you" stays directly under the
                  submit button. It is the line that answers the unspoken reason
                  people do not fill these in. */}
              <p className={`text-xs ${t.hint} ${compact ? "mt-3" : "mt-4"}`}>
                {quoteForm.fine} <strong className="font-bold">{quoteForm.fineEmphasis}</strong>
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
