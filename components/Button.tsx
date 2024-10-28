import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

// Tipos base para as props
interface BaseButtonProps {
  children: Element | string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

interface ButtonProps
  extends BaseButtonProps, JSX.HTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

interface LinkProps
  extends BaseButtonProps, Omit<JSX.HTMLAttributes<HTMLAnchorElement>, "size"> {
  as: "a";
  href: string;
}

// Tipo união das props
type CombinedButtonProps = ButtonProps | LinkProps;

// Função auxiliar para determinar se é um link
function isLink(props: CombinedButtonProps): props is LinkProps {
  return props.as === "a";
}

// Classes base do botão
const baseClasses = `
  group relative
  inline-flex items-center justify-center rounded-lg
  shadow-lg shadow-neutral-500/20
  transition active:scale-95 hover:bg-gray-700 hover:text-white
  cursor-pointer whitespace-nowrap gap-2
`;

// Variantes de estilo
const variants = {
  default: "bg-default text-neutral-50",
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
    size = "md",
    ...rest
  } = props;

  const combinedClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  // Se for um link
  if (isLink(props)) {
    const { as, href, disabled, ...linkProps } = props;
    return (
      <a
        href={href}
        class={combinedClasses}
        {...linkProps}
      />
    );
  }

  // Se for um botão
  const { as, disabled, ...buttonProps } = props;
  return (
    <button
      type="button"
      disabled={!IS_BROWSER || disabled}
      class={combinedClasses}
      {...buttonProps}
    />
  );
}
