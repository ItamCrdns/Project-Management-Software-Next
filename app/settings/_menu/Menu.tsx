'use client'
import { Tab, TabGroup, TabList } from '@tremor/react'
import { settingsOptions } from './settingsOptions'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Menu: React.FC = () => {
  const pathname = usePathname()

  const currentIndex = settingsOptions.findIndex((option) => {
    return option.path.split('/')[2] === pathname.split('/')[2]
  })

  const defaultIndex = currentIndex === -1 ? 0 : currentIndex

  return (
    <TabGroup
      index={defaultIndex}
    >
      <TabList variant='line'>
        {settingsOptions.map((option) => {
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

export default Menu
