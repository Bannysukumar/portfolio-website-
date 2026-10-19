import { useMemo, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { profile } from "../data/profile";
import "./InquiryForm.css";

/**
 * Project enquiry form.
 *
 * Submission is honest about its configuration:
 * - If VITE_INQUIRY_ENDPOINT is set, the form POSTs JSON to it and reports the
 *   real result.
 * - Otherwise it composes a pre-filled email in the visitor's own mail client.
 *   Nothing is silently swallowed, and no third party is contacted.
 *
 * Spam protection: a hidden honeypot field plus a minimum time-on-form check.
 * No CAPTCHA is loaded, so no third-party scripts or cookies are involved.
 */

interface FormState {
  name: string;
  email: string;
  contactMethod: string;
  projectType: string;
  budget: string;
  timeline: string;
  features: string;
  company: string; // honeypot — must stay empty
  consent: boolean;
}

type Errors = Partial<Record<keyof FormState, string>>;

const PROJECT_TYPES = [
  "Business website",
  "Custom web application",
  "Backend / API",
  "Admin dashboard",
  "Work on an existing app",
  "Smart contract / Web3",
  "Android / mobile web",
  "Not sure yet",
];

const BUDGETS = [
  "Around ₹20,000 (starting range)",
  "₹20,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Not decided yet",
];

const TIMELINES = ["As soon as possible", "Within a month", "In one to three months", "Flexible / just exploring"];

const EMPTY: FormState = {
  name: "",
  email: "",
  contactMethod: "",
  projectType: "",
  budget: "",
  timeline: "",
  features: "",
  company: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(state: FormState): Errors {
  const errors: Errors = {};
  if (state.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(state.email.trim())) errors.email = "Please enter a valid email address.";
  if (!state.projectType) errors.projectType = "Please choose the type of project.";
  if (state.features.trim().length < 10) errors.features = "Please describe what needs to be built (at least a sentence).";
  if (!state.consent) errors.consent = "Please confirm you agree to be contacted about this enquiry.";
  return errors;
}

function buildMessage(state: FormState): string {
  return [
    `Name: ${state.name.trim()}`,
    `Email: ${state.email.trim()}`,
    state.contactMethod.trim() ? `Preferred contact: ${state.contactMethod.trim()}` : "",
    `Project type: ${state.projectType}`,
    state.budget ? `Approximate budget: ${state.budget}` : "",
    state.timeline ? `Desired timeline: ${state.timeline}` : "",
    "",
    "What needs to be built:",
    state.features.trim(),
  ]
    .filter(Boolean)
    .join("\n");
}

export function InquiryForm() {
  const [state, setState] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [notice, setNotice] = useState("");
  const startedAt = useRef<number>(Date.now());

  const endpoint = useMemo(() => import.meta.env.VITE_INQUIRY_ENDPOINT?.trim() || "", []);
  const viaEmail = endpoint === "";

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    // Honeypot: a real visitor never sees this field. Pretend success for bots.
    if (state.company.trim() !== "") {
      setStatus("sent");
      setNotice("Thank you — your enquiry has been noted.");
      return;
    }

    const found = validate(state);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      setNotice("");
      const firstKey = Object.keys(found)[0];
      document.getElementById(`inq-${firstKey}`)?.focus();
      return;
    }

    // Minimum time on form — bots submit instantly.
    if (Date.now() - startedAt.current < 1500) {
      setStatus("error");
      setNotice("That was a little fast — please review your details and submit again.");
      return;
    }

    if (viaEmail) {
      const subject = `Project enquiry${state.projectType ? ` — ${state.projectType}` : ""}`;
      const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        buildMessage(state),
      )}`;
      window.location.href = mailto;
      setStatus("sent");
      setNotice(
        "Your email client should open with the details pre-filled. If it does not, email " +
          profile.email +
          " directly.",
      );
      return;
    }

    setStatus("submitting");
    setNotice("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...state,
          company: undefined,
          submittedAt: new Date().toISOString(),
          source: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setStatus("sent");
      setNotice("Thank you — your enquiry has been sent. I usually reply within a day.");
      setState(EMPTY);
    } catch {
      setStatus("error");
      setNotice(
        `The form could not be sent automatically. Please email ${profile.email} directly, or try again shortly.`,
      );
    }
  };

  const fieldError = (key: keyof FormState) =>
    errors[key] ? (
      <span className="inq__error" id={`inq-${key}-error`}>
        <AlertCircle size={14} aria-hidden="true" /> {errors[key]}
      </span>
    ) : null;

  const aria = (key: keyof FormState) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `inq-${key}-error` : undefined,
  });

  return (
    <form className="inq" onSubmit={onSubmit} noValidate>
      <div className="inq__row">
        <div className="inq__field">
          <label htmlFor="inq-name">Your name *</label>
          <input
            id="inq-name"
            name="name"
            type="text"
            autoComplete="name"
            value={state.name}
            onChange={(event) => update("name", event.target.value)}
            {...aria("name")}
          />
          {fieldError("name")}
        </div>

        <div className="inq__field">
          <label htmlFor="inq-email">Email *</label>
          <input
            id="inq-email"
            name="email"
            type="email"
            autoComplete="email"
            value={state.email}
            onChange={(event) => update("email", event.target.value)}
            {...aria("email")}
          />
          {fieldError("email")}
        </div>
      </div>

      <div className="inq__row">
        <div className="inq__field">
          <label htmlFor="inq-contactMethod">Preferred contact method</label>
          <input
            id="inq-contactMethod"
            name="contactMethod"
            type="text"
            placeholder="Email, phone, WhatsApp…"
            value={state.contactMethod}
            onChange={(event) => update("contactMethod", event.target.value)}
          />
        </div>

        <div className="inq__field">
          <label htmlFor="inq-projectType">Project type *</label>
          <select
            id="inq-projectType"
            name="projectType"
            value={state.projectType}
            onChange={(event) => update("projectType", event.target.value)}
            {...aria("projectType")}
          >
            <option value="">Choose one…</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {fieldError("projectType")}
        </div>
      </div>

      <div className="inq__row">
        <div className="inq__field">
          <label htmlFor="inq-budget">Approximate budget</label>
          <select
            id="inq-budget"
            name="budget"
            value={state.budget}
            onChange={(event) => update("budget", event.target.value)}
          >
            <option value="">Not sure yet</option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div className="inq__field">
          <label htmlFor="inq-timeline">Desired timeline</label>
          <select
            id="inq-timeline"
            name="timeline"
            value={state.timeline}
            onChange={(event) => update("timeline", event.target.value)}
          >
            <option value="">Not decided yet</option>
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="inq__field">
        <label htmlFor="inq-features">What needs to be built? *</label>
        <textarea
          id="inq-features"
          name="features"
          rows={5}
          placeholder="Describe the project, the people who will use it, and anything it must connect to."
          value={state.features}
          onChange={(event) => update("features", event.target.value)}
          {...aria("features")}
        />
        {fieldError("features")}
      </div>

      {/* Honeypot — hidden from people and assistive technology, tempting to bots. */}
      <div className="inq__hp" aria-hidden="true">
        <label htmlFor="inq-company">Company (leave blank)</label>
        <input
          id="inq-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={state.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </div>

      <div className="inq__consent">
        <input
          id="inq-consent"
          name="consent"
          type="checkbox"
          checked={state.consent}
          onChange={(event) => update("consent", event.target.checked)}
          {...aria("consent")}
        />
        <label htmlFor="inq-consent">
          I agree to be contacted about this enquiry. *
        </label>
      </div>
      {fieldError("consent")}

      <p className="inq__privacy">
        Your details are used only to reply to this enquiry. They are not sold, not shared, and not added to a
        mailing list. {viaEmail ? "This form composes an email in your own mail client; nothing is stored on this site." : ""}
      </p>

      <div className="inq__actions">
        <button className="btn" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry"} <Send size={15} aria-hidden="true" />
        </button>
        <p className="inq__alt">
          or email <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </div>

      <p
        className={`inq__notice ${status === "sent" ? "is-success" : ""} ${status === "error" ? "is-error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice && (
          <>
            {status === "sent" && <CheckCircle2 size={15} aria-hidden="true" />}
            {status === "error" && <AlertCircle size={15} aria-hidden="true" />}
            <span>{notice}</span>
          </>
        )}
      </p>
    </form>
  );
}
