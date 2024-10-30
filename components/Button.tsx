import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

// Tipos para as variantes e tamanhos
type ButtonVariant = "default" | "outline" | "ghost" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

// Props específicas do botão
interface ButtonSpecificProps {
  variant?: ButtonVariant;
  buttonSize?: ButtonSize; // Renomeado de size para buttonSize
}

// Props do botão
type ButtonProps = ButtonSpecificProps & {
  as?: "button";
} & JSX.HTMLAttributes<HTMLButtonElement>;

// Props do link
type LinkProps = ButtonSpecificProps & {
  as: "a";
  href: string;
} & JSX.HTMLAttributes<HTMLAnchorElement>;

// Tipo união das props
type CombinedButtonProps = ButtonProps | LinkProps;

// Função auxiliar para determinar se é um link
function isLink(props: CombinedButtonProps): props is LinkProps {
  return props.as === "a";
}

// Classes base do botão
const baseClasses = `
  group
  inline-flex items-center justify-center rounded-lg
  shadow-lg shadow-neutral-500/20
  transition active:scale-95 hover:bg-gray-700 hover:text-white
  cursor-pointer whitespace-nowrap gap-2
`;

// Variantes de estilo
const variants = {
  default: "bg-default text-neutral-50",
  secondary: "bg-lime-200 text-lime-800",
  outline:
    "border-2 border-default text-default hover:bg-default hover:text-white",
  ghost:
    "bg-transparent text-default hover:bg-default/10 hover:text-default shadow-none",
} as const;

// Tamanhos
const sizes = {
  sm: "h-8 px-4 text-sm",
  md: "h-12 px-8 text-base",
  lg: "h-14 px-10 text-lg",
} as const;

export function Button(props: CombinedButtonProps) {
  const {
    className = "",
    variant = "default",
    buttonSize = "md",
  } = props;

  const combinedClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[buttonSize]}
    ${className}
  `;

  // Se for um link
  if (isLink(props)) {
    const { href, variant: _, buttonSize: __, ...linkProps } = props;
    return (
      <a
        href={href}
        class={combinedClasses}
        {...linkProps}
      />
    );
  }

  // Se for um botão
  const { disabled, variant: _, buttonSize: __, ...buttonProps } = props;
  return (
    <button
      type="button"
      disabled={!IS_BROWSER || disabled}
      class={combinedClasses}
      {...buttonProps}
    />
  );
}
