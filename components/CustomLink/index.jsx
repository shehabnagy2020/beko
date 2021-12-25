import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const CustomLink = ({ href, children, activeClassName, className, style }) => {
    const router = useRouter();

    return <Link href={href}><a style={style} className={`${className} ${router.pathname === href ? activeClassName : ""}`}>{children}</a></Link>
}

export default CustomLink
