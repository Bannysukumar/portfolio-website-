/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional HTTPS endpoint that accepts the enquiry form as a JSON POST.
   * When unset, the form falls back to composing an email in the visitor's
   * mail client. See README ("Enquiry form").
   */
  readonly VITE_INQUIRY_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
