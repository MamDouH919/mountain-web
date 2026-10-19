"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { sendContact, type ContactField, type ContactState } from "@/app/[locale]/contact/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { serviceIds } from "@/content/services";

const fieldClass =
  "h-12 rounded-2xl border-white/10 bg-white/[0.03] px-4 text-base text-white placeholder:text-white/30 focus-visible:border-brand/60 focus-visible:ring-brand/20 dark:bg-white/[0.03] md:text-sm";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const s = useTranslations("Services.items");
  const searchParams = useSearchParams();
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });

  // "Discuss this service" links on /services pre-select the service.
  const preset = searchParams.get("service");
  const values = state.status === "error" ? state.values : undefined;
  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const defaultService = values?.service || (preset && serviceIds.includes(preset as never) ? preset : null);

  const items = [
    ...serviceIds.map((id) => ({ value: id, label: s(`${id}.title`) })),
    { value: "other", label: t("serviceOther") },
  ];

  const errorText = (field: ContactField) =>
    errors?.[field] ? (
      <p id={`${field}-error`} className="mt-2 text-sm text-red-400">
        {t(`errors.${field}`)}
      </p>
    ) : null;

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        className="flex min-h-[28rem] flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-zinc-950/70 p-10 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        >
          <CheckCircle2 className="size-14 text-brand" />
        </motion.span>
        <p className="mt-6 max-w-sm text-lg text-white">{t("success")}</p>
      </motion.div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      // Remount after a failed submit so the uncontrolled fields pick up the
      // values the server echoed back.
      key={JSON.stringify(values ?? {})}
      className="space-y-6 rounded-[2rem] border border-white/10 bg-zinc-950/70 p-6 backdrop-blur sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="mb-2.5 text-white/70">{t("name")}</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={values?.name}
            placeholder={t("namePlaceholder")}
            aria-invalid={errors?.name}
            aria-describedby={errors?.name ? "name-error" : undefined}
            className={fieldClass}
          />
          {errorText("name")}
        </div>
        <div>
          <Label htmlFor="email" className="mb-2.5 text-white/70">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            required
            defaultValue={values?.email}
            placeholder={t("emailPlaceholder")}
            aria-invalid={errors?.email}
            aria-describedby={errors?.email ? "email-error" : undefined}
            className={`${fieldClass} rtl:text-end`}
          />
          {errorText("email")}
        </div>
      </div>

      <div>
        <Label id="service-label" className="mb-2.5 text-white/70">{t("service")}</Label>
        <Select name="service" items={items} defaultValue={defaultService} required>
          <SelectTrigger
            aria-labelledby="service-label"
            aria-invalid={errors?.service}
            className={`${fieldClass} w-full data-[size=default]:h-12`}
          >
            <SelectValue placeholder={t("servicePlaceholder")} />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-white/10 bg-zinc-950">
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value} className="rounded-xl py-2.5">
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errorText("service")}
      </div>

      <div>
        <Label htmlFor="message" className="mb-2.5 text-white/70">{t("message")}</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={values?.message}
          placeholder={t("messagePlaceholder")}
          aria-invalid={errors?.message}
          aria-describedby={errors?.message ? "message-error" : undefined}
          className={`${fieldClass} h-auto min-h-36 py-3`}
        />
        {errorText("message")}
      </div>

      {/* Honeypot for bots, hidden from people and assistive tech. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <AnimatePresence>
        {state.status === "error" && !errors && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {t("error")}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-[0_0_40px_-10px_var(--brand)] transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t("sending")}
          </>
        ) : (
          <>
            {t("submit")}
            <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
          </>
        )}
      </button>
    </form>
  );
}
