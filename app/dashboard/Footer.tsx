import Link from 'next/link'

interface FooterProps {
  showingCount: number
  totalCount: number
  href: string
}

const Footer: React.FunctionComponent<FooterProps> = (props) => {
  return (
    <h3 style={{ fontWeight: 500, marginBottom: 0 }}>
      Showing {props.showingCount} of {props.totalCount} entries
      <Link href={props.href}>See all</Link>
    </h3>
  )
}

export default Footer
