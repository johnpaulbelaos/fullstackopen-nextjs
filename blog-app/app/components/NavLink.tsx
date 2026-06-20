import Link from "next/link"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href} className="hover:text-gray-300 focus:underline focus:font-bold underline-offset-4">
      {children}
    </Link>
  )
}

export default NavLink