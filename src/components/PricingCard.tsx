import Link from "next/link";
import { CiBadgeDollar } from "react-icons/ci";
import { IoRocketOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import type { PricingPlan } from "@/types/site";

const planIcons = [IoRocketOutline, CiBadgeDollar, LuCrown];

function getField(raw: Record<string, unknown> | undefined, key: string) {
  const value = raw?.[key];
  return typeof value === "string" ? value : "";
}

function asArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function normalizePrice(price: string) {
  if (!price) return "Custom";
  return price.startsWith("$") ? price : `$${price}`;
}

type PricingCardProps = {
  plan: PricingPlan;
  iconIndex: number;
};

export function PricingCard({ plan, iconIndex }: PricingCardProps) {
  const Icon = planIcons[iconIndex] || planIcons[0];
  const raw = plan.raw as Record<string, unknown>;
  const title = getField(raw, "planName") || plan.title;
  const price = normalizePrice(getField(raw, "price") || plan.price);
  const description = getField(raw, "billingNote") || getField(raw, "description") || plan.billingNote;
  const badge = getField(raw, "planBadge") || plan.badge || "";
  const platformLimit = getField(raw, "platformLimit") || plan.platformLimit || "";
  const billingCycle = getField(raw, "billingCycle") || plan.billingCycle || "month";
  const rawFeatures = asArray(raw.features);
  const features = rawFeatures.length > 0 ? rawFeatures.map((item) => String(item)) : plan.features;
  const highlighted = plan.highlighted;

  return (
    <div
      className={`rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full ${
        highlighted
          ? "bg-linear-to-br from-slate-900 via-cyan-900 to-slate-900 text-white shadow-2xl"
          : "bg-white text-gray-900 shadow-lg"
      }`}
    >
      <div className="px-4 sm:px-6">
        {badge ? (
          <span className="inline-block px-4 sm:px-6 ml-10 sm:ml-20 py-1 rounded-bl-2xl rounded-br-2xl text-xs sm:text-sm font-bold bg-cyan-500 text-white">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="px-4 sm:px-6 pt-6 sm:pt-8">
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border mt-4 mb-4 sm:mb-6 mx-auto transition-colors ${
            highlighted ? "bg-white border-gray-200" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className={`text-2xl sm:text-3xl ${highlighted ? "text-cyan-600" : "text-cyan-500"}`}>
            <Icon />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{title}</h3>
      </div>

      <div className="px-6 sm:px-10 text-center mb-2">
        <span className="text-3xl sm:text-4xl font-bold">{price}</span>
        <span
          className={`text-base sm:text-lg transition-colors ${
            highlighted ? "text-white" : "text-gray-600"
          }`}
        >
          /{billingCycle.replace("-", " ")}
        </span>
      </div>

      <div className="px-4 sm:px-8 text-center mb-6">
        <p
          className={`text-xs sm:text-sm transition-colors ${
            highlighted ? "text-gray-200" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>

      {platformLimit ? (
        <div className="px-4 sm:px-8 text-center mb-6">
          <span
            className={`inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-light transition-colors border ${
              !highlighted ? "shadow-lg [box-shadow:inset_0_2px_8px_rgba(0,0,0,0.3)]" : ""
            } ${
              highlighted ? "text-black bg-white border-gray-100" : "text-black bg-white border-gray-100"
            }`}
          >
            {platformLimit}
          </span>
        </div>
      ) : null}

      <div className="px-4 sm:px-8 grow mb-6 sm:mb-8">
        <ul className="space-y-2 sm:space-y-3">
          {features.slice(0, 5).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
              <span
                className={`text-base sm:text-lg leading-none transition-colors ${
                  highlighted ? "text-white" : "text-gray-400"
                }`}
              >
                •
              </span>
              <span
                className={`transition-colors ${
                  highlighted ? "text-gray-200" : "text-gray-500"
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 sm:px-8 pb-6 sm:pb-8">
        <Link href="/contact">
          <span
            className={`block rounded-full border border-cyan-600 px-6 py-3 text-center text-sm font-medium transition-all duration-300 sm:text-base ${
              highlighted
                ? "bg-white text-cyan-600 hover:bg-cyan-600 hover:text-white"
                : "bg-cyan-600 text-white hover:bg-white hover:text-cyan-600"
            }`}
          >
            Get Started
          </span>
        </Link>
      </div>
    </div>
  );
}
