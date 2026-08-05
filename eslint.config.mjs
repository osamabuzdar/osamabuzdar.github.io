import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      "assets/**",
      "css/**",
      "js/**",
      "fonts/**",
      "public/**",
      "out/**",
      ".next/**"
    ]
  },
  ...nextVitals,
  {
    rules: {
      "@next/next/no-img-element": "off"
    }
  }
];

export default eslintConfig;
