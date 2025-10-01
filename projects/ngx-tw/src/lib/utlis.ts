export const tw = (
  template: TemplateStringsArray,
  ...values: (string | undefined)[]
) => {
  return template.raw[0]
    .split(/\s+/)
    .filter((c) => c.trim())
    .join(' ');
};
