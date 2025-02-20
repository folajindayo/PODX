import Image from "next/image";
interface LogoProps {
    className?: string;
  }

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
      <div className={className}>
        <Image src="/logo.png" layout="fill" objectFit="contain" alt="Podx" />
        </div>
    )
}

export default Logo;