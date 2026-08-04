'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { WorkItem } from '@/lib/definitions'

type SelectionContextType = {
   selectedItemId: WorkItem['id'] | null
   setSelectedItemId: (id: WorkItem['id']) => void
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined)

export function SelectionProvider({ children }: { children: ReactNode }) {
   const [selectedItemId, setSelectedItemId] = useState<WorkItem['id'] | null>(null)

   return (
      <SelectionContext.Provider value={{ selectedItemId, setSelectedItemId }}>
         {children}
      </SelectionContext.Provider>
   )
}

export function useSelection() {
   const context = useContext(SelectionContext)
   if (!context) {
      throw new Error('useSelection must be used within a SelectionProvider')
   }
   return context
}