import Image from "next/image";
import Link from "next/link";

type Props = {
    size: number;
}
export const Logo = ({size}: Props) => {
    return(
        <Link href="/">
            <Image
                src={'/Principal_preto.png'}
                alt="Andreia Couto PLT"
                width={size}
                height={size}
                quality={100}
                className="items-center"
                />
        </Link>
    );
}