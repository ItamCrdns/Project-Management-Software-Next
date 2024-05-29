'use client'
import NoPicture from '@/components/No profile picture/NoPicture'
import { CompanyAndCounts } from '@/interfaces/companyAndCounts'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ClientsList = ({
  clients
}: {
  clients: CompanyAndCounts[]
}) => {
  return (
    <ul>
      {clients.map((client, index) => (
        <motion.li
          key={client.company.companyId}
          layout
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.15, delay: index * 0.025 }}
          className='flex items-center h-[60px]'
        >
          <div className='flex gap-4 items-center'>
            {client.company.logo !== null ? (
              <Image
                src={client.company.logo}
                alt={client.company.name}
                width={30}
                height={30}
                className='rounded-full'
              />
            ) : (
              <div className='flex w-[30px] h-[30px]'>
                <NoPicture width='30px' height='30px' />
              </div>
            )}
            <div>
              <p className='font-semibold'>{client.company.name}</p>
              <p className='text-xs text-gray-400'>
                {client.employeeCount} employees &middot; {client.projectCount}{' '}
                projects &middot;{' '}
                <Link href={`/clients/${client.company.companyId}`}>
                  See details
                </Link>
              </p>
            </div>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

export default ClientsList
