// 'use client'
// import { dateFormatter } from '@/utility/dateFormatter'
// import { useState } from 'react'

// const ExpectedDeliveryDate: React.FC<{ date: string }> = (props) => {
//   const [toggle, setToggle] = useState<boolean>(false)

//   // TODO: Fix to work properly with UTC time
//   const daysBeforeDeliveryDate = (date: string): number => {
//     const today = new Date()
//     const deliveryDate = new Date(date)
//     const differenceInTime = deliveryDate.getTime() - today.getTime()
//     const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24))
//     return differenceInDays
//   }

//   const { date, color } = dateFormatter(props.date)

//   let message = ''
//   let backgroundColor = ''
//   switch (color) {
//     case 'red':
//       message = `${daysBeforeDeliveryDate(date)} days before delivery date`
//       backgroundColor = 'rgba(249, 76, 16, .25)'
//       break
//     case 'rgb(144, 12, 63)':
//       message = `Delivery date was ${
//         daysBeforeDeliveryDate(date) * -1
//       } days ago` // * Multiply by -1 to get positive number
//       backgroundColor = 'rgba(249, 76, 16, .25)'
//       break
//     case 'rgba(79, 192, 208, 1)':
//       message = `${daysBeforeDeliveryDate(date)} days before delivery date`
//       backgroundColor = 'rgba(79, 192, 208, 2.5)'
//       break
//     case 'rgb(255, 163, 60)':
//       message = `${daysBeforeDeliveryDate(date)} days before delivery date`
//       backgroundColor = 'rgba(255, 163, 60, .25)'
//       break
//     default:
//       message = 'Default color message'
//       backgroundColor = 'rgba(0, 0, 0, .25)'
//       break
//   }

//   return (
//     <>
//       <p className='text-gray-500 text-xs'>Expected delivery date</p>
//       <div className='relative flex items-center m-0 p-0 gap-1'>
//         <p className='m-0 p-0 text-xs' style={{ color }}>
//           {date}
//         </p>
//         <svg
//           style={{ color }}
//           onMouseOver={() => {
//             setToggle(true)
//           }}
//           onMouseLeave={() => {
//             setToggle(false)
//           }}
//           xmlns='http://www.w3.org/2000/svg'
//           viewBox='0 0 16 16'
//           fill='currentColor'
//           className='w-4 h-4'
//         >
//           <path
//             fillRule='evenodd'
//             d='M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z'
//             clipRule='evenodd'
//           />
//         </svg>
//         {toggle && (
//           <div
//             className='absolute p-2 rounded-md top-6 w-52'
//             style={{ backgroundColor }}
//           >
//             <p className='m-0 p-0 text-xs'>{message}</p>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default ExpectedDeliveryDate
