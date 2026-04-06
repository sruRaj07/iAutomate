import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Search = (props: Props) => {
  return (
    <div className="dashboard-panel flex overflow-hidden gap-x-2 rounded-full px-4 py-2 items-center flex-1">
      <SearchIcon color="#ef7d32" />
      <Input
        placeholder="Search by name, email or status"
        className="border-none bg-transparent outline-none ring-0 focus:ring-0 flex-1 placeholder:text-zinc-500"
      />
    </div>
  )
}

export default Search
