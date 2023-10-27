import Link from 'next/link'

interface FooterProps {
  showingCount: number
  totalCount: number
  href: string
}

const Footer: React.FunctionComponent<FooterProps> = ({
  showingCount,
  totalCount,
  href
}) => {
  return (
    <h3 style={{ fontWeight: 500, marginBottom: 0 }}>
      Showing {showingCount} of {totalCount} entries
      <Link href={href}>See all</Link>
    </h3>
  )
}

export default Footer
