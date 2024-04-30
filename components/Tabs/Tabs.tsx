'use client'
import { usePathname } from 'next/navigation'
import { type ITab } from './ITab.interface'
import { Tab, TabGroup, TabList } from '@tremor/react'
import Link from 'next/link'

const Tabs: React.FC<{ options: ITab[] }> = (props) => {
  const { options } = props
  const pathname = usePathname()

  const currentIndex = options.findIndex((option) => {
    return option.path.split('/')[2] === pathname.split('/')[2]
  })

  const defaultIndex = currentIndex === -1 ? 0 : currentIndex

  return (
    <TabGroup index={defaultIndex}>
      <TabList variant='line'>
        {options.map((option) => {
          return (
            <Tab key={option.index} value={option.index}>
              <Link href={option.path}>{option.name}</Link>
            </Tab>
          )
        })}
      </TabList>
    </TabGroup>
  )
}

export default Tabs
