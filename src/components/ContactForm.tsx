"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { API_BASE_URL } from "@/lib/constants";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim() || "Website contact",
          message: form.message.trim()
        })
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      setForm(initialState);
      setStatus("success");
      setMessage("Thanks. Your message has been sent.");
    } catch {
      setStatus("error");
      setMessage("We could not send the message. Please email info@bulkbytes.org directly.");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-grid">
        <label>
          Name
          <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </label>
        <label>
          Email
          <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
      </div>
      <div className="field-grid">
        <label>
          Phone
          <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
        </label>
        <label>
          Subject
          <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} />
        </label>
      </div>
      <label>
        Message
        <textarea required rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
      </label>
      <button className="button primary" disabled={status === "loading"} type="submit">
        <Send size={18} aria-hidden="true" />
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {message ? <p className={`form-status ${status}`}>{message}</p> : null}
    </form>
  );
}
