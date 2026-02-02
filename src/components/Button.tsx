import Link from "next/link";

type CommonProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

type AnchorProps = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
  target?: string;
  rel?: string;
};

type ButtonProps = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button(props: AnchorProps | ButtonProps) {
  const { className, children } = props;

  // ✅ clean narrowing: anchor branch
  if ("href" in props) {
    return (
      <Link
        href={props.href}
        className={className}
        target={props.target}
        rel={props.rel}
      >
        {children}
      </Link>
    );
  }

  // ✅ button branch: type is valid here
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={className}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
}


