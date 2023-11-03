import handleSubmitClient from '@/api-calls/postClient'

export const handleCreateClient = async (
  clientName: string
): Promise<number> => {
  return await new Promise<number>((resolve, reject) => {
    const formData = new FormData()

    if (clientName !== undefined) {
      formData.append('newCompanyName', clientName)

      handleSubmitClient(formData)
        .then((res) => {
          resolve(res.data as number)
        })
        .catch((err) => {
          reject(new Error(err))
        })
    } else {
      reject(new Error('clientName is undefined'))
    }
  })
}
