import { useEffect } from 'react'

import { renderIcon } from 'src/lib/utils'

import { useGetCommunities } from 'src/modules/community/hooks'

const B = (): JSX.Element => {
  const { data, isLoading } = useGetCommunities()
  useEffect(() => console.log(data), [data])

  if (isLoading) return <>Loading</>

  return (
    <>
      {data?.data.map((community) => (
        <div key={`${community.id}`}>
          {renderIcon(community.icon)}
          {community.name}
        </div>
      )) ?? null}
    </>
  )
}

export default B
